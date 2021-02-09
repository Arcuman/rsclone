/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */
import Phaser from 'phaser';
import {IMAGES, SCENES, AUDIO, ATLASES, MENU_IMAGES} from '@/components/Game/constant';
import { UpdatedUserLevelInfo } from '@/components/GameBoard/GameBoard.model';
import { createTextData, setBackground } from '@/utils/utils';
import { AUDIO_CONFIG } from '@/constants/constants';

import {
  ARROW_TEXT, EXIT_POSITION_X, EXIT_POSITION_Y,
  EXP_TEXT,
  LEVEL_TEXT,
  levelDecoration,
  messageDecoration,
  NEEDED_EXP_TEXT,
  TEXT_POSITION_X_CENTER,
  TEXT_POSITION_X_COL_1,
  TEXT_POSITION_X_COL_2,
  TEXT_POSITION_X_COL_3,
  TEXT_POSITION_X_COL_4,
  TEXT_POSITION_X_NEEDED_EXP,
  TEXT_POSITION_Y,
  TEXT_POSITION_Y_OFFSET,
} from '@/components/GameOverScene/constants';
import { createLargeScalableCard } from '@/components/Card/Card.render';
import {createButton} from '@/components/Button/Button.services';
import {BUTTON_SCALE, HEIGHT_OFFSET} from '@/components/Profile/constants';
import {browserHistory} from '@/router/history';
import {MENU_URL} from '@/router/constants';

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

  create(data: {  isWin:boolean;message: string; playerInfo: UpdatedUserLevelInfo }): void {
    setBackground(this, IMAGES.LOAD_BACKGROUND.NAME);

    const audioName = data.isWin ?  AUDIO.VICTORY_AUDIO.NAME : AUDIO.LOSE_AUDIO.NAME;
    const scrAudio = this.sound.add(audioName, {volume: AUDIO_CONFIG.volume.card});
    scrAudio.play();

    this.info = data.playerInfo;
    this.textMessage = createTextData(
      this,
      TEXT_POSITION_X_CENTER,
      TEXT_POSITION_Y,
      data.message,
      messageDecoration,
    ).setOrigin(0.5, 0.5);

    this.exp = createTextData(
      this,
      TEXT_POSITION_X_COL_1,
      TEXT_POSITION_Y + TEXT_POSITION_Y_OFFSET,
      EXP_TEXT,
      levelDecoration,
    );

    this.prevExp = createTextData(
      this,
      TEXT_POSITION_X_COL_2,
      TEXT_POSITION_Y + TEXT_POSITION_Y_OFFSET,
      this.info.prevExp.toString(),
      levelDecoration,
    );

    this.arrowExp = createTextData(
      this,
      TEXT_POSITION_X_COL_3,
      TEXT_POSITION_Y + TEXT_POSITION_Y_OFFSET,
      ARROW_TEXT,
      levelDecoration,
    );

    this.curExp = createTextData(
      this,
      TEXT_POSITION_X_COL_4,
      TEXT_POSITION_Y + TEXT_POSITION_Y_OFFSET,
      this.info.curExp.toString(),
      levelDecoration,
    );

    this.nextLevelNeedExp = createTextData(
      this,
      TEXT_POSITION_X_COL_1,
      TEXT_POSITION_Y + TEXT_POSITION_Y_OFFSET * 2,
      NEEDED_EXP_TEXT,
      levelDecoration,
    );

    this.neededExp = createTextData(
      this,
      TEXT_POSITION_X_NEEDED_EXP,
      TEXT_POSITION_Y + TEXT_POSITION_Y_OFFSET * 2,
      (this.info.totalLevelExp + this.info.nextLevelExp).toString(),
      levelDecoration,
    );

    this.level = createTextData(
      this,
      TEXT_POSITION_X_COL_1,
      TEXT_POSITION_Y + TEXT_POSITION_Y_OFFSET * 3,
      LEVEL_TEXT,
      levelDecoration,
    );

    this.prevLevel = createTextData(
      this,
      TEXT_POSITION_X_COL_2,
      TEXT_POSITION_Y + TEXT_POSITION_Y_OFFSET * 3,
      this.info.prevLevel.toString(),
      levelDecoration,
    );

    if (this.info.prevLevel < this.info.newLevel) {
      const audio = this.sound.add(AUDIO.LEVEL_UP.NAME, {
        volume: AUDIO_CONFIG.volume.button,
      });
      audio.play();

      this.arrowLevel = createTextData(
        this,
        TEXT_POSITION_X_COL_3,
        TEXT_POSITION_Y + TEXT_POSITION_Y_OFFSET * 3,
        ARROW_TEXT,
        levelDecoration,
      );

      this.curLevel = createTextData(
        this,
        TEXT_POSITION_X_COL_4,
        TEXT_POSITION_Y + TEXT_POSITION_Y_OFFSET * 3,
        this.info.newLevel.toString(),
        levelDecoration,
      );
    }
    if (this.info.newCard) {
      const audio = this.sound.add(AUDIO.GET_LEVEL_CARD.NAME, {
        volume: AUDIO_CONFIG.volume.button,
      });
      audio.play();
      this.cardContainer = createLargeScalableCard({
        scene: this,
        posX: TEXT_POSITION_X_CENTER,
        posY: TEXT_POSITION_Y + TEXT_POSITION_Y_OFFSET * 5.2,
        card: this.info.newCard,
      });
    }

    const positionMenuCoords = {
      X: EXIT_POSITION_X,
      Y: EXIT_POSITION_Y,
    };

    const menuButton = createButton(
      this,
      positionMenuCoords,
      0,
      ATLASES.MENU_ATLAS.NAME,
      MENU_IMAGES.MENU_BUTTON,
      HEIGHT_OFFSET,
    );

    menuButton.on('pointerup', () => {
      browserHistory.push(MENU_URL);
    });

    menuButton.setScale(BUTTON_SCALE);

  }
}
