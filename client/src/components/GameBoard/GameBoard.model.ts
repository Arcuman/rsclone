import { Card } from '@/components/Card/Card.model';
import Phaser from 'phaser';

export interface IGameBoardScene extends Phaser.Scene {
  getState(): GameState;
  getPlayerCards(): Phaser.GameObjects.Container[];
  getSocket(): SocketIOClient.Socket;
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
