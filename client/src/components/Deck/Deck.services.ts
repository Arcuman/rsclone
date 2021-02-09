import { Deck } from '@/components/Deck/Deck.model';
import { StatusCodes } from 'http-status-codes';
import { getRequestInit, API_INFO_URLS } from '@/services/api.services';
import { AUDIO_CONFIG, CURSOR_POINTER } from '@/constants/constants';
import { AUDIO } from '@/components/Game/constant';
import { IMyCardsScene} from '@/components/MyCardsScene/MyCards.model';
import { openDeck } from '@/components/MyCardsScene/MyCards.services';
import { CARDS_VIEW_DECK } from '@/components/MyCardsScene/constants';
import { TINT_VALUE } from './constants';

export const getUserDeckById = async (deckId: number): Promise<Deck> => {
  const requestInit = getRequestInit();

  const userDeck = await fetch(`${API_INFO_URLS.userDeck}/${deckId}`, requestInit)
    .then(
      (response): Promise<Deck> => {
        if (response.status !== StatusCodes.OK) {
          throw new Error();
        }
        return response.json();
      },
    )
    .then((deck: Deck) => deck)
    .catch(error => {
      throw new Error(error);
    });

  return userDeck;
};

export const getUserDecks = async (): Promise<Deck[]> => {
  const requestInit = getRequestInit();

  const userDecks = await fetch(`${API_INFO_URLS.userDeck}`, requestInit)
    .then(
      (response): Promise<Deck[]> => {
        if (response.status !== StatusCodes.OK) {
          throw new Error();
        }
        return response.json();
      },
    )
    .then((decks: Deck[]) => decks)
    .catch(error => {
      throw new Error(error);
    });

  return userDecks;
};

export const deleteUserDeckById = async (deckId: number): Promise<boolean> => {
  const requestInit = getRequestInit('DELETE');

  const isDelete = await fetch(`${API_INFO_URLS.userDeck}/${deckId}`, requestInit)
    .then(
      (response): Promise<boolean> => {
        if (response.status !== StatusCodes.NO_CONTENT) {
          throw new Error();
        }
        return new Promise(() => true);
      },
    )
    .catch(error => {
      throw new Error(error);
    });

  return isDelete;
};

export const setUserDeckWithCards = async (deckData: Deck): Promise<number> => {
  const requestInit = getRequestInit('POST');
  const body = JSON.stringify(deckData);
  requestInit.body = body;

  const newDeckId = fetch(`${API_INFO_URLS.userDeck}`, requestInit)
    .then(
      (response): Promise<number> => {
        if (response.status !== StatusCodes.OK) {
          throw new Error();
        }
        return response.json();
      })
    .then((deckId: number) => deckId)
    .catch(error => {
      throw new Error(error);
    });
  return newDeckId;
};

export const updateUserDeckWithCards = async (deckData: Deck): Promise<boolean> => {
  const requestInit = getRequestInit('PUT');
  const deckId = deckData.user_deck_id;
  if (!deckId) {
    throw new Error();
  }
  const body = JSON.stringify(deckData);
  requestInit.body = body;

  const isUpdateDeck = fetch(`${API_INFO_URLS.userDeck}/${deckId}`, requestInit)
    .then(
      (response): Promise<boolean> => {
        if (response.status !== StatusCodes.OK) {
          throw new Error();
        }
        return new Promise(() => true);
      },
    )
    .catch(error => {
      throw new Error(error);
    });
  return isUpdateDeck;
};

export const setColoredDeck = (scene:Phaser.Scene, topCard: Phaser.GameObjects.Sprite): void => {
  topCard.setInteractive({ cursor: CURSOR_POINTER });
  topCard.removeListener('pointerover');
  topCard.on('pointerover', () => {
    topCard.setTint(TINT_VALUE);
    
    const cardAudio = scene.sound.add(AUDIO.DECK_OVER_AUDIO.NAME, {volume: AUDIO_CONFIG.volume.card});
    cardAudio.play();
  });

  topCard.removeListener('pointerout');
  topCard.on('pointerout', () => {
    topCard.clearTint();
  });
};

export const setClickableDeck = (
  scene: IMyCardsScene,
  userDeck: Deck,
  topCard: Phaser.GameObjects.Sprite,
  tintValue: number,
): void => {
  topCard.setInteractive({ cursor: CURSOR_POINTER });
  topCard.on('pointerdown', () => {
    topCard.setTint(tintValue);
  });
  topCard.on('pointerup', () => {
    topCard.clearTint();
    scene.setCurrentPageDecks(false);
    scene.setstatusDecksPage(CARDS_VIEW_DECK);
    openDeck(scene, userDeck);
  });
};
