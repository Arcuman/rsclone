import Phaser from 'phaser';
import { IMAGES, SCENES, AUDIO } from '@/components/Game/constant';
import { setBackground } from '@/utils/utils';
import { Card } from '@/components/Card/Card.model';
import { AUDIO_CONFIG } from '@/constants/constants';
import { create } from './MyCards.services';
import { IMyCardsScene, StateCardsOfDecks, ArrowButton } from './MyCards.model';

export class MyCardsScene extends Phaser.Scene implements IMyCardsScene {
  private userCards: Card[] = [];

  private currentPageMyCards: number;

  private totalPageMyCards: number;

  private myCardsContainer: Phaser.GameObjects.Container;

  private deksContainer: Phaser.GameObjects.Container;

  private currentPageDecks: boolean;

  private stateCardsOfDecks: StateCardsOfDecks = {
    DECKS_DATA: [],
    CARDS_DATA: [],
    CURRENT_PAGE: 1,
    TOTAL_PAGE: 1,
  };

  private arrowButton: ArrowButton = {   
    DECKS_LEFT: Phaser.GameObjects.Image,
    DECKS_RIGHT: Phaser.GameObjects.Image,
    CARDS_RIGHT: Phaser.GameObjects.Image,
    CARDS_LEFT: Phaser.GameObjects.Image,
  };

  constructor() {
    super({
      key: SCENES.MY_CARDS,
      active: false,
      visible: false,
    });
  }

  public getUserCards(): Card[] {
    return this.userCards;
  }

  public setUserCards(value: Card[]): void {
    this.userCards = value;
  }

  public getMyCardsContainer(): Phaser.GameObjects.Container {
    return this.myCardsContainer;
  }

  public setMyCardsContainer(value: Phaser.GameObjects.Container): void {
    this.myCardsContainer = value;
  }

  public getDecksContainer(): Phaser.GameObjects.Container {
    return this.deksContainer;
  }

  public setDecksContainer(value: Phaser.GameObjects.Container): void {
    this.deksContainer = value;
  }

  public getMyCardsCurrentPage(): number {
    return this.currentPageMyCards;
  }

  public setMyCardsCurrentPage(value: number): void {
    this.currentPageMyCards = value;
  }

  public getMyCardsTotalPage(): number {
    return this.totalPageMyCards;
  }

  public setMyCardsTotalPage(value: number): void {
    this.totalPageMyCards = value;
  }

  public getStateCardsOfDecks(): StateCardsOfDecks {
    return this.stateCardsOfDecks;
  }

  public setStateCardsOfDecks(value: StateCardsOfDecks): void {
    this.stateCardsOfDecks = value;
  }

  public getCurrentPageDecks(): boolean {
    return this.currentPageDecks;
  }

  public setCurrentPageDecks(value: boolean): void {
    this.currentPageDecks = value;
  }
  
  public getArrowButton(): ArrowButton {
    return this.arrowButton;
  }

  public setArrowButton(value: ArrowButton): void {
    this.arrowButton = value;
  }

  create(): void {
    setBackground(this, IMAGES.MY_CARDS_BACKGROUND.NAME);
    this.sound.pauseOnBlur = false;
    const cardsBgAudio = this.sound.add(AUDIO.MYCARDS_BG_AUDIO.NAME, {
      loop: true,
      volume: AUDIO_CONFIG.volume.bg,
    });

    cardsBgAudio.play();
    create(this, cardsBgAudio);
  }
}
