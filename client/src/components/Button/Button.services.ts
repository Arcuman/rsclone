
import {BUTTON_SCALE} from './constants';

interface Position{
  X:number;
  Y:number;
}

interface ImageState {
  IDLE: string;
  HOVER: string;
  CLICK: string;
}
  
export function createButton(
  scene: Phaser.Scene,
  position:Position,
  YOffset:number,
  atlasName: string,
  image: ImageState,  
  heightOffset=0,
): Phaser.GameObjects.Sprite {
  const button = scene.add.sprite(
    position.X,
    position.Y- YOffset + heightOffset,
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