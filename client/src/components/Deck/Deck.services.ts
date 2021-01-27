import { Deck } from '@/components/Deck/Deck.model';
import { StatusCodes } from 'http-status-codes';
import { getRequestInit, API_INFO_URLS } from '@/services/api.services';
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
        return new Promise(()=>true);
      },
    )
    .catch(error => {
      throw new Error(error);
    });

  return isDelete;
};

export const setUserDeckWithCards = async (deckData:Deck):Promise<boolean>=>{
  const requestInit = getRequestInit('POST');
  const body = JSON.stringify(deckData);
  requestInit.body = body;

  const isSetDeck = fetch(`${API_INFO_URLS.userDeck}`, requestInit)
    .then((response): Promise<boolean> => {
      if (response.status !== StatusCodes.OK) {
        throw new Error();
      }
      return new Promise(()=>true);
    })
    .catch((error) => {
      throw new Error(error);
    });
  return isSetDeck;
};

export const updateUserDeckWithCards = async (deckData:Deck):Promise<boolean>=>{
  const requestInit = getRequestInit('PUT');
  const deckId = deckData.user_deck_id;
  if (!deckId){
    throw new Error();
  }
  const body = JSON.stringify(deckData);
  requestInit.body = body;

  const isUpdateDeck = fetch(`${API_INFO_URLS.userDeck}/${deckId}`, requestInit)
    .then((response): Promise<boolean> => {
      if (response.status !== StatusCodes.OK) {
        throw new Error();
      }
      return new Promise(()=>true);
    })
    .catch((error) => {
      throw new Error(error);
    });
  return isUpdateDeck;
};

export const setColoredDeck = (  
  topCard: Phaser.GameObjects.Sprite,  
): void => {
  topCard.setInteractive();
  topCard.removeListener('pointerover');
  topCard.on('pointerover', () => {    
    topCard.setTint(TINT_VALUE);
  });

  topCard.removeListener('pointerout');
  topCard.on('pointerout', () => {
    topCard.clearTint();     
  });
};