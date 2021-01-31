import { IMyCardsScene } from '@/components/MyCardsScene/MyCards.model';
import { browserHistory } from '@/router/history';
import { createButton } from '@/components/Button/Button.services';
import { renderArrowButton } from '@/components/Button/Button.render';
import { MENU_URL } from '@/router/constants';
import { ATLASES, MENU_IMAGES } from '@/components/Game/constant';
import { slidePage } from './Button.services';
import { arrowButton, ARROW_BUTTON_RISE_SCALE } from './constants';

export const renderArrowButtonMyCardsScene = (scene: IMyCardsScene): void => {
  arrowButton.forEach(item => {
    const { NAME, IMG, POS_X, POS_Y } = item;
    const slideButton: Phaser.GameObjects.Sprite = scene.add.sprite(POS_X, POS_Y, IMG);
    renderArrowButton(slideButton, NAME);
    slideButton.on('pointerup', () => {
      slideButton.setScale(ARROW_BUTTON_RISE_SCALE, ARROW_BUTTON_RISE_SCALE);
      slideButton.clearTint();
      slidePage(scene, slideButton.name);
    });
  });
};

export const createMenyButton = (
  scene: IMyCardsScene,
  cardsBgAudio: Phaser.Sound.BaseSound,
): void => {
  const positionMenu = {
    OFFSET_X: 650,
    Y: 140,
  };
  const positionMenuCoords = {
    X: scene.cameras.main.width - positionMenu.OFFSET_X,
    Y: positionMenu.Y,
  };

  const menuButton = createButton(
    scene,
    positionMenuCoords,
    0,
    ATLASES.MENU_ATLAS.NAME,
    MENU_IMAGES.MENU_BUTTON,
    500,
  );
  menuButton.setScale(0.4);

  menuButton.on('pointerup', () => {
    cardsBgAudio.stop();
    browserHistory.push(MENU_URL);
  });
};
