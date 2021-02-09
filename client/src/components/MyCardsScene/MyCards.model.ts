import { Card } from '@/components/Card/Card.model';
import { Deck } from '@/components/Deck/Deck.model';

export interface CardsContainerPosition {
  CONTAINER_X: number;
  CONTAINER_Y: number;
}

export interface CardsPosition {
  OFFSET_X: number;
  EXTRA_OFFSET_X: number;
  REDUCE_ID_1: number;
  REDUCE_ID_2: number;
  REDUCE_ID_3: number;
}

export interface StateCardsOfDecks {
  DECKS_DATA: Deck[];
  CARDS_DATA: Card[];
  CURRENT_PAGE: number;
  TOTAL_PAGE: number;
}

export interface ControlButton {
  DECKS_LEFT: Phaser.GameObjects.Image | null;
  DECKS_RIGHT: Phaser.GameObjects.Image | null;
  CARDS_RIGHT: Phaser.GameObjects.Image | null;
  CARDS_LEFT: Phaser.GameObjects.Image | null;
  CREATE_BUTTON: Phaser.GameObjects.Image | null;
  EDIT_BUTTON: Phaser.GameObjects.Image | null;
  DONE_BUTTON: Phaser.GameObjects.Image | null;
}

export interface IMyCardsScene extends Phaser.Scene{
  getUserCards(): Card[];
  setUserCards(value: Card[]): void;

  getMyCardsContainer(): Phaser.GameObjects.Container;
  setMyCardsContainer(value: Phaser.GameObjects.Container): void;

  getDecksContainer(): Phaser.GameObjects.Container;
  setDecksContainer(value: Phaser.GameObjects.Container): void;

  getMyCardsCurrentPage(): number;
  setMyCardsCurrentPage(value: number): void;

  getMyCardsTotalPage(): number;
  setMyCardsTotalPage(value: number): void;  

  getStateCardsOfDecks(): StateCardsOfDecks;
  setStateCardsOfDecks(value: StateCardsOfDecks): void;

  getCurrentPageDecks(): boolean;
  setCurrentPageDecks(value: boolean): void;

  getArrowButton(): ControlButton;
  setArrowButton(value: ControlButton): void;

  getstatusDecksPage(): string;
  setstatusDecksPage(value: string): void;

  getNewDeck(): Deck;
  setNewDeck(value: Deck): void;

  getOpenDeckId(): number;
  setOpenDeckId(value: number): void; 

  getDeckNameInput():  Phaser.GameObjects.Text;
  setDeckNameInput(value:  Phaser.GameObjects.Text): void;

  getNewCardsArray():  Card[];
  setNewCardsArray(value:  Card[]): void;

  getWarningMessage():  Phaser.GameObjects.Text;
  setWarningMessage(value:  Phaser.GameObjects.Text): void;
  
}
