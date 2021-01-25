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
import { BOMB_IMAGE, BOOM_SPRITESHEET, FRAME_SIZE, TIMER, TIMER_LABEL, WICK_SPRITESHEET } from './constants';
import { addTimerAlmostExpired, addTimerEndSprite, create } from './GameBoard.services';
import {
  START_GAME,
  NEXT_TURN,
  HAND_CARD_PLAY,
  NEXT_ROUND,
} from '@/components/GameBoard/constants';
import {
  getPositionOfCard,
  setDraggableCardsDependOnPlayerMana,
} from '@/components/Card/Card.services';
import {
  createEnemyAvatar,
  createPlayerAvatar,
} from '@/components/GameBoard/UserAvatar/Avatar.service';
import { Card } from '@/components/Card/Card.model';
import { createScalableCard } from '@/components/Card/Card.render';
import { createPlayerMana } from '@/components/GameBoard/UserMana/UserMana.render';
import { MANA_COUNT_FIELD } from '@/components/GameBoard/UserMana/constants';
import { onHandCardPlay } from '@/components/GameBoard/EnemyCards/EnemyCard.service';
import { createEndTurnButton } from '@/components/GameBoard/EndTurnButton/EndTurnButton.render';
import { IS_PLAYER_ONE_TURN_FIELD } from '@/components/GameBoard/EndTurnButton/constants';

export class GameBoardScene extends Phaser.Scene implements IGameBoardScene {
  private socket: SocketIOClient.Socket;

  private isPlayerOne = false;

  private enemyAvatar: Phaser.GameObjects.Container;

  private playerAvatar: Phaser.GameObjects.Container;

  private enemyCards: Phaser.GameObjects.Container[] = [];

  private playerCards: Phaser.GameObjects.Container[] = [];

  private playerTableCards: Phaser.GameObjects.Container[] = [];

  private enemyTableCards: Phaser.GameObjects.Container[] = [];

  private playerTableZone: Phaser.GameObjects.Zone;

  private enemyTableZone: Phaser.GameObjects.Zone;

  private gameTableImg: Phaser.GameObjects.Container;

  private timerLabel: Phaser.GameObjects.Text;

  private playerMana: Phaser.GameObjects.Container;

  private endTurnButton: Phaser.GameObjects.Container;

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

  public getPlayerCards(): Phaser.GameObjects.Container[] {
    return this.playerCards;
  }

  public getEnemyCards(): Phaser.GameObjects.Container[] {
    return this.enemyCards;
  }

  public getPlayerTableCards(): Phaser.GameObjects.Container[] {
    return this.playerTableCards;
  }

  public getEnemyTableCards(): Phaser.GameObjects.Container[] {
    return this.enemyTableCards;
  }

  public getSocket(): SocketIOClient.Socket {
    return this.socket;
  }

  public getPlayerMana(): Phaser.GameObjects.Container {
    return this.playerMana;
  }

  public getEndTurnButton(): Phaser.GameObjects.Container {
    return this.endTurnButton;
  }

  public getPlayerTableZone(): Phaser.GameObjects.Zone {
    return this.playerTableZone;
  }

  public getIsPlayerOne(): boolean {
    return this.isPlayerOne;
  }

  public setPlayerMana(value: number): void {
    this.playerMana.data.values[MANA_COUNT_FIELD] = value;
  }

  create(data: {
    initState: GameState;
    socket: SocketIOClient.Socket;
    isPlayerOne: boolean;
  }): void {
    setBackground(this, IMAGES.GAME_BACKGROUND.NAME);

    create(this);
    this.socket = data.socket;
    this.isPlayerOne = data.isPlayerOne;

    this.enemyCards = createEnemyCards(this, data.initState.enemy.countCards);

    this.playerCards = createPlayerCards(this, data.initState.handCards);

    this.gameTableImg = createGameTableImg(this);

    this.playerTableZone = createPlayerTableZone(this, this.gameTableImg);

    this.enemyAvatar = createEnemyAvatar(
      this,
      data.initState.enemy.name,
      data.initState.enemy.health,
    );
    
    this.playerAvatar = createPlayerAvatar(this, data.initState.name, data.initState.health);

    this.playerMana = createPlayerMana(this, data.initState.currentMana);

    this.endTurnButton = createEndTurnButton(this, data.initState.isPlayerOneTurn);

    if (this.isPlayerOne === data.initState.isPlayerOneTurn) {
      setDraggableCardsDependOnPlayerMana(this);
    } else {
      this.input.setDraggable(this.playerCards, false);
    }
    
    this.timerLabel = this.add.text(
      TIMER_LABEL.POSITION.POS_X,
      TIMER_LABEL.POSITION.POS_Y,
      TIMER_LABEL.DEFAULT_EMPTY_STRING,
      {
        fontSize: TIMER_LABEL.STYLE.FONT_SIZE,
        fontFamily: TIMER_LABEL.STYLE.FONT_FAMILY,
        color: TIMER_LABEL.STYLE.COLOR,
      }).setOrigin(0.5);

    this.socket.on(START_GAME, () => {});
    
    this.socket.on(TIMER, (countDown: string | string[])=>{
      if (+countDown === 5) {
        addTimerAlmostExpired(this);
      } else if (+countDown === 0) {
        addTimerEndSprite(this);
      }
      this.timerLabel.setText(countDown);
    });

    this.socket.on(NEXT_TURN, (isPlayerOneTurn: boolean) => {
      this.endTurnButton.setData(IS_PLAYER_ONE_TURN_FIELD, isPlayerOneTurn);
      if (this.isPlayerOne === isPlayerOneTurn) {
        setDraggableCardsDependOnPlayerMana(this);
      } else {
        this.input.setDraggable(this.playerCards, false);
      }
    });

    this.socket.on(NEXT_ROUND, (maxMana: number) => {
      this.setPlayerMana(maxMana);
    });

    this.socket.on(HAND_CARD_PLAY, (card: Card, isPlayerOne: boolean) => {
      onHandCardPlay(this, card, isPlayerOne);
    });
  }
}
