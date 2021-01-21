import Phaser from 'phaser';
import { IMAGES, SCENES } from '@/components/Game/constant';
import { GameState } from '@/components/GameBoard/GameBoard.model';
import { setBackground } from '@/utils/utils';
import { TEXT_FIELD_NAME } from '@/components/GameBoard/UserAvatar/constants';
import { cardBase } from '@/components/Card/Card.render';
import { create, createEnemyAvatar, createPlayerAvatar } from './GameBoard.services';

export class GameBoardScene extends Phaser.Scene {
  private state: GameState;

  private socket: SocketIOClient.Socket;

  private isPlayerOne = false;

  private enemyAvatar: Phaser.GameObjects.Container;

  private playerAvatar: Phaser.GameObjects.Container;

  private enemyHandCards: Phaser.GameObjects.Group;

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
    setBackground(this, IMAGES.LOAD_BACKGROUND.NAME);

    this.state = data.gameState;
    this.socket = data.socket;
    this.isPlayerOne = data.isPlayerOne;
    this.enemyAvatar = createEnemyAvatar(this, this.state);
    this.playerAvatar = createPlayerAvatar(this, this.state);
    this.enemyHandCards = this.add.group();

    const gameWidth = this.game.config.width;
    const gameHeight = this.game.config.height;

    const containerX: number = <number>gameWidth / 2;
    const containerY: number = <number>gameHeight - 80;

    let cardImg: string = IMAGES.AGENT.NAME;
    const card1 = cardBase({
      scene: this,
      posX: containerX,
      posY: containerY,
      card: cardImg,
      mana: '6',
      attack: '2',
      health: '2',
    });

    cardImg = IMAGES.SHIV.NAME;
    const card2 = cardBase({
      scene: this,
      posX: containerX + 50,
      posY: containerY,
      card: cardImg,
      mana: '1',
    });

    this.enemyHandCards.setXY(100, 100, 100, 100);
    this.enemyHandCards.add(card1);
    this.enemyHandCards.add(card2);

    create(this);
  }
}
