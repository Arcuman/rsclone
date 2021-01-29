import { IMyCardsScene} from '@/components/MyCardsScene/MyCards.model';
import { decksPosition, NAME_DECKS, cardsPosition, NAME_CARDS } from '@/components/MyCardsScene/constants';
import { renderMyCards } from '@/components/MyCardsScene/MyCards.render';
import { CARDS_LEFT, CARDS_RIGHT, DECKS_RIGHT, DECKS_LEFT, MIN_POSSIBLE_PAGES, ONE_PAGE } from './constants';

const slideDecksPage = (scene: IMyCardsScene, name: string): void => {
  const stateCardsOfDecks =  scene.getStateCardsOfDecks();
  const cardsCurrent = stateCardsOfDecks.CARDS_DATA;
  const decksContainer = scene.getDecksContainer();
  decksContainer.removeAll();

  if (name === DECKS_RIGHT) {
    if (stateCardsOfDecks.CURRENT_PAGE < stateCardsOfDecks.TOTAL_PAGE) {
      stateCardsOfDecks.CURRENT_PAGE += ONE_PAGE;
    }
  } else if (name === DECKS_LEFT) {
    if (stateCardsOfDecks.CURRENT_PAGE > MIN_POSSIBLE_PAGES) {
      stateCardsOfDecks.CURRENT_PAGE -= ONE_PAGE;
    }
  }

  renderMyCards(scene, NAME_DECKS, cardsCurrent, decksPosition, decksContainer);    
};

const slideCardsPage = (scene: IMyCardsScene, name: string): void => {
  const cardsCurrent = scene.getUserCards();
  const myCardsContainer = scene.getMyCardsContainer();
  const myCardsCurrentPage = scene.getMyCardsCurrentPage();
  const myCardsTotalPage = scene.getMyCardsTotalPage();
  myCardsContainer.removeAll();

  if (name === CARDS_RIGHT) {
    if (myCardsCurrentPage < myCardsTotalPage) {
      scene.setMyCardsCurrentPage(myCardsCurrentPage + ONE_PAGE);
    }
  } else if (name === CARDS_LEFT) {
    if (myCardsCurrentPage > MIN_POSSIBLE_PAGES) {
      scene.setMyCardsCurrentPage(myCardsCurrentPage - ONE_PAGE);
    }
  }
  
  renderMyCards(scene, NAME_CARDS, cardsCurrent, cardsPosition, myCardsContainer);    
};

export const slidePage = (scene: IMyCardsScene, name: string): void => {
  if (name === DECKS_RIGHT || name === DECKS_LEFT) {
    slideDecksPage(scene, name);
  } else if (name === CARDS_LEFT || name === CARDS_RIGHT) {
    slideCardsPage(scene, name);
  }
};