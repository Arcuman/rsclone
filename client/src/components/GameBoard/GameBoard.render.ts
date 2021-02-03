/* @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */
import Phaser from 'phaser';
import {
  GameState,
  IGameBoardScene,
  UpdatedUserLevelInfo,
} from '@/components/GameBoard/GameBoard.model';
import {IMAGES, SCENES, AUDIO, ATLASES, MENU_IMAGES} from '@/components/Game/constant';
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
  GET_DECK_CARD,
  ENEMY_GET_DECK_CARD,
  DESTROY_DECK_CARD,
  DESTROY_DECK_CARD_TIME,
} from '@/components/GameBoard/constants';
import { AUDIO_CONFIG, COVER_CARD } from '@/constants/constants';
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
import { PLAYER_HEALTH_FIELD } from '@/components/GameBoard/UserAvatar/constants';
import { createReadyButton } from '@/components/GameBoard/ReadyButton/ReadyButton.render';
import { addNewCard } from '@/components/GameBoard/UserCards/UserCards.services';
import { enemyCardCover } from '@/components/GameBoard/EnemyCards/constant';

import { PLAYER_CARDS_POSITION } from '@/components/GameBoard/UserCards/constants';
import {createDeck} from '@/components/Deck/Deck.render';
import {COUNT_OF_DECK_CARD} from '@/components/Deck/Deck.model';
import {createBaseCard} from '@/components/Card/Card.render';
import {positionEnemyDeck, positionPlayerDeck} from '@/components/Deck/constants';
import {createButton} from '@/components/Button/Button.services';
import {HEIGHT_COEFFICIENT} from '@/components/MenuScene/constants';
import {browserHistory} from '@/router/history';
import {MENU_URL} from '@/router/constants';
import { createTimer } from './Timer/Timer.render';
import {
  addTimerAlmostExpiredSprite,
  addTimerEndSprite,
  setTimerBackground,
} from './Timer/Timer.services';
import { TIMER, TIMER_COUNTDOWN } from './Timer/constants';
import { damageCard, destroyEnemyCard, destroyPlayerCard } from './GameBoard.services';

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

  private gameTableImg: Phaser.GameObjects.Container;

  private timerLabel: Phaser.GameObjects.Text;

  private playerMana: Phaser.GameObjects.Container;

  private endTurnButton: Phaser.GameObjects.Container;

  private readyButton: Phaser.GameObjects.Container;

  private playerDeck: Phaser.GameObjects.Container;

  private enemyDeck: Phaser.GameObjects.Container;

  private exitButton: Phaser.GameObjects.Sprite;

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
    this.sound.pauseOnBlur = false;

    this.socket = data.socket;
    this.isPlayerOne = data.isPlayerOne;

    this.enemyCards = createEnemyCards(this, data.initState.enemy.countCards);

    this.playerCards = createPlayerCards(this, data.initState.handCards);

    this.gameTableImg = createGameTableImg(this);

    this.playerTableZone = createPlayerTableZone(this, this.gameTableImg);

    const bgEnemyAudio: Phaser.Sound.BaseSound = this.sound.add(AUDIO.ENEMY_TURN_BG_AUDIO.NAME, {
      loop: true,
      volume: AUDIO_CONFIG.volume.bg,
    });
    const bgPlayerAudio: Phaser.Sound.BaseSound = this.sound.add(AUDIO.PLAYER_TURN_BG_AUDIO.NAME, {
      loop: true,
      volume: AUDIO_CONFIG.volume.bg,
    });
    const timerExpireAudio = this.sound.add(AUDIO.TIMER_EXPIRE_AUDIO.NAME, {
      volume: AUDIO_CONFIG.volume.card,
      loop: true,
    });
    const position = { X: 1150, Y: 0 };

    this.exitButton = createButton(
      this,
      position,
      0,
      ATLASES.EXIT_ATLAS.NAME,
      MENU_IMAGES.MENU_EXIT,
      HEIGHT_COEFFICIENT,
    ).setScale(0.5);

    this.exitButton.on('pointerup', () => {
      timerExpireAudio.stop();
      bgEnemyAudio.stop();
      bgPlayerAudio.stop();
      this.socket.disconnect();
      browserHistory.push(MENU_URL);
    });

    this.playerDeck = createDeck(this, positionPlayerDeck, data.initState.deckCountCards).setScale(1.2);

    this.enemyDeck = createDeck(
      this,
      positionEnemyDeck,
      data.initState.enemy.deckCountCards,
      true,
    ).setScale(1.2);

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

    this.socket.on(START_GAME, () => {
      this.endTurnButton.setInteractive();
      if (this.isPlayerOne === data.initState.isPlayerOneTurn) {
        bgPlayerAudio.play();
        setDraggableCardsDependOnPlayerMana(this);
      } else {
        bgEnemyAudio.play();
        this.input.setDraggable(this.playerCards, false);
      }
      const audio = this.sound.add(AUDIO.GAME_START.NAME, { volume: AUDIO_CONFIG.volume.card });
      audio.play();
    });
   
    this.socket.on(TIMER, (countDown: string | string[]) => {
      if (Number(countDown) === TIMER_COUNTDOWN.ALMOST_EXPIRED) {
        timerExpireAudio.play();
        addTimerAlmostExpiredSprite(this);
      } else if (Number(countDown) === TIMER_COUNTDOWN.EXPIRED) {
        timerExpireAudio.stop();
        const audio = this.sound.add(AUDIO.TIMER_EXPLOSION_AUDIO.NAME, {
          volume: AUDIO_CONFIG.volume.card,
        });
        audio.play();
        addTimerEndSprite(this);
      }
      this.timerLabel.setText(countDown);
    });

    this.socket.on(NEXT_TURN, (isPlayerOneTurn: boolean) => {
      timerExpireAudio.stop();
      const audio = this.sound.add(AUDIO.PLAYER_TURN.NAME, { volume: AUDIO_CONFIG.volume.card });
      audio.play();
      this.endTurnButton.setData(IS_PLAYER_ONE_TURN_FIELD, isPlayerOneTurn);
      if (this.isPlayerOne === isPlayerOneTurn) {
        bgEnemyAudio.stop();
        bgPlayerAudio.play();
        setDraggableCardsDependOnPlayerMana(this);
        activateTableCards(this);
      } else {
        bgPlayerAudio.stop();
        bgEnemyAudio.play();
        this.input.setDraggable(this.playerCards, false);
        this.input.setDraggable(this.playerTableCards, false);
      }
    });

    this.socket.on(NEXT_ROUND, (maxMana: number) => {
      const audio = this.sound.add(AUDIO.MANA_ADD.NAME, {
        volume: AUDIO_CONFIG.volume.button,
      });
      audio.play();

      this.setPlayerMana(maxMana);
    });

    this.socket.on(HAND_CARD_PLAY, (card: Card, isPlayerOne: boolean) => {
      const audio = this.sound.add(AUDIO.CARD_DROP_AUDIO.NAME, {
        volume: AUDIO_CONFIG.volume.card,
      });
      audio.play();

      onHandCardPlay(this, card, isPlayerOne);
    });

    this.socket.on(GET_DECK_CARD, (deckCard: Card) => {
      const audio = this.sound.add(AUDIO.ADD_CARD_TO_HAND.NAME, {
        volume: AUDIO_CONFIG.volume.card,
      });
      audio.play();

      this.playerDeck.setData(COUNT_OF_DECK_CARD, this.enemyDeck.getData(COUNT_OF_DECK_CARD) - 1);
      addNewCard(this, this.playerCards, deckCard, this.playerCards.length, PLAYER_CARDS_POSITION);
      setDraggableCardsDependOnPlayerMana(this);
    });

    this.socket.on(ENEMY_GET_DECK_CARD, () => {
      this.enemyDeck.setData(COUNT_OF_DECK_CARD, this.enemyDeck.getData(COUNT_OF_DECK_CARD) - 1);
      addNewCard(this, this.enemyCards, enemyCardCover, this.enemyCards.length, COVER_CARD.POS_Y);
    });
    
    this.socket.on(DESTROY_DECK_CARD, (deckCard: Card) => {
      const destoyedCard = createBaseCard({
        scene: this,
        card: deckCard,
        posX: 640,
        posY: 360,
      }).setScale(1.3);
      setTimeout(() => destoyedCard.destroy(), DESTROY_DECK_CARD_TIME);
    });
    this.socket.on(TABLE_CARD_DAMAGE, (attackingCard: Card, damagedCard: Card) => {
      const audio = this.sound.add(AUDIO.CARD_DAMAGE_AUDIO.NAME, {
        volume: AUDIO_CONFIG.volume.card,
      });
      audio.play();

      damageCard(this.playerTableCards, attackingCard);
      damageCard(this.enemyTableCards, damagedCard);
    });

    this.socket.on(ENEMY_TABLE_CARD_DAMAGE, (attackingCard: Card, damagedCard: Card) => {
      const audio = this.sound.add(AUDIO.CARD_DAMAGE_AUDIO.NAME, {
        volume: AUDIO_CONFIG.volume.card,
      });
      audio.play();

      damageCard(this.enemyTableCards, attackingCard);
      damageCard(this.playerTableCards, damagedCard);
    });

    this.socket.on(TABLE_CARD_DESTROY, (destroyedCard: Card, isPlayerOnePlay: boolean) => {
      const audio = this.sound.add(AUDIO.CARD_DESTROY_AUDIO.NAME, {
        volume: AUDIO_CONFIG.volume.card,
      });
      audio.play();

      if (isPlayerOnePlay === this.isPlayerOne) {
        destroyPlayerCard(this, this.playerTableCards, destroyedCard);
      } else {
        destroyEnemyCard(this, this.enemyTableCards, destroyedCard);
      }
    });

    this.socket.on(PLAYER_DAMAGE, (health: number, isPlayerOnePlay: boolean) => {
      const audio = this.sound.add(AUDIO.HERO_DAMAGE.NAME, { volume: AUDIO_CONFIG.volume.card });
      audio.play();

      if (isPlayerOnePlay === this.isPlayerOne) {
        this.enemyAvatar.setData(PLAYER_HEALTH_FIELD, health);
      } else {
        this.playerAvatar.setData(PLAYER_HEALTH_FIELD, health);
      }
    });

    this.socket.on(PLAYER_WIN, (info: UpdatedUserLevelInfo) => {
      timerExpireAudio.stop();
      bgEnemyAudio.stop();
      bgPlayerAudio.stop();
      this.scene.start(SCENES.GAME_OVER, { isWin: true, message: WIN, playerInfo: info });
    });

    this.socket.on(PLAYER_LOSE, (info: UpdatedUserLevelInfo) => {
      timerExpireAudio.stop();
      bgEnemyAudio.stop();
      bgPlayerAudio.stop();
      this.scene.start(SCENES.GAME_OVER, { isWin: false, message: LOSE, playerInfo: info });
    });
  }
}
