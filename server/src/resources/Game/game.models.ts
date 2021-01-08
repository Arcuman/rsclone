import {Card} from '@/resources/Card/card.models';
import { Player } from './Player/player.model';

export interface Room {
  id: string;
  isPlayerOneTurn: boolean;
  players: Array<Player>;
}

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
