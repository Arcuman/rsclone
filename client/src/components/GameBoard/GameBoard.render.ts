
import Phaser from 'phaser';
import { IMAGES, SCENES } from '@/components/Game/constant';
import { GameState } from '@/components/GameBoard/GameBoard.model';
import { setBackground } from '@/utils/utils';
import { TEXT_FIELD_NAME } from '@/components/GameBoard/UserAvatar/constants';
import { cardBase } from '@/components/Card/Card.render';
import { createEnemyCards } from '@/components/GameBoard/EnemyCards/EnenmyCards.render';
import { createPlayerCards } from '@/components/GameBoard/UserCards/UserCards.render';
import { createTable } from '@/components/GameBoard/Table/Table.render';
import {
  createGameTableImg,
  createPlayerTableZone,
} from '@/components/GameBoard/Table/Table.services';
import { BOMB_IMAGE, BOOM_SPRITESHEET, FRAME_SIZE, TIMER, TIMER_LABEL, WICK_SPRITESHEET } from './constants';
import { addTimerAlmostExpired, addTimerEndSprite, create, createEnemyAvatar, createPlayerAvatar } from './GameBoard.services';

export class GameBoardScene extends Phaser.Scene {
  private state: GameState;

  private socket: SocketIOClient.Socket;

  private isPlayerOne = false;

  private enemyAvatar: Phaser.GameObjects.Container;

  private playerAvatar: Phaser.GameObjects.Container;

  private enemyHandCards: Phaser.GameObjects.Group;

  private enemyCards: Phaser.GameObjects.Container[] = [];

  private playerCards: Phaser.GameObjects.Container[] = [];

  private playerTableZone: Phaser.GameObjects.Zone;

  private enemyTableZone: Phaser.GameObjects.Zone;

  private gameTableImg: Phaser.GameObjects.Container;

  timerLabel: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: SCENES.GAME_BOARD,
      active: false,
      visible: false,
    });
  }

  preload() {
    this.load.spritesheet(
      'boom',
      BOOM_SPRITESHEET,
      {
        frameWidth: FRAME_SIZE.BOOM_FRAME.WIDTH,
        frameHeight: FRAME_SIZE.BOOM_FRAME.HEIGHT,
        endFrame: FRAME_SIZE.BOOM_FRAME.END_FRAME,
      });
    this.load.spritesheet(
      'wick',
      WICK_SPRITESHEET,
      {
        frameWidth: FRAME_SIZE.WICK_FRAME.WIDTH,
        frameHeight: FRAME_SIZE.WICK_FRAME.HEIGHT,
        endFrame: FRAME_SIZE.WICK_FRAME.END_FRAME,
      });
    this.load.image('bomb', BOMB_IMAGE);
  }

  create(data: {
    gameState: GameState;
    socket: SocketIOClient.Socket;
    isPlayerOne: boolean;
  }): void {
    setBackground(this, IMAGES.GAME_BACKGROUND.NAME);

    this.state = data.gameState;
    this.socket = data.socket;
    this.isPlayerOne = data.isPlayerOne;

    this.enemyCards = createEnemyCards(this, this.state.enemy.countCards);

    this.playerCards = createPlayerCards(this, this.state.handCards);

    this.gameTableImg = createGameTableImg(this);

    this.playerTableZone = createPlayerTableZone(this, this.gameTableImg);

    this.enemyAvatar = createEnemyAvatar(this, this.state);
    this.playerAvatar = createPlayerAvatar(this, this.state);

    create(this);

    this.timerLabel = this.add.text(
      TIMER_LABEL.POSITION.POS_X,
      TIMER_LABEL.POSITION.POS_Y,
      TIMER_LABEL.DEFAULT_EMPTY_STRING,
      {
        fontSize: TIMER_LABEL.STYLE.FONT_SIZE,
        fontFamily: TIMER_LABEL.STYLE.FONT_FAMILY,
        color: TIMER_LABEL.STYLE.COLOR,
      }).setOrigin(0.5);

    this.socket.on(TIMER, (countDown: string | string[])=>{
      if (+countDown === 5) {
        addTimerAlmostExpired(this);
      } else if (+countDown === 0) {
        addTimerEndSprite(this);
      }
      this.timerLabel.setText(countDown);
    });
  }
}
