
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
import { TIMER } from './constants';
import { addTimerEndSprite, create, createEnemyAvatar, createPlayerAvatar } from './GameBoard.services';

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
    this.load.spritesheet('boom', '../../assets/images/Timer/explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 });
    this.load.spritesheet('wick', '../../assets/images/Timer/wick.png', { frameWidth: 1585, frameHeight: 100, endFrame: 150 });
  }

  create(data: {
    gameState: GameState;
    socket: SocketIOClient.Socket;
    isPlayerOne: boolean;
  }): void {

    // this.timer = new TimerScene(this, timerLabel);
    // this.timer.start(this.handleTimerFinished.bind(this));

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

    this.timerLabel = this.add.text(120, 350, '', { fontSize: '48px', color: 'red' }).setOrigin(0.5);
    this.socket.on(TIMER, (countDown: string | string[])=>{
      if (+countDown === 5) {
        addTimerEndSprite(this, 'wick');
      } else if (+countDown === 0) {
        addTimerEndSprite(this, 'boom');
      }
      this.timerLabel.setText(countDown);
    });

  }

  // handleTimerFinished() {
  //   this.add.text(150, 150, 'YOOOOOU', { fontSize: '25' });
  // }

  // update() {
  //   // this.timer.update();

  // }
}
