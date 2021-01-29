import {Deck} from '@/components/Deck/Deck.model';
import {getUserDeckById} from '@/components/Deck/Deck.services';
import { Card } from '@/components/Card/Card.model';
import { renderArrowButton } from '@/components/MyCardsScene/Button/Button.render';
import { decksPosition, NAME_DECKS } from './constants';
import { IMyCardsScene} from './MyCards.model';
import { renderMyCards, controlCardsInfo, controlDeckInfo } from './MyCards.render';
import { AllCards } from './CardsInfo';
import { createMenyButton } from './Button/Button.render';

export const openDeck = async ( scene: IMyCardsScene, userDeck: Deck): Promise<void> => { 
  const userDeckData = await getUserDeckById(userDeck.user_deck_id);
  if (!userDeckData) {
    throw new Error();
  } 
  // console.log('userDeckData', userDeckData);
  const cardsInSelectDeck: Card[] = userDeckData.cards;
  const stateCardsOfDecks =  scene.getStateCardsOfDecks();
  // stateCardsOfDecks.CARDS_DATA = cardsInSelectDeck; !!!!!!!!!
  stateCardsOfDecks.CARDS_DATA = AllCards;
  const totalPage = (AllCards.length/12);
  // console.log('totalPage', totalPage);
  stateCardsOfDecks.TOTAL_PAGE = totalPage;
   
  // console.log('stateCardsOfDecks.CARDS_DATA', stateCardsOfDecks.CARDS_DATA);
  const decksContainer = scene.getDeksContainer();
  decksContainer.removeAll();
  renderMyCards(scene, NAME_DECKS, AllCards, decksPosition, decksContainer);
  // renderMyCards(scene, NAME_DECKS, cardsInSelectDeck, decksPosition, decksContainer);

};

export const create = (scene: IMyCardsScene, cardsBgAudio: Phaser.Sound.BaseSound): void => {
  controlCardsInfo(scene);
  controlDeckInfo(scene);
  renderArrowButton(scene);
  createMenyButton(scene, cardsBgAudio);
};