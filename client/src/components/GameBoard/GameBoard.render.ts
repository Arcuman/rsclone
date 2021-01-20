import Phaser from 'phaser';
import { SCENES } from '@/components/Game/constant';
import { GameState } from '@/components/GameBoard/GameBoard.model';
import { create } from './GameBoard.services';

export class GameBoardScene extends Phaser.Scene {
  private state: GameState;

  private socket: SocketIOClient.Socket;

  private isPlayerOne = false;

  constructor() {
    super({
      key: SCENES.GAME_BOARD,
      active: false,
      visible: false,
    });
  }

  create(data: {
    gameState: GameState;
    socket: SocketIOClient.Socket;
    isPlayerOne: boolean;
  }): void {
    this.state = data.gameState;
    this.socket = data.socket;
    this.isPlayerOne = data.isPlayerOne;
    // eslint-disable-next-line no-console
    console.log(this.state);
    create(this);
  }
}
