import {Card} from '@/resources/Card/card.models';

export interface GameState {
  health: number;
  maxMana:number;
  currentMana:number;
  handCards: Array<Card>;
  deckCountCards:number;
  isPlayerOneTurn: boolean;
  enemy : {
    health: number;
    maxMana:number;
    currentMana:number;
    countCards:number;
    deckCountCards:number;
  };
}
