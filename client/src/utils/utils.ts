import { TextDecoration } from '@/types/types';
import Phaser from 'phaser';
import { TINT_VALUE_DISABLE } from '@/constants/constants';
import { IMyCardsScene } from '@/components/MyCardsScene/MyCards.model';
import { renderContainer } from '@/components/MyCardsScene/MyCards.render';
import { NAME_DECKS, decksContainerPosition, cardsContainerPosition, NAME_CARDS } from '@/components/MyCardsScene/constants';

export function deleteOldMain(): void {
  const oldMain: HTMLElement | null = document.body.querySelector('.main');
  if (oldMain !== null) {
    oldMain.remove();
  }
}

export function setBackground(game: Phaser.Scene, backgroundPath: string): void {
  const image = game.add.image(
    game.cameras.main.width / 2,
    game.cameras.main.height / 2,
    backgroundPath,
  );
  const scaleX = game.cameras.main.width / image.width;
  const scaleY = game.cameras.main.height / image.height;
  const scale = Math.max(scaleX, scaleY);
  image.setScale(scale).setScrollFactor(0);
}

export const createHtmlElement = (tagName: string, className = ''): HTMLElement => {
  const element: HTMLElement = document.createElement(tagName);
  if (className !== '') {
    element.className = className;
  }
  return element;
};

export const createTextData = (
  scene: Phaser.Scene,
  posX: number,
  posY: number,
  value: string,
  textDecoration: TextDecoration,
): Phaser.GameObjects.Text => {
  const {
    FONT_SIZE,
    FONT_FAMILY,
    FONT_COLOR,
    TEXT_OUTLINE_COLOR,
    TEXT_OUTLINE_SIZE,
    TEXT_DEPTH,
    IS_SET_ORIGIN = false,
  } = textDecoration;
  const fontOptions = {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE,
    color: FONT_COLOR,
  };

  const text: Phaser.GameObjects.Text = scene.add.text(posX, posY, value, fontOptions);
  if (IS_SET_ORIGIN) {
    text.setOrigin(0.5);
  }

  text.setStroke(TEXT_OUTLINE_COLOR, TEXT_OUTLINE_SIZE);
  text.depth = TEXT_DEPTH;

  return text;
};

export const setShadow = (
  scene: Phaser.Scene,
  card: string,
  posX: number,
  posY: number,
  tintValue: number,
  alphaValue: number,
): Phaser.GameObjects.Sprite => {
  const shadow = scene.add.sprite(posX, posY, card);
  shadow.tint = tintValue;
  shadow.alpha = alphaValue;

  return shadow;
};

export const makeDisableButton = (button: Phaser.GameObjects.Image): void => {
  button.disableInteractive();
  button.setTint(TINT_VALUE_DISABLE);
};

export const makeEnableButton = (button: Phaser.GameObjects.Image): void => {
  button.setInteractive();
  button.clearTint();
};

export const clearDecksContainer = (scene:  IMyCardsScene): Phaser.GameObjects.Container => {
  const decksContainerOld = scene.getDecksContainer();
  decksContainerOld.destroy();
  const decksContainer = renderContainer(scene, NAME_DECKS, decksContainerPosition);
  scene.setDecksContainer(decksContainer);

  return decksContainer;
};

export const clearCardsContainer = (scene:  IMyCardsScene): Phaser.GameObjects.Container => {
  const cardsContainerOld = scene.getMyCardsContainer();
  cardsContainerOld.destroy();
  const myCardsContainer = renderContainer(scene, NAME_CARDS, cardsContainerPosition);
  scene.setMyCardsContainer(myCardsContainer);

  return myCardsContainer;
};
