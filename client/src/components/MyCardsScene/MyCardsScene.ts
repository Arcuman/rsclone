import Phaser from 'phaser';
import { IMAGES, SCENES } from '@/components/Game/constant';
import { setBackground } from '@/utils/utils';

import { create } from './MyCards.render';

export class MyCardsScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENES.MY_CARDS,
      active: false,
      visible: false,
    });
  }

  create(): void {
    setBackground(this, IMAGES.MY_CARDS_BACKGROUND.NAME);
    create(this);    
  }
}
