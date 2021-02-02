import { Deck } from '@/components/Deck/Deck.model';
import { getUserDeckById, getUserDecks } from '@/components/Deck/Deck.services';
import { Card } from '@/components/Card/Card.model';
import { renderArrowButton } from '@/components/MyCardsScene/Button/Button.render';
import { getUserCards } from '@/components/Card/Card.services';
import { makeDisableButton, makeEnableButton, clearDecksContainer } from '@/utils/utils';
import { IMyCardsScene } from './MyCards.model';
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
  DECKS_VIEW_DECK,
  CARDS_VIEW_DECK,
  CARDS_EDIT_DECK,
} from './constants';

export const openDeck = async (scene: IMyCardsScene, userDeck: Deck): Promise<void> => {
  console.log('userDeck', userDeck);
  console.log('statusDecksPage', scene.getstatusDecksPage());

  const userDeckId = userDeck.user_deck_id || 0;
  const userDeckData = await getUserDeckById(userDeckId);
  if (!userDeckData) {
    throw new Error();
  }

  console.log('userDeckData', userDeckData);

  const cardsInSelectDeck = <Card[]>userDeckData.cards;
  // const cardsInSelectDeck: Card[] = AllCards;
   
  const stateCardsOfDecks = scene.getStateCardsOfDecks();
  stateCardsOfDecks.CARDS_DATA = cardsInSelectDeck;
  stateCardsOfDecks.CURRENT_PAGE = FIRST_PAGE;

  const totalPage = cardsInSelectDeck.length / NUMBER_CARDS_ON_PAGE;
  stateCardsOfDecks.TOTAL_PAGE = totalPage;

  const arrowButtonSave = scene.getArrowButton();
  makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.CREATE_BUTTON);  
  makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.DECKS_LEFT);
  if (FIRST_PAGE >= totalPage) {
    makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.DECKS_RIGHT);
  }
  scene.getstatusDecksPage();
  if (scene.getstatusDecksPage() === CARDS_EDIT_DECK) {
    makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.EDIT_BUTTON); 
  }

  const decksContainer = clearDecksContainer(scene);

  renderMyCards(scene, NAME_DECKS, cardsInSelectDeck, decksPosition, decksContainer);
};

export const renderDecksBlock = (scene: IMyCardsScene) : void => {
  
  const stateCardsOfDecks = scene.getStateCardsOfDecks();
  stateCardsOfDecks.CURRENT_PAGE = FIRST_PAGE;
  const userDecks = stateCardsOfDecks.DECKS_DATA;
  const totalPage = userDecks.length / NUMBER_CARDS_ON_PAGE;
  stateCardsOfDecks.TOTAL_PAGE = totalPage;
  
  scene.setCurrentPageDecks(true);
  scene.setstatusDecksPage(DECKS_VIEW_DECK);

  const arrowButtonSave = scene.getArrowButton();
  makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.DECKS_LEFT);
  
  if (totalPage > FIRST_PAGE) {
    makeEnableButton(<Phaser.GameObjects.Image>arrowButtonSave.DECKS_RIGHT);
  }

  const decksContainer = clearDecksContainer(scene);
 
  renderDeck(scene, userDecks, decksContainer);
};

export const controlCardsInfo = async (scene: IMyCardsScene): Promise<void> => {
  const userCards = await getUserCards();
  // const userCards = AllCards;
  if (!userCards) {
    throw new Error();
  }

  console.log('userCards', userCards);
  scene.setUserCards(userCards);
  scene.setMyCardsCurrentPage(FIRST_PAGE);

  const totalPage = userCards.length / NUMBER_CARDS_ON_PAGE;
  scene.setMyCardsTotalPage(totalPage);

  const cardsContainer = renderContainer(scene, NAME_CARDS, cardsContainerPosition);
  scene.setMyCardsContainer(cardsContainer);

  const arrowButtonSave = scene.getArrowButton();
  makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.CARDS_LEFT);
  if (totalPage < FIRST_PAGE + FIRST_PAGE) {
    makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.CARDS_RIGHT);
  }
 
  renderMyCards(scene, NAME_CARDS, userCards, cardsPosition, cardsContainer);
};

export const controlDeckInfo = async (scene: IMyCardsScene): Promise<void> => {
  const userDecks = await getUserDecks();

  if (!userDecks) {
    throw new Error();
  }

  const decksContainer = renderContainer(scene, NAME_DECKS, decksContainerPosition);
  scene.setDecksContainer(decksContainer);

  const stateCardsOfDecks = scene.getStateCardsOfDecks();
  stateCardsOfDecks.DECKS_DATA = userDecks;

  renderDecksBlock(scene);
};

export const deleteCardFromDeck = (scene: IMyCardsScene, idCard: number): void => {
  const stateCardsOfDecks =  scene.getStateCardsOfDecks();
  const cards = stateCardsOfDecks.CARDS_DATA;
  const newCards = cards.filter((item) => item.id !== idCard);
  
  const decksContainerOld = scene.getDecksContainer();
  decksContainerOld.destroy();
  const decksContainer = renderContainer(scene, NAME_DECKS, decksContainerPosition);
  scene.setDecksContainer(decksContainer);
  
  renderMyCards(scene, NAME_DECKS, newCards, decksPosition, decksContainer);

};

export const addCardInDeck = (
  scene: IMyCardsScene,
  cardContainer: Phaser.GameObjects.Container,
): void => {
  
  if (scene.getstatusDecksPage() === CARDS_EDIT_DECK && !scene.getCurrentPageDecks()) {
    const cardName = cardContainer.name;
    const userCards = scene.getUserCards();
    const card = userCards.find(item => item.name === cardName);
    console.log('card', card);
    const newCards = scene.getNewCardsArray();
    console.log('newCards', newCards);

    if (newCards.length < 10) {
      const haveCard = newCards.includes(<Card>card);
      
      if (!haveCard) {
        newCards.push(<Card>card);
      }     
    } 
    
    if (newCards.length === 10) {
      const arrowButtonSave = scene.getArrowButton();
      makeEnableButton(<Phaser.GameObjects.Image>arrowButtonSave.DONE_BUTTON);
    }

    const decksContainerOld = scene.getDecksContainer();
    decksContainerOld.destroy();
    const decksContainer = renderContainer(scene, NAME_DECKS, decksContainerPosition);
    scene.setDecksContainer(decksContainer);

    renderMyCards(scene, NAME_DECKS, newCards, decksPosition, decksContainer);
    console.log('newCards', newCards);
  }
  
};

// const createWarningMessage = () => {
//  const warningMessage = 
// }

export const create = (scene: IMyCardsScene, cardsBgAudio: Phaser.Sound.BaseSound): void => {
  renderArrowButton(scene);
  createMenyButton(scene, cardsBgAudio);
  decksControlButton(scene);
  controlCardsInfo(scene);
  controlDeckInfo(scene); 
};
