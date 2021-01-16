import { CHANGE_POSITION_CARD_Y, SIZE_NORMAL_CARD, SIZE_LITTLE_CARD } from './constants';

export const setDraggableOnCard = (
  scene: Phaser.Scene,
  cardContainer: Phaser.GameObjects.Container,
  posY: number,
): void => {
  cardContainer.setInteractive();

  scene.input.setDraggable(cardContainer);

  cardContainer.on('pointerover', () => {
    cardContainer.setScale(SIZE_NORMAL_CARD, SIZE_NORMAL_CARD);
    cardContainer.setY(posY - CHANGE_POSITION_CARD_Y);
  });

  cardContainer.on('pointerout', () => {
    cardContainer.setScale(SIZE_LITTLE_CARD, SIZE_LITTLE_CARD);
    cardContainer.setY(posY);
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
