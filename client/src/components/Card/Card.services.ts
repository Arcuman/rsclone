import Phaser from 'phaser';
import { StatusCodes } from 'http-status-codes';
import { getRequestInit, API_INFO_URLS } from '@/services/api.services';
import {
  SIZE_NORMAL_CARD,
  SIZE_LITTLE_CARD,
  DEPTH_NORMAL_CARD,
  DEPTH_CLICK_CARD,
  IMAGE_CARD_SIZE,
} from './constants';
import { Card } from './Card.model';

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
  scene: Phaser.Scene,
  cardContainer: Phaser.GameObjects.Container,
): void => {
  cardContainer.setInteractive();
  scene.input.setDraggable(cardContainer);
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

export const getUserCards = async (): Promise<Card[]> => {
  const requestInit = getRequestInit();

  const cards = await fetch(`${API_INFO_URLS.cards}`, requestInit)
    .then(
      (response): Promise<Card[]> => {
        if (response.status !== StatusCodes.OK) {
          throw new Error();
        }
        return response.json();
      },
    )
    .then((cards: Card[]): Card[] => cards)
    .catch(error => {
      throw new Error(error);
    });

  return cards;
};

export const countCards = async (): Promise<number> => {
  const userCards = await getUserCards();
  
  return userCards.length;
};
