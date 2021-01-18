import Phaser from 'phaser';
import { SCENES } from '../Game/constant';
import { create } from './GameBoard.services';

export class GameBoardScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENES.GAME,
      active: false,
      visible: false,
    });
  }

  create(): void {
    create(this);
  }
}
