/* eslint-disable no-console */
import Phaser from 'phaser';
import {
  GameState,
  IGameBoardScene,
  UpdatedUserLevelInfo,
} from '@/components/GameBoard/GameBoard.model';
import { IMAGES, SCENES, AUDIO } from '@/components/Game/constant';
import { setBackground } from '@/utils/utils';
import { createEnemyCards } from '@/components/GameBoard/EnemyCards/EnenmyCards.render';
import { createPlayerCards } from '@/components/GameBoard/UserCards/UserCards.render';
import {
  createGameTableImg,
  createPlayerTableZone,
} from '@/components/GameBoard/Table/Table.services';
import {
  START_GAME,
  NEXT_TURN,
  HAND_CARD_PLAY,
  NEXT_ROUND,
  TABLE_CARD_DAMAGE,
  TABLE_CARD_DESTROY,
  ENEMY_TABLE_CARD_DAMAGE,
  PLAYER_DAMAGE,
  PLAYER_WIN,
  PLAYER_LOSE,
  WIN,
  LOSE,
} from '@/components/GameBoard/constants';
import {
  activateTableCards,
  setDraggableCardsDependOnPlayerMana,
} from '@/components/Card/Card.services';
import {
  createEnemyAvatar,
  createPlayerAvatar,
} from '@/components/GameBoard/UserAvatar/Avatar.service';
import { Card } from '@/components/Card/Card.model';
import { createPlayerMana } from '@/components/GameBoard/UserMana/UserMana.render';
import { MANA_COUNT_FIELD } from '@/components/GameBoard/UserMana/constants';
import { onHandCardPlay } from '@/components/GameBoard/EnemyCards/EnemyCard.service';
import { createEndTurnButton } from '@/components/GameBoard/EndTurnButton/EndTurnButton.render';
import { IS_PLAYER_ONE_TURN_FIELD } from '@/components/GameBoard/EndTurnButton/constants';
import { CARD_HEALTH_FIELD, CARD_ID_FIELD } from '@/components/Card/constants';
import { PLAYER_HEALTH_FIELD } from '@/components/GameBoard/UserAvatar/constants';
import { createReadyButton } from '@/components/GameBoard/ReadyButton/ReadyButton.render';
import { createTimer } from './Timer/Timer.render';
import {
  addTimerAlmostExpiredSprite,
  addTimerEndSprite,
  setTimerBackground,
} from './Timer/Timer.services';
import { TIMER, TIMER_COUNTDOWN } from './Timer/constants';
import { create, damageCard, destroyCard } from './GameBoard.services';

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

  private readyButton: Phaser.GameObjects.Container;

  constructor() {
    super({
      key: SCENES.GAME_BOARD,
      active: false,
      visible: false,
    });
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

    this.readyButton = createReadyButton(this);

    setTimerBackground(this);
    this.timerLabel = createTimer(this);
    let bgAudio: Phaser.Sound.BaseSound;

    this.socket.on(START_GAME, () => {
      if (this.isPlayerOne === data.initState.isPlayerOneTurn) {
        bgAudio = this.sound.add(AUDIO.PLAYER_TURN_BG_AUDIO.NAME, { loop: true });
        bgAudio.play();
        setDraggableCardsDependOnPlayerMana(this);
      } else {
        bgAudio = this.sound.add(AUDIO.ENEMY_TURN_BG_AUDIO.NAME, { loop: true });
        bgAudio.play();
        this.input.setDraggable(this.playerCards, false);
      }
    });

    this.socket.on(TIMER, (countDown: string | string[]) => {
      if (Number(countDown) === TIMER_COUNTDOWN.ALMOST_EXPIRED) {
        addTimerAlmostExpiredSprite(this);
      } else if (Number(countDown) === TIMER_COUNTDOWN.EXPIRED) {
        addTimerEndSprite(this);
      }
      this.timerLabel.setText(countDown);
    });

    this.socket.on(NEXT_TURN, (isPlayerOneTurn: boolean) => {
      bgAudio.stop();
      this.endTurnButton.setData(IS_PLAYER_ONE_TURN_FIELD, isPlayerOneTurn);
      if (this.isPlayerOne === isPlayerOneTurn) {
        setDraggableCardsDependOnPlayerMana(this);
        activateTableCards(this);
      } else {
        this.input.setDraggable(this.playerCards, false);
        this.input.setDraggable(this.playerTableCards, false);
      }
    });

    this.socket.on(NEXT_ROUND, (maxMana: number) => {
      this.setPlayerMana(maxMana);
    });

    this.socket.on(HAND_CARD_PLAY, (card: Card, isPlayerOne: boolean) => {
      onHandCardPlay(this, card, isPlayerOne);
    });
    this.socket.on(TABLE_CARD_DAMAGE, (attackingCard: Card, damagedCard: Card) => {
      damageCard(this.playerTableCards, attackingCard);
      damageCard(this.enemyTableCards, damagedCard);
    });
    this.socket.on(ENEMY_TABLE_CARD_DAMAGE, (attackingCard: Card, damagedCard: Card) => {
      damageCard(this.enemyTableCards, attackingCard);
      damageCard(this.playerTableCards, damagedCard);
    });

    this.socket.on(TABLE_CARD_DESTROY, (destroyedCard: Card, isPlayerOnePlay: boolean) => {
      if (isPlayerOnePlay === this.isPlayerOne) {
        destroyCard(this.playerTableCards, destroyedCard);
      } else {
        destroyCard(this.enemyTableCards, destroyedCard);
      }
    });

    this.socket.on(PLAYER_DAMAGE, (health: number, isPlayerOnePlay: boolean) => {
      if (isPlayerOnePlay === this.isPlayerOne) {
        this.enemyAvatar.setData(PLAYER_HEALTH_FIELD, health);
      } else {
        this.playerAvatar.setData(PLAYER_HEALTH_FIELD, health);
      }
    });

    this.socket.on(PLAYER_WIN, (info: UpdatedUserLevelInfo) => {
      this.scene.start(SCENES.GAME_OVER, { message: WIN, playerInfo: info });
    });

    this.socket.on(PLAYER_LOSE, (info: UpdatedUserLevelInfo) => {
      this.scene.start(SCENES.GAME_OVER, { message: LOSE, playerInfo: info });
    });
  }
}
