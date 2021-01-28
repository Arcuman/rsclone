import { Card } from '@/components/Card/Card.model';
import Phaser from 'phaser';

export interface UpdatedUserLevelInfo {
  prevLevel: number;
  newLevel: number;
  prevExp: number;
  curExp: number;
  nextLevelExp: number;
  totalLevelExp: number;
  newCard?: Card;
}

export interface IGameBoardScene extends Phaser.Scene {
  getPlayerCards(): Phaser.GameObjects.Container[];
  getEnemyCards(): Phaser.GameObjects.Container[];
  getPlayerTableCards(): Phaser.GameObjects.Container[];
  getEnemyTableCards(): Phaser.GameObjects.Container[];
  getSocket(): SocketIOClient.Socket;
  getPlayerMana(): Phaser.GameObjects.Container;
  getEndTurnButton(): Phaser.GameObjects.Container;
  getIsPlayerOne(): boolean;
  getPlayerTableZone(): Phaser.GameObjects.Zone;
  setPlayerMana(value: number): void;
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
