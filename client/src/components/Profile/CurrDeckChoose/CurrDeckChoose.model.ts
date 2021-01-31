import { Deck } from '@/components/Deck/Deck.model';

export interface StateOfDecks {
  DECKS_DATA: Deck[];
  CURRENT_PAGE: number;
  TOTAL_PAGE: number;
}
  
export interface ICurrDeckChooseScene extends Phaser.Scene{
  getUserDecks(): Deck[];
  setUserDecks(value: Deck[]): void;
  
  getDecksContainer(): Phaser.GameObjects.Container;
  setDecksContainer(value: Phaser.GameObjects.Container): void;
  
  getCurrentPage(): number;
  setCurrentPage(value: number): void;
  
  getTotalPage(): number;
  setTotalPage(value: number): void; 

  getCurUserDeckId():number;
  setCurUserDeckId(value: number): void; 

  getStateOfDecks(): StateOfDecks;
  setStateOfDecks(value: StateOfDecks): void;
}
  