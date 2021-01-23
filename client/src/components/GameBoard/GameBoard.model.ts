import { Card } from '@/components/Card/Card.model';

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
