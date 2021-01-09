import {Socket} from 'socket.io';
import {Card} from '@/resources/Card/card.models';

export interface Player{
  userId: number;
  socket: Socket;
  health: number;
  currentMana: number;
  maxMana: number;
  handCards: Array<Card>;
  deckCards: Array<Card>;
  tableCards: Array<Card>;
}
