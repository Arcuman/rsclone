import {
  TINT_VALUE_CLICK,
  ARROW_BUTTON_NORMAL_SCALE,
  ARROW_BUTTON_RISE_SCALE,
} from './constants';

export const renderArrowButton = (slideButton: Phaser.GameObjects.Sprite, NAME: string): void => {
  slideButton.setName(NAME);
  slideButton.setScale(ARROW_BUTTON_NORMAL_SCALE, ARROW_BUTTON_NORMAL_SCALE);
  slideButton.setInteractive();
  slideButton.on('pointerover', () => {
    slideButton.setScale(ARROW_BUTTON_RISE_SCALE, ARROW_BUTTON_RISE_SCALE);
  });
  slideButton.on('pointerout', () => {
    slideButton.setScale(ARROW_BUTTON_NORMAL_SCALE, ARROW_BUTTON_NORMAL_SCALE);
  });
  slideButton.on('pointerdown', () => {
    slideButton.setScale(ARROW_BUTTON_NORMAL_SCALE, ARROW_BUTTON_NORMAL_SCALE);
    slideButton.setTint(TINT_VALUE_CLICK);
  });
};