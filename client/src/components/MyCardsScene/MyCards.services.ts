import {Deck} from '@/components/Deck/Deck.model';
import {getUserDeckById, getUserDecks } from '@/components/Deck/Deck.services';
import { Card } from '@/components/Card/Card.model';
import { renderArrowButton } from '@/components/MyCardsScene/Button/Button.render';
import { getUserCards } from '@/components/Card/Card.services';
import { IMyCardsScene} from './MyCards.model';
import { renderMyCards, renderDeck, renderContainer } from './MyCards.render';
import { AllCards } from './CardsInfo';
import { createMenyButton, decksControlButton } from './Button/Button.render';
import {
  cardsPosition,
  decksPosition,
  cardsContainerPosition,
  decksContainerPosition,  
  NAME_CARDS,
  NAME_DECKS,  
  FIRST_PAGE,
  NUMBER_CARDS_ON_PAGE,
} from './constants';

export const openDeck = async ( scene: IMyCardsScene, userDeck: Deck): Promise<void> => { 
  const userDeckData = await getUserDeckById(userDeck.user_deck_id);
  if (!userDeckData) {
    throw new Error();
  } 
  
  const cardsInSelectDeck = <Card[]>userDeckData.cards;
  // const cardsInSelectDeck: Card[] = AllCards;
  const stateCardsOfDecks =  scene.getStateCardsOfDecks();
  stateCardsOfDecks.CARDS_DATA = cardsInSelectDeck;

  const totalPage = (cardsInSelectDeck.length / NUMBER_CARDS_ON_PAGE);
  stateCardsOfDecks.TOTAL_PAGE = totalPage;

  const decksContainer = scene.getDecksContainer();
  decksContainer.removeAll();

  renderMyCards(scene, NAME_DECKS, cardsInSelectDeck, decksPosition, decksContainer);
};

export const controlCardsInfo = async (scene: IMyCardsScene): Promise<void> => {
  const userCards = await getUserCards();
  // const userCards = AllCards;
  if (!userCards) {
    throw new Error();
  }
  
  scene.setUserCards(userCards);
  scene.setMyCardsCurrentPage(FIRST_PAGE);

  const totalPage = (userCards.length / NUMBER_CARDS_ON_PAGE);
  scene.setMyCardsTotalPage(totalPage);
  
  const cardsContainer = renderContainer(scene, NAME_CARDS, cardsContainerPosition);
  scene.setMyCardsContainer(cardsContainer);

  renderMyCards(scene, NAME_CARDS, userCards, cardsPosition, cardsContainer);
};

export const controlDeckInfo = async (scene: IMyCardsScene): Promise<void> => {
  const userDecks = await getUserDecks();
 
  if (!userDecks) {
    throw new Error();
  } 
  
  const decksContainer = renderContainer(scene, NAME_DECKS, decksContainerPosition );
  scene.setDecksContainer(decksContainer);
  
  const stateCardsOfDecks =  scene.getStateCardsOfDecks();
  stateCardsOfDecks.CURRENT_PAGE = FIRST_PAGE;  
  stateCardsOfDecks.DECKS_DATA = userDecks;

  renderDeck(scene, userDecks, decksContainer);  
};

export const deleteCardFromDeck = (scene: IMyCardsScene, idCard: number): void => {
  const stateCardsOfDecks =  scene.getStateCardsOfDecks();
  const cards = stateCardsOfDecks.CARDS_DATA;
  const newCards = cards.filter((item) => item.id !== idCard);
  
  const decksContainer = scene.getDecksContainer();
  decksContainer.removeAll();
  
  renderMyCards(scene, NAME_DECKS, newCards, decksPosition, decksContainer);

};

export const create = (scene: IMyCardsScene, cardsBgAudio: Phaser.Sound.BaseSound): void => {
  controlCardsInfo(scene);
  controlDeckInfo(scene);
  renderArrowButton(scene);
  createMenyButton(scene, cardsBgAudio);
  decksControlButton(scene);
};
