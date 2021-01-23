import { Socket } from 'socket.io';
import { Card } from '@/resources/card/card.model';

export interface Player {
  userId: number;
  socket: Socket;
  name: string;
  health: number;
  currentMana: number;
  maxMana: number;
  handCards: Array<Card>;
  deckCards: Array<Card>;
  tableCards: Array<Card>;
  setMaxMana(value: number): void;
  setCurrentMana(value: number): void;
}
