import Phaser from 'phaser';
import { IMAGES, SCENES, AUDIO } from '@/components/Game/constant';
import { Deck } from '@/components/Deck/Deck.model';
import { setBackground } from '@/utils/utils';
import { Card } from '@/components/Card/Card.model';
import { AUDIO_CONFIG } from '@/constants/constants';
import { create } from './MyCards.services';
import { IMyCardsScene, StateCardsOfDecks, ControlButton } from './MyCards.model';

export class MyCardsScene extends Phaser.Scene implements IMyCardsScene {
  private userCards: Card[] = [];

  private currentPageMyCards: number;

  private totalPageMyCards: number;

  private myCardsContainer: Phaser.GameObjects.Container;

  private deksContainer: Phaser.GameObjects.Container;

  private currentPageDecks: boolean;

  private statusDecksPage: string;

  private newDeck: Deck;

  private openDeckId: number;

  private newCardsArray: Card[] = [];

  private deckNameInput: Phaser.GameObjects.Text;

  private warningMessage: Phaser.GameObjects.Text;

  private stateCardsOfDecks: StateCardsOfDecks = {
    DECKS_DATA: [],
    CARDS_DATA: [],
    CURRENT_PAGE: 1,
    TOTAL_PAGE: 1,
  };

  private arrowButton: ControlButton = {   
    DECKS_LEFT: null,
    DECKS_RIGHT: null,
    CARDS_RIGHT: null,
    CARDS_LEFT: null,
    CREATE_BUTTON: null,
    EDIT_BUTTON: null,
    DONE_BUTTON: null,
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
  
  public getArrowButton(): ControlButton {
    return this.arrowButton;
  }

  public setArrowButton(value: ControlButton): void {
    this.arrowButton = value;
  }

  public getstatusDecksPage(): string {
    return this.statusDecksPage;
  }

  public setstatusDecksPage(value: string): void {
    this.statusDecksPage = value;
  }

  public getNewDeck(): Deck {
    return this.newDeck;
  }

  public setNewDeck(value: Deck): void {
    this.newDeck = value;
  }

  public getOpenDeckId(): number {
    return this.openDeckId;
  }

  public setOpenDeckId(value: number): void {
    this.openDeckId = value;
  }

  public getDeckNameInput(): Phaser.GameObjects.Text {
    return this.deckNameInput;
  }

  public setDeckNameInput(value: Phaser.GameObjects.Text): void {
    this.deckNameInput = value;
  }

  public getNewCardsArray(): Card[] {
    return this.newCardsArray;
  }

  public setNewCardsArray(value: Card[]): void {
    this.newCardsArray = value;
  }

  public getWarningMessage(): Phaser.GameObjects.Text {
    return this.warningMessage;
  }

  public setWarningMessage(value: Phaser.GameObjects.Text): void {
    this.warningMessage = value;
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
