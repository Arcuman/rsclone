import { AUDIO } from '@/components/Game/constant';
import { CURSOR_POINTER, AUDIO_CONFIG } from '@/constants/constants';
import {ImageState} from '@/types/types';
import { BUTTON_SCALE } from './constants';

interface Position {
  X: number;
  Y: number;
}

export function createButton(
  scene: Phaser.Scene,
  position: Position,
  YOffset: number,
  atlasName: string,
  image: ImageState,
  heightOffset = 0,
): Phaser.GameObjects.Sprite {
  const button = scene.add.sprite(
    position.X,
    position.Y - YOffset + heightOffset,
    atlasName,
    image.IDLE,
  );
  button.setScale(BUTTON_SCALE, BUTTON_SCALE).setInteractive({ cursor: CURSOR_POINTER });
  button.on('pointerover', () => {
    const btnAudio = scene.sound.add(AUDIO.BUTTON_OVER_AUDIO.NAME, {volume:AUDIO_CONFIG.volume.button});
    btnAudio.play();
    button.setFrame(image.HOVER);
  });
  button.on('pointerout', () => {
    button.setFrame(image.IDLE);
  });
  button.on('pointerdown', () => {
    const btnAudio = scene.sound.add(AUDIO.BUTTON_CLICK_AUDIO.NAME, {volume:AUDIO_CONFIG.volume.button});
    btnAudio.play();
    button.setFrame(image.CLICK);
  });
  return button;
}
