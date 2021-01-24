/* eslint-disable no-console */
import Phaser from 'phaser';
import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import { HAND_CARD_PLAY } from '@/components/GameBoard/constants';
import { ZONE_COUNT_CARDS_FIELD } from '@/components/GameBoard/Table/constants';
import {
  SIZE_NORMAL_CARD,
  SIZE_LITTLE_CARD,
  DEPTH_NORMAL_CARD,
  DEPTH_CLICK_CARD,
  IMAGE_CARD_SIZE,
  CARD_ID_FIELD,
} from './constants';

export function getPositionOfCard(scene: Phaser.Scene, index: number): number {
  const gameWidth = scene.game.config.width;
  const centerWidth: number = <number>gameWidth / 2;
  let posX;
  const offsetCard = Math.ceil(index / 2) * (IMAGE_CARD_SIZE * SIZE_LITTLE_CARD);
  if (index % 2 === 0) {
    posX = centerWidth - offsetCard;
  } else {
    posX = centerWidth + offsetCard;
  }
  return posX;
}

export const setDraggableCard = (
  scene: IGameBoardScene,
  cardContainer: Phaser.GameObjects.Container,
): void => {
  scene.input.setDraggable(cardContainer, false);
  cardContainer.on(
    'drag',
    (pointer: Phaser.GameObjects.GameObject, dragX: number, dragY: number) => {
      const gameObjectParameters = cardContainer;
      gameObjectParameters.x = dragX;
      gameObjectParameters.y = dragY;
    },
  );
  cardContainer.on(
    'dragend',
    (pointer: Phaser.GameObjects.GameObject, dragX: number, dragY: number, dropped: boolean) => {
      const gameObjectParameters = cardContainer;
      if (!dropped) {
        gameObjectParameters.x = cardContainer.input.dragStartX;
        gameObjectParameters.y = cardContainer.input.dragStartY;
      }
    },
  );
  cardContainer.on(
    'drop',
    (pointer: Phaser.GameObjects.GameObject, dropZone: Phaser.GameObjects.Zone) => {
      const gameObject = cardContainer;
      gameObject.x = getPositionOfCard(scene, <number>dropZone.getData(ZONE_COUNT_CARDS_FIELD));
      gameObject.y = dropZone.y;
      scene.input.setDraggable(cardContainer, false);
      dropZone.setData(
        ZONE_COUNT_CARDS_FIELD,
        <number>dropZone.getData(ZONE_COUNT_CARDS_FIELD) + 1,
      );
      const socket = scene.getSocket();
      socket.emit(
        HAND_CARD_PLAY,
        scene.getState().handCards.find(card => card.id === cardContainer.getData(CARD_ID_FIELD)),
      );
    },
  );
};

export const setScalableCard = (
  scene: Phaser.Scene,
  cardContainer: Phaser.GameObjects.Container,
): void => {
  cardContainer.setInteractive();
  cardContainer.on('pointerover', () => {
    cardContainer.setScale(SIZE_NORMAL_CARD, SIZE_NORMAL_CARD);
    cardContainer.setDepth(DEPTH_CLICK_CARD);
  });
  cardContainer.on('pointerout', () => {
    cardContainer.setScale(SIZE_LITTLE_CARD, SIZE_LITTLE_CARD);
    cardContainer.setDepth(DEPTH_NORMAL_CARD);
  });
};

export const setClickableCard = (
  scene: Phaser.Scene,
  cardContainer: Phaser.GameObjects.Container,
): void => {
  cardContainer.setInteractive();
  cardContainer.on('pointerdown', () => {
    cardContainer.setScale(SIZE_NORMAL_CARD, SIZE_NORMAL_CARD);
    cardContainer.setDepth(DEPTH_CLICK_CARD);
  });
  cardContainer.on('pointerup', () => {
    cardContainer.setScale(SIZE_LITTLE_CARD, SIZE_LITTLE_CARD);
    cardContainer.setDepth(DEPTH_NORMAL_CARD);
  });
};
