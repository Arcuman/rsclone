import Phaser from 'phaser';
import { IMAGES, SCENES } from '@/components/Game/constant';
import { UpdatedUserLevelInfo } from '@/components/GameBoard/GameBoard.model';
import { createTextData, setBackground } from '@/utils/utils';
import {
  EXP_TEXT,
  LEVEL_TEXT,
  levelDecoration,
  messageDecoration,
} from '@/components/GameOverScene/constants';
import { createLargeScalableCard } from '@/components/Card/Card.render';

export class GameOverScene extends Phaser.Scene {
  private info: UpdatedUserLevelInfo;

  private textMessage: Phaser.GameObjects.Text;

  private exp: Phaser.GameObjects.Text;

  private prevExp: Phaser.GameObjects.Text;

  private curExp: Phaser.GameObjects.Text;

  private arrowExp: Phaser.GameObjects.Text;

  private level: Phaser.GameObjects.Text;

  private prevLevel: Phaser.GameObjects.Text;

  private curLevel: Phaser.GameObjects.Text;

  private arrowLevel: Phaser.GameObjects.Text;

  private nextLevelNeedExp: Phaser.GameObjects.Text;

  private neededExp: Phaser.GameObjects.Text;

  private cardContainer: Phaser.GameObjects.Container;

  constructor() {
    super({
      key: SCENES.GAME_OVER,
      active: false,
      visible: false,
    });
  }

  create(data: { message: string; playerInfo: UpdatedUserLevelInfo }): void {
    setBackground(this, IMAGES.LOAD_BACKGROUND.NAME);
    this.info = data.playerInfo;
    // eslint-disable-next-line no-console
    console.log(data.playerInfo);
    this.textMessage = createTextData(this, 640, 120, data.message, messageDecoration).setOrigin(
      0.5,
      0.5,
    );

    this.exp = createTextData(this, 350, 200, EXP_TEXT, levelDecoration);

    this.prevExp = createTextData(this, 600, 200, this.info.prevExp.toString(), levelDecoration);

    this.arrowExp = createTextData(this, 740, 200, '->', levelDecoration);

    this.curExp = createTextData(this, 880, 200, this.info.curExp.toString(), levelDecoration);

    this.nextLevelNeedExp = createTextData(this, 350, 280, 'Необходимо опыта:', levelDecoration);

    this.neededExp = createTextData(
      this,
      800,
      280,
      (this.info.totalLevelExp + this.info.nextLevelExp).toString(),
      levelDecoration,
    );

    this.level = createTextData(this, 350, 360, LEVEL_TEXT, levelDecoration);

    this.prevLevel = createTextData(
      this,
      600,
      360,
      this.info.prevLevel.toString(),
      levelDecoration,
    );

    if (this.info.prevLevel < this.info.newLevel) {
      this.arrowLevel = createTextData(this, 740, 360, '->', levelDecoration);

      this.curLevel = createTextData(
        this,
        880,
        360,
        this.info.newLevel.toString(),
        levelDecoration,
      );
    }
    if (this.info.newCard) {
      this.cardContainer = createLargeScalableCard({
        scene: this,
        posX: 640,
        posY: 540,
        card: this.info.newCard,
      });
    }
  }
}
