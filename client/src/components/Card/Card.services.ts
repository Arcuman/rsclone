export const setDraggableOnCard = (
  scene: Phaser.Scene,
  cardContainer: Phaser.GameObjects.Container,
  posY: number,
): void => {
  cardContainer.setInteractive();

  scene.input.setDraggable(cardContainer);

  cardContainer.on('pointerover', () => {
    cardContainer.setScale(1, 1);
    cardContainer.setY(posY - 100);
  });

  cardContainer.on('pointerout', () => {
    cardContainer.setScale(0.6, 0.6);
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
