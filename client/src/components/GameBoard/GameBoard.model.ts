import { Card } from '@/components/Card/Card.model';

export interface GameState {
  health: number;
  maxMana: number;
  currentMana: number;
  handCards: Array<Card>;
  deckCountCards: number;
  tableCards: Array<Card>;
  isPlayerOneTurn: boolean;
  enemy: {
    health: number;
    maxMana: number;
    currentMana: number;
    countCards: number;
    deckCountCards: number;
    tableCards: Array<Card>;
  };
}
