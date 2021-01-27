import { Deck } from '@/components/Deck/Deck.model';
import { StatusCodes } from 'http-status-codes';
import { getRequestInit, API_INFO_URLS } from '@/services/api.services';

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

export const setColoredDeck = (  
  topCard: Phaser.GameObjects.GameObject,  
): void => {
  topCard.setInteractive();
  topCard.removeListener('pointerover');
  topCard.on('pointerover', () => {
    topCard.setTint(0x9a8b6a);
  });

  topCard.removeListener('pointerout');
  topCard.on('pointerout', () => {
    topCard.clearTint();     
  });
};

