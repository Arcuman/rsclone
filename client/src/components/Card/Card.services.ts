import Phaser from 'phaser';
import {
  CHANGE_POSITION_CARD_Y,
  SIZE_NORMAL_CARD,
  SIZE_LITTLE_CARD,
  DEPTH_NORMAL_CARD, DEPTH_CLICK_CARD, IMAGE_CARD_SIZE,
} from './constants';

export function getPositionOfCard(scene: Phaser.Scene, index: number): number {
  const gameWidth = scene.game.config.width;
  const centerWidth: number = <number>gameWidth / 2;
  let posX;
  const offsetCard = Math.ceil(index / 2) * (IMAGE_CARD_SIZE*SIZE_LITTLE_CARD);
  if (index % 2 === 0) {
    posX = centerWidth - offsetCard;
  } else {
    posX = centerWidth + offsetCard;
  }
  return posX;
}

export const setDraggableOnCard = (
  scene: Phaser.Scene,
  cardContainer: Phaser.GameObjects.Container,
  posY: number,
): void => {
  cardContainer.setInteractive();

  scene.input.setDraggable(cardContainer);

  cardContainer.on('pointerover', () => {
    cardContainer.setScale(SIZE_NORMAL_CARD, SIZE_NORMAL_CARD);
    cardContainer.setDepth(DEPTH_CLICK_CARD);
  });

  cardContainer.on('pointerout', () => {
    cardContainer.setScale(SIZE_LITTLE_CARD, SIZE_LITTLE_CARD);
    cardContainer.setDepth(DEPTH_NORMAL_CARD);
  });
  cardContainer.on('pointerdown', () => {
    cardContainer.setScale(SIZE_NORMAL_CARD, SIZE_NORMAL_CARD);
    cardContainer.setDepth(DEPTH_CLICK_CARD);
  });
  cardContainer.on('pointerup', () => {
    cardContainer.setScale(SIZE_LITTLE_CARD, SIZE_LITTLE_CARD);
    cardContainer.setDepth(DEPTH_NORMAL_CARD);
  });
  scene.input.on(
    'drag',
    (
      pointer: Phaser.GameObjects.GameObject,
      gameObject: Phaser.GameObjects.Container,
      dragX: number,
      dragY: number,
    ) => {
      const gameObjectParameters = gameObject;
      gameObjectParameters.x = dragX;
      gameObjectParameters.y = dragY;
    },
  );
};
