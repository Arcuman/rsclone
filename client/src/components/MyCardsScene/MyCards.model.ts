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

export interface IMyCardsScene extends Phaser.Scene{
  getUserCards(): Card[];
  setUserCards(value: Card[]): void;
}
