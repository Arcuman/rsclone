import { SCENES } from '@/components/Game/constant';
import Phaser from 'phaser';
import { create } from './MenuScene.services';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENES.MENU,
      active: false,
      visible: false,
    });
  }

  create(): void {
    create(this);
  }
}
