import Phaser from 'phaser';
import { StatusCodes } from 'http-status-codes';
import { getRequestInit, API_INFO_URLS } from '@/services/api.services';
import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import {
  HAND_CARD_PLAY,
  TABLE_CARD_PLAY_CARD_TARGET,
  TABLE_CARD_PLAY_PLAYER_TARGET,
} from '@/components/GameBoard/constants';
import { ZONE_COUNT_CARDS_FIELD, ZONE_TABLE_NAME } from '@/components/GameBoard/Table/constants';
import { MANA_COUNT_FIELD } from '@/components/GameBoard/UserMana/constants';
import { IS_PLAYER_ONE_TURN_FIELD } from '@/components/GameBoard/EndTurnButton/constants';
import { ENEMY_CARD } from '@/components/GameBoard/EnemyCards/constant';
import { ENEMY_PLAYER } from '@/components/GameBoard/UserAvatar/constants';
import { AUDIO } from '@/components/Game/constant';
import { CURSOR_POINTER, AUDIO_CONFIG } from '@/constants/constants';
import { addCardInDeck } from '@/components/MyCardsScene/MyCards.services';
import { IMyCardsScene } from '@/components/MyCardsScene/MyCards.model';
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
  MAX_TABLE_SIZE,
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

export function calcNewPosition(
  cards: Phaser.GameObjects.Container[],
  deletedIndex: number,
): number {
  const sortedCards = cards;
  let newDeletedIndex = deletedIndex;
  if (newDeletedIndex % 2 === 1) {
    for (let i = newDeletedIndex; i > 1; i -= 2) {
      [sortedCards[i], sortedCards[i - 2]] = [sortedCards[i - 2], sortedCards[i]];
    }
    [sortedCards[0], sortedCards[1]] = [sortedCards[1], sortedCards[0]];
    newDeletedIndex = 0;
  }
  for (let i = newDeletedIndex; i < sortedCards.length; i += 2) {
    if (!sortedCards[i + 2]) {
      break;
    }
    newDeletedIndex += 2;
    [sortedCards[i], sortedCards[i + 2]] = [sortedCards[i + 2], sortedCards[i]];
  }
  if (newDeletedIndex === 0 && sortedCards.length === 2) {
    [sortedCards[0], sortedCards[1]] = [sortedCards[1], sortedCards[0]];
    newDeletedIndex = 1;
  }
  return newDeletedIndex;
}

export function animateNewPosition(
  scene: Phaser.Scene,
  cards: Phaser.GameObjects.Container[],
): void {
  cards.forEach((card, index) => {
    const newPosX = getPositionOfCard(scene, index);
    scene.tweens.add({
      targets: card,
      x: { value: newPosX, duration: 700, ease: 'Power2' },
    });
  });
}

export const setScalableCard = (
  scene: Phaser.Scene,
  cardContainer: Phaser.GameObjects.Container,
  scale: number,
): void => {
  cardContainer.setInteractive({ cursor: CURSOR_POINTER });
  cardContainer.removeListener('pointerover');
  cardContainer.on('pointerover', () => {
    const cardAudio = scene.sound.add(AUDIO.CARD_OVER_AUDIO.NAME, {
      volume: AUDIO_CONFIG.volume.card,
    });
    cardAudio.play();
    cardContainer.setScale(SIZE_NORMAL_CARD);
    cardContainer.setDepth(DEPTH_CLICK_CARD);
  });
  cardContainer.removeListener('pointerout');
  cardContainer.on('pointerout', () => {
    const cardAudio = scene.sound.add(AUDIO.CARD_AWAY_AUDIO.NAME, {
      volume: AUDIO_CONFIG.volume.card,
    });
    cardAudio.play();
    cardContainer.setScale(scale);
    cardContainer.setDepth(DEPTH_NORMAL_CARD);
  });
};

export const setScalableCardInContainer = (
  scene: IMyCardsScene,
  cardContainer: Phaser.GameObjects.Container,
  scale: number,
  generalСontainer: Phaser.GameObjects.Container,
): void => {
  cardContainer.setInteractive({ cursor: CURSOR_POINTER });
  cardContainer.removeListener('pointerover');
  cardContainer.on('pointerover', () => {
    const cardAudio = scene.sound.add(AUDIO.CARD_OVER_AUDIO.NAME, {
      volume: AUDIO_CONFIG.volume.card,
    });
    cardAudio.play();
    cardContainer.setScale(SIZE_NORMAL_CARD);
    generalСontainer.bringToTop(cardContainer);
  });

  cardContainer.removeListener('pointerout');
  cardContainer.on('pointerout', () => {
    const cardAudio = scene.sound.add(AUDIO.CARD_AWAY_AUDIO.NAME, {
      volume: AUDIO_CONFIG.volume.card,
    });
    cardAudio.play();
    cardContainer.setScale(scale);
  });

  cardContainer.on('pointerdown', () => {
    addCardInDeck(scene, cardContainer);
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
      if (
        scene.getEndTurnButton().getData(IS_PLAYER_ONE_TURN_FIELD) !== scene.getIsPlayerOne() ||
        dropZone.name === ZONE_TABLE_NAME
      ) {
        return;
      }
      if (dropZone.name === ENEMY_CARD) {
        scene
          .getSocket()
          .emit(
            TABLE_CARD_PLAY_CARD_TARGET,
            cardContainer.getData(CARD_ID_FIELD),
            dropZone.getData(CARD_ID_FIELD),
          );
      }
      if (dropZone.name === ENEMY_PLAYER) {
        scene.getSocket().emit(TABLE_CARD_PLAY_PLAYER_TARGET, cardContainer.getData(CARD_ID_FIELD));
      }
      cardContainer.setData(CARD_IS_PLAYED_FIELD, true);
    },
  );

  cardContainer.removeListener('dragend');
  /* eslint-disable @typescript-eslint/no-unused-vars */
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
      if (
        scene.getEndTurnButton().getData(IS_PLAYER_ONE_TURN_FIELD) !== scene.getIsPlayerOne() ||
        <number>scene.getPlayerTableZone().getData(ZONE_COUNT_CARDS_FIELD) === MAX_TABLE_SIZE
      ) {
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

      const newMana =
        <number>scene.getPlayerMana().getData(MANA_COUNT_FIELD) -
        <number>cardContainer.getData(CARD_MANA_FIELD);

      let audioManaName;
      if (newMana > 0) {
        audioManaName = AUDIO.MANA_EXPEND.NAME;
      } else {
        audioManaName = AUDIO.MANA_EMPTY.NAME;
      }
      
      const audio = scene.sound.add(audioManaName, { volume: AUDIO_CONFIG.volume.button });
      audio.play();

      scene.setPlayerMana(newMana);

      const deletedIndexCard = scene
        .getPlayerCards()
        .findIndex(card => card.getData(CARD_ID_FIELD) === cardContainer.getData(CARD_ID_FIELD));
      const newDeletedIndexCard = calcNewPosition(scene.getPlayerCards(), deletedIndexCard);
      scene.getPlayerCards().splice(newDeletedIndexCard, 1);
      animateNewPosition(scene, scene.getPlayerCards());
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
      if (!dropped) {
        setStartDragCoordinates(cardContainer);
      } else if (
        scene
          .getPlayerTableCards()
          .findIndex(
            card => card.getData(CARD_ID_FIELD) === cardContainer.getData(CARD_ID_FIELD),
          ) !== -1
      ) {
        setDropEventOnTableCard(scene, cardContainer);
      }
    },
  );
};

export const setClickableCard = (
  scene: Phaser.Scene,
  cardContainer: Phaser.GameObjects.Container,
): void => {
  cardContainer.setInteractive({ cursor: CURSOR_POINTER });
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
    // eslint-disable-next-line @typescript-eslint/no-shadow
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
