import { SCENES } from '@/components/Game/constant';
import Phaser from 'phaser';

import { preload } from './LoadScene.services';

export class LoadScene extends Phaser.Scene {
  private nextScene: string;

  constructor() {
    super({
      key: SCENES.LOAD,
      active: false,
      visible: false,
    });
  }

  init(data: { nextScene: string }): void {
    this.nextScene = data.nextScene;
  }

  preload(): void {
    preload(this, this.nextScene);
  }
}
