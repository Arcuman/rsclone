import Phaser from 'phaser';
import { IMAGES, SCENES } from '@/components/Game/constant';
import { setBackground } from '@/utils/utils';

export class MyCardsScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENES.MY_CARDS,
      active: false,
      visible: false,
    });
  }

  create(): void {
    setBackground(this, IMAGES.LOAD_BACKGROUND.NAME);
  }
}
