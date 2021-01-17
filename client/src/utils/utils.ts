import { TextDecoration } from '@/types/types';

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
  } = textDecoration;
  const fontOptions = {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE,
    color: FONT_COLOR,
  };

  const text: Phaser.GameObjects.Text = scene.add.text(posX, posY, value, fontOptions);
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
