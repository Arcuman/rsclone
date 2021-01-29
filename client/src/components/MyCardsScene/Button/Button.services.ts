import { IMyCardsScene} from '@/components/MyCardsScene/MyCards.model';
import { decksPosition, NAME_DECKS } from '@/components/MyCardsScene/constants';
import { renderMyCards } from '@/components/MyCardsScene/MyCards.render';
import { CARDS_LEFT, CARDS_RIGHT, DECKS_RIGHT, DECKS_LEFT, MIN_POSSIBLE_PAGES } from './constants';

const slideDecksPage = (scene: IMyCardsScene, name: string): void => {
  const stateCardsOfDecks =  scene.getStateCardsOfDecks();
  const cardsCurrent = stateCardsOfDecks.CARDS_DATA;
  const decksContainer = scene.getDeksContainer();
  decksContainer.removeAll();

  if (name === DECKS_RIGHT) {  
    if (stateCardsOfDecks.CURRENT_PAGE < stateCardsOfDecks.TOTAL_PAGE) {     
      stateCardsOfDecks.CURRENT_PAGE += 1;
    }     
    // console.log('stateCardsOfDecks.CURRENT_PAGE', stateCardsOfDecks.CURRENT_PAGE);
  } else if (name === DECKS_LEFT) {    
    if (stateCardsOfDecks.CURRENT_PAGE > MIN_POSSIBLE_PAGES) {
      stateCardsOfDecks.CURRENT_PAGE -= 1;
    }    
    // console.log('stateCardsOfDecks.CURRENT_PAGE', stateCardsOfDecks.CURRENT_PAGE);
  }
  renderMyCards(scene, NAME_DECKS, cardsCurrent, decksPosition, decksContainer);    
};

export const slidePage = (scene: IMyCardsScene, name: string): void => {
  if (name === DECKS_RIGHT || name === DECKS_LEFT) {
    slideDecksPage(scene, name);
  } else if (name === CARDS_LEFT || name === CARDS_RIGHT) {
    // slideCardsPage(scene, name);
  }
};