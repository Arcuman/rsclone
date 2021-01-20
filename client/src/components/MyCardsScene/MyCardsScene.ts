import Phaser from 'phaser';
import { IMAGES, SCENES } from '@/components/Game/constant';

function setBackground(game: Phaser.Scene) {
  const image = game.add.image(
    game.cameras.main.width / 2,
    game.cameras.main.height / 2,
    IMAGES.LOAD_BACKGROUND.NAME,
  );
  const scaleX = game.cameras.main.width / image.width;
  const scaleY = game.cameras.main.height / image.height;
  const scale = Math.max(scaleX, scaleY);
  image.setScale(scale).setScrollFactor(0);
}

export class MyCardsScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENES.MY_CARDS,
      active: false,
      visible: false,
    });
  }

  create(): void {
    setBackground(this);
  }
}
