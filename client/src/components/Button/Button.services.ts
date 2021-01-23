
import {BUTTON_SCALE} from './constants';

interface ImageState {
  IDLE: string;
  HOVER: string;
  CLICK: string;
}
  
export function createButton(
  scene: Phaser.Scene,
  positionY: number,
  atlasName: string,
  image: ImageState,
  heightOffset=0,
): Phaser.GameObjects.Sprite {
  const button = scene.add.sprite(
    scene.game.renderer.width / 2,
    scene.game.renderer.height / 2 - positionY + heightOffset,
    atlasName,
    image.IDLE,
  );
  button.setScale(BUTTON_SCALE, BUTTON_SCALE).setInteractive();
  button.on('pointerover', () => {
    button.setFrame(image.HOVER);
  });
  button.on('pointerout', () => {
    button.setFrame(image.IDLE);
  });
  button.on('pointerdown', () => {
    button.setFrame(image.CLICK);
  });
  return button;
}