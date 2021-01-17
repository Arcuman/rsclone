import Phaser from 'phaser';

export function deleteOldMain(): void {
  const oldMain: HTMLElement | null = document.body.querySelector('.main');
  if (oldMain !== null) {
    oldMain.remove();
  }
}

export function setBackground(game: Phaser.Scene, backgroundPath: string) {
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
