import { Card } from '@/components/Card/Card.model';

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
  CARDS_DATA: Card[];
  CURRENT_PAGE: number;
  TOTAL_PAGE: number;  
}

export interface IMyCardsScene extends Phaser.Scene{
  getUserCards(): Card[];
  setUserCards(value: Card[]): void;

  getMyCardsContainer(): Phaser.GameObjects.Container;
  setMyCardsContainer(value: Phaser.GameObjects.Container): void;

  getDeksContainer(): Phaser.GameObjects.Container;
  setDeksContainer(value: Phaser.GameObjects.Container): void;

  getMyCardsCurrentPage(): number;
  setMyCardsCurrentPage(value: number): void;  

  getStateCardsOfDecks(): StateCardsOfDecks;
  setStateCardsOfDecks(value: StateCardsOfDecks): void;
}
