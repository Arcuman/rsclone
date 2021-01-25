/* eslint-disable no-console */
import Phaser from 'phaser';
import { StatusCodes } from 'http-status-codes';
import { getRequestInit, API_INFO_URLS } from '@/services/api.services';
import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import { HAND_CARD_PLAY } from '@/components/GameBoard/constants';
import { ZONE_COUNT_CARDS_FIELD, ZONE_TABLE_NAME } from '@/components/GameBoard/Table/constants';
import { MANA_COUNT_FIELD } from '@/components/GameBoard/UserMana/constants';
import { IS_PLAYER_ONE_TURN_FIELD } from '@/components/GameBoard/EndTurnButton/constants';
import {
  SIZE_NORMAL_CARD,
  SIZE_LITTLE_CARD,
  DEPTH_NORMAL_CARD,
  DEPTH_CLICK_CARD,
  IMAGE_CARD_SIZE,
  CARD_ID_FIELD,
  CARD_MANA_FIELD,
  SIZE_TINY_CARD,
  CARD_IS_PLAYED_FIELD,
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
export const setScalableCard = (
  scene: Phaser.Scene,
  cardContainer: Phaser.GameObjects.Container,
  scale: number,
): void => {
  cardContainer.setInteractive();
  cardContainer.removeListener('pointerover');
  cardContainer.on('pointerover', () => {
    cardContainer.setScale(SIZE_NORMAL_CARD);
    cardContainer.setDepth(DEPTH_CLICK_CARD);
  });
  cardContainer.removeListener('pointerout');
  cardContainer.on('pointerout', () => {
    cardContainer.setScale(scale);
    cardContainer.setDepth(DEPTH_NORMAL_CARD);
  });
};

export const setDraggableCardsDependOnPlayerMana = (scene: IGameBoardScene): void => {
  scene.getPlayerCards().forEach(card => {
    if (
      <number>scene.getPlayerMana().getData(MANA_COUNT_FIELD) >=
      <number>card.getData(CARD_MANA_FIELD)
    ) {
      scene.input.setDraggable(card);
    } else {
      scene.input.setDraggable(card, false);
    }
  });
};
export const activateTableCards = (scene: IGameBoardScene): void => {
  scene.getPlayerTableCards().forEach(card => {
    scene.input.setDraggable(card);
    card.setData(CARD_IS_PLAYED_FIELD, false);
  });
};

const setStartDragCoordinates = (cardContainer: Phaser.GameObjects.Container): void => {
  const gameObjectParameters = cardContainer;
  gameObjectParameters.x = cardContainer.input.dragStartX;
  gameObjectParameters.y = cardContainer.input.dragStartY;
};

export const setDropEventOnTableCard = (
  scene: IGameBoardScene,
  cardContainer: Phaser.GameObjects.Container,
): void => {
  cardContainer.removeListener('drop');
  cardContainer.on(
    'drop',
    (pointer: Phaser.GameObjects.GameObject, dropZone: Phaser.GameObjects.Zone) => {
      if (<boolean>cardContainer.getData(CARD_IS_PLAYED_FIELD)) {
        return;
      }
      console.log(dropZone.name);
      cardContainer.setData(CARD_IS_PLAYED_FIELD, true);
    },
  );
  cardContainer.removeListener('dragend');
  cardContainer.on(
    'dragend',
    (pointer: Phaser.GameObjects.GameObject, dragX: number, dragY: number, dropped: boolean) => {
      setStartDragCoordinates(cardContainer);
    },
  );
};

export const setDropEventOnHandCard = (
  scene: IGameBoardScene,
  cardContainer: Phaser.GameObjects.Container,
): void => {
  cardContainer.removeListener('drop');
  cardContainer.on(
    'drop',
    (pointer: Phaser.GameObjects.GameObject, dropZone: Phaser.GameObjects.Zone) => {
      if (scene.getEndTurnButton().getData(IS_PLAYER_ONE_TURN_FIELD) !== scene.getIsPlayerOne()) {
        setStartDragCoordinates(cardContainer);
        return;
      }
      if (dropZone.name !== ZONE_TABLE_NAME) {
        setStartDragCoordinates(cardContainer);
        return;
      }
      const gameObject = cardContainer;
      gameObject.x = getPositionOfCard(scene, <number>dropZone.getData(ZONE_COUNT_CARDS_FIELD));
      gameObject.y = dropZone.y;
      scene.input.setDraggable(cardContainer, false);
      dropZone.setData(
        ZONE_COUNT_CARDS_FIELD,
        <number>dropZone.getData(ZONE_COUNT_CARDS_FIELD) + 1,
      );
      setScalableCard(scene, cardContainer, SIZE_TINY_CARD);
      const socket = scene.getSocket();
      socket.emit(HAND_CARD_PLAY, cardContainer.getData(CARD_ID_FIELD));

      scene.setPlayerMana(
        <number>scene.getPlayerMana().getData(MANA_COUNT_FIELD) -
          <number>cardContainer.getData(CARD_MANA_FIELD),
      );

      const indexDeleteCard = scene
        .getPlayerCards()
        .findIndex(card => card.getData(CARD_ID_FIELD) === cardContainer.getData(CARD_ID_FIELD));
      scene.getPlayerCards().splice(indexDeleteCard, 1);
      scene.getPlayerTableCards().push(cardContainer);

      setDraggableCardsDependOnPlayerMana(scene);
    },
  );
};

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
      console.log('first dragend');
      if (!dropped) {
        setStartDragCoordinates(cardContainer);
      } else {
        setDropEventOnTableCard(scene, cardContainer);
      }
    },
  );
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

  const userCards = await fetch(`${API_INFO_URLS.cards}`, requestInit)
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

  return userCards;
};

export const countCards = async (): Promise<number> => {
  const userCards = await getUserCards();

  return userCards.length;
};
