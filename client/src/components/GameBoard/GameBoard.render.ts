import * as Phaser from 'phaser';
import { createHtmlElement } from '@/utils/utils';
import { create, preload } from '@/components/GameBoard/GameBoard.services';

const createConfig = (parent: HTMLElement): Phaser.Types.Core.GameConfig => ({
  type: Phaser.AUTO,
  parent,
  width: 1280,
  height: 720,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: false,
  },
  scene: { preload, create },
  backgroundColor: 0x333333,
});

export const game = (): Phaser.Game => {
  const gameElement = createHtmlElement('div', 'game');
  document.body.innerHTML = '';
  document.body.style.background = '#ff2342';
  document.body.appendChild(gameElement);
  const config = createConfig(gameElement);
  return new Phaser.Game(config);
};
