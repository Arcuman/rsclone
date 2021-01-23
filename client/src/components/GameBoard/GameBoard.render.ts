/* eslint-disable */
import Phaser from 'phaser';
import { IMAGES, SCENES } from '@/components/Game/constant';
import { GameState } from '@/components/GameBoard/GameBoard.model';
import { setBackground } from '@/utils/utils';
import { TEXT_FIELD_NAME } from '@/components/GameBoard/UserAvatar/constants';
import { cardBase } from '@/components/Card/Card.render';
import { createEnemyCards } from '@/components/GameBoard/EnemyCards/EnenmyCards.render';
import { createPlayerCards } from '@/components/GameBoard/UserCards/UserCards.render';
import { createTable } from '@/components/GameBoard/Table/Table.render';
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
    console.log(this.state);

    this.enemyCards = createEnemyCards(this, this.state.enemy.countCards);

    this.playerCards = createPlayerCards(this, this.state.handCards);

    const gameWidth = <number>this.game.config.width;
    const gameHeight = <number>this.game.config.height;

    const cardImg = IMAGES.GAME_BOARD.NAME;
    const createGameTable = createTable({
      scene: this,
      posX: gameWidth / 2,
      posY: gameHeight / 2,
      img: cardImg,
    });
    this.playerTableZone = this.add
      .zone(
        gameWidth / 2,
        gameHeight / 2 + ((createGameTable.height / 2) * 0.6) / 2,
        createGameTable.width,
        createGameTable.height / 2
      )
      .setRectangleDropZone(createGameTable.width * 0.6, (createGameTable.height / 2) * 0.6);
    //
    // const dropZoneOutline = this.add.graphics();
    // dropZoneOutline.lineStyle(4, 0xff69b4);
    // dropZoneOutline.strokeRect(this.playerTableZone.x - this.playerTableZone.input.hitArea.width / 2,
    //   this.playerTableZone.y - this.playerTableZone.input.hitArea.height / 2,
    //   this.playerTableZone.input.hitArea.width,
    //   this.playerTableZone.input.hitArea.height);

    this.enemyTableZone = this.add
      .zone(
        gameWidth / 2,
        gameHeight / 2 - ((createGameTable.height / 2) * 0.6) / 2,
        createGameTable.width,
        createGameTable.height / 2
      )
      .setRectangleDropZone(createGameTable.width * 0.6, (createGameTable.height / 2) * 0.6);
    // const enemydropZoneOutline = this.add.graphics();
    // dropZoneOutline.lineStyle(4, 0xff69b4);
    // dropZoneOutline.strokeRect(
    //   this.enemyTableZone.x - this.enemyTableZone.input.hitArea.width / 2,
    //   this.enemyTableZone.y - this.enemyTableZone.input.hitArea.height / 2,
    //   this.enemyTableZone.input.hitArea.width,
    //   this.enemyTableZone.input.hitArea.height);

    this.enemyAvatar = createEnemyAvatar(this, this.state);
    this.playerAvatar = createPlayerAvatar(this, this.state);

    create(this);
  }
}
