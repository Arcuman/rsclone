import {Card} from '@/resources/card/card.models';

export enum TargetType {
  enemyCard,
  enemyPlayer,
}

export interface GameState {
  name: string;
  health: number;
  maxMana: number;
  currentMana: number;
  handCards: Array<Card>;
  deckCountCards: number;
  tableCards: Array<Card>;
  isPlayerOneTurn: boolean;
  enemy: {
    name: string;
    health: number;
    maxMana: number;
    currentMana: number;
    countCards: number;
    deckCountCards: number;
    tableCards: Array<Card>;
  };
}
