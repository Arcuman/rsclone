import Phaser from 'phaser';
import { IMAGES, SCENES } from '@/components/Game/constant';
import { GameState } from '@/components/GameBoard/GameBoard.model';
import { setBackground } from '@/utils/utils';
import { createEnemyCards } from '@/components/GameBoard/EnemyCards/EnenmyCards.render';
import { createPlayerCards } from '@/components/GameBoard/UserCards/UserCards.render';
import {
  createGameTableImg,
  createPlayerTableZone,
} from '@/components/GameBoard/Table/Table.services';
import {START_GAME, NEXT_TURN} from '@/components/GameBoard/constants';
import { create, createEnemyAvatar, createPlayerAvatar } from './GameBoard.services';

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

  private playerTurn: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: SCENES.GAME_BOARD,
      active: false,
      visible: false,
    });
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

    // eslint-disable-next-line no-console
    console.log(this.isPlayerOne);
    // eslint-disable-next-line no-console
    console.log(this.state.isPlayerOneTurn);
    if (this.isPlayerOne === this.state.isPlayerOneTurn){
      this.playerTurn = this.add.text(1100, 120, 'YOUR TURN');
    } else {
      this.playerTurn = this.add.text(1100, 120, 'ENEMY TURN');
    }

    this.enemyCards = createEnemyCards(this, this.state.enemy.countCards);

    this.playerCards = createPlayerCards(this, this.state.handCards);

    this.gameTableImg = createGameTableImg(this);

    this.playerTableZone = createPlayerTableZone(this, this.gameTableImg);

    this.enemyAvatar = createEnemyAvatar(this, this.state);

    this.playerAvatar = createPlayerAvatar(this, this.state);

    create(this);

    this.socket.on(START_GAME, ()=>{
      // eslint-disable-next-line no-console
      console.log('startGame');
    });
    this.socket.on(NEXT_TURN, (isPlayerOneTurn:boolean)=>{
      this.state.isPlayerOneTurn = isPlayerOneTurn;
      if (this.isPlayerOne === this.state.isPlayerOneTurn){
        this.playerTurn.setText('YOUR TURN');
      } else {
        this.playerTurn.setText('ENEMY TURN');
      }
    });
  }
}
