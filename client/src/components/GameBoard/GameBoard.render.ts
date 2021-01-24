/* eslint-disable no-console */
import Phaser from 'phaser';
import { IMAGES, SCENES } from '@/components/Game/constant';
import { GameState, IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import { setBackground } from '@/utils/utils';
import { createEnemyCards } from '@/components/GameBoard/EnemyCards/EnenmyCards.render';
import { createPlayerCards } from '@/components/GameBoard/UserCards/UserCards.render';
import {
  createGameTableImg,
  createPlayerTableZone,
} from '@/components/GameBoard/Table/Table.services';
import { START_GAME, NEXT_TURN, HAND_CARD_PLAY } from '@/components/GameBoard/constants';
import { setClickableCard, setDraggableCard } from '@/components/Card/Card.services';
import {
  createEnemyAvatar,
  createPlayerAvatar,
} from '@/components/GameBoard/UserAvatar/Avatar.service';
import { CARD_MANA_FIELD } from '@/components/Card/constants';
import { Card } from '@/components/Card/Card.model';
import { create } from './GameBoard.services';

export class GameBoardScene extends Phaser.Scene implements IGameBoardScene {
  private state: GameState;

  private socket: SocketIOClient.Socket;

  private isPlayerOne = false;

  private enemyAvatar: Phaser.GameObjects.Container;

  private playerAvatar: Phaser.GameObjects.Container;

  private enemyCards: Phaser.GameObjects.Container[] = [];

  private playerCards: Phaser.GameObjects.Container[] = [];

  private playerTableCards: Phaser.GameObjects.Container[] = [];

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

  public getState(): GameState {
    return this.state;
  }

  public getPlayerCards(): Phaser.GameObjects.Container[] {
    return this.playerCards;
  }

  public getSocket(): SocketIOClient.Socket {
    return this.socket;
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

    this.enemyCards = createEnemyCards(this);
    this.playerCards = createPlayerCards(this);

    if (this.isPlayerOne === this.state.isPlayerOneTurn) {
      this.playerTurn = this.add.text(1100, 120, 'YOUR TURN');
      this.playerCards.forEach(card => {
        if (this.state.currentMana >= card.getData(CARD_MANA_FIELD)) {
          this.input.setDraggable(card);
        }
      });
    } else {
      this.playerTurn = this.add.text(1100, 120, 'ENEMY TURN');
      this.input.setDraggable(this.playerCards, false);
    }
    this.gameTableImg = createGameTableImg(this);

    this.playerTableZone = createPlayerTableZone(this, this.gameTableImg);

    this.enemyAvatar = createEnemyAvatar(this);

    this.playerAvatar = createPlayerAvatar(this);

    create(this);

    this.socket.on(START_GAME, () => {
      // eslint-disable-next-line no-console
      console.log('startGame');
    });

    this.socket.on(NEXT_TURN, (isPlayerOneTurn: boolean) => {
      this.state.isPlayerOneTurn = isPlayerOneTurn;
      if (this.isPlayerOne === this.state.isPlayerOneTurn) {
        this.playerTurn.setText('YOUR TURN');
        this.playerCards.forEach(card => {
          if (this.state.currentMana >= card.getData(CARD_MANA_FIELD)) {
            this.input.setDraggable(card);
          }
        });
      } else {
        this.playerTurn.setText('ENEMY TURN');
        this.input.setDraggable(this.playerCards, false);
      }
    });

    this.socket.on(HAND_CARD_PLAY, (card: Card, isPlayerOne: boolean) => {
      if (this.isPlayerOne !== isPlayerOne) {
        this.state.enemy.tableCards.push(card);
      }
    });
  }
}
