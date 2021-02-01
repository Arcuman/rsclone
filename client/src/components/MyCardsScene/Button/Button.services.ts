import { IMyCardsScene, CREATE_NEW_DECK } from '@/components/MyCardsScene/MyCards.model';
import { makeDisableButton, makeEnableButton } from '@/utils/utils';
import {
  decksPosition,
  NAME_DECKS,
  cardsPosition,
  NAME_CARDS,
} from '@/components/MyCardsScene/constants';
import { renderMyCards } from '@/components/MyCardsScene/MyCards.render';
import { createNewDeck, saveNewDeck } from '@/components/MyCardsScene/Decks/Decks.render';
import { slideDecksInMyDecks } from '@/components/MyCardsScene/Decks/Decks.services';
import { AUDIO_CONFIG } from '@/constants/constants';
import { AUDIO } from '@/components/Game/constant';

import {
  CARDS_LEFT,
  CARDS_RIGHT,
  DECKS_RIGHT,
  DECKS_LEFT,
  MIN_POSSIBLE_PAGES,
  ONE_PAGE,
  CREATE_BUTTON,
  DONE_BUTTON,
} from './constants';

const slideCardsInMyDecks = (
  scene: IMyCardsScene,
  name: string,
  audio: Phaser.Sound.BaseSound,
): void => {
  const stateCardsOfDecks = scene.getStateCardsOfDecks();
  const cardsCurrent = stateCardsOfDecks.CARDS_DATA;
  const arrowButtonSave = scene.getArrowButton();
  const decksContainer = scene.getDecksContainer();
  decksContainer.removeAll();

  if (name === DECKS_RIGHT) {
    if (stateCardsOfDecks.CURRENT_PAGE < stateCardsOfDecks.TOTAL_PAGE) {
      audio.play();
      stateCardsOfDecks.CURRENT_PAGE += ONE_PAGE;
    }
  } else if (name === DECKS_LEFT) {
    if (stateCardsOfDecks.CURRENT_PAGE > MIN_POSSIBLE_PAGES) {
      audio.play();
      stateCardsOfDecks.CURRENT_PAGE -= ONE_PAGE;
    }
  }

  renderMyCards(scene, NAME_DECKS, cardsCurrent, decksPosition, decksContainer);
};

const slideCardsPage = (
  scene: IMyCardsScene,
  name: string,
  audio: Phaser.Sound.BaseSound,
): void => {
  const cardsCurrent = scene.getUserCards();
  const myCardsContainer = scene.getMyCardsContainer();
  let myCardsCurrentPage = scene.getMyCardsCurrentPage();
  const arrowButtonSave = scene.getArrowButton();
  const myCardsTotalPage = scene.getMyCardsTotalPage();
  myCardsContainer.removeAll();
  
  if (name === CARDS_RIGHT) {
    if (myCardsCurrentPage < myCardsTotalPage) {
      audio.play();
      myCardsCurrentPage += 1;
      scene.setMyCardsCurrentPage(myCardsCurrentPage);
      
      makeEnableButton(<Phaser.GameObjects.Image>arrowButtonSave.CARDS_LEFT);
    }
    if (myCardsCurrentPage >= myCardsTotalPage) {
      makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.CARDS_RIGHT);
    }
  } else if (name === CARDS_LEFT) {
    if (myCardsCurrentPage > MIN_POSSIBLE_PAGES) {
      audio.play();
      myCardsCurrentPage -= 1;
      scene.setMyCardsCurrentPage(myCardsCurrentPage);
    
      makeEnableButton(<Phaser.GameObjects.Image>arrowButtonSave.CARDS_RIGHT);
    }
    if ( myCardsCurrentPage === MIN_POSSIBLE_PAGES) {
      makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.CARDS_LEFT);
    }
  }
  
  renderMyCards(scene, NAME_CARDS, cardsCurrent, cardsPosition, myCardsContainer);
};

export const slidePage = (scene: IMyCardsScene, name: string): void => {
  const audio = scene.sound.add(AUDIO.PAGE_TURN_AUDIO.NAME, {
    volume: AUDIO_CONFIG.volume.button,
  });
  if (name === DECKS_RIGHT || name === DECKS_LEFT) {
    const currentPageDecks = scene.getCurrentPageDecks();
    
    if (currentPageDecks === true) {
      slideDecksInMyDecks(scene, name, audio);
    } else {
      slideCardsInMyDecks(scene, name, audio);
    }    
  } else if (name === CARDS_LEFT || name === CARDS_RIGHT) {
    slideCardsPage(scene, name, audio);
  }
};

export const choiceAction = (scene:  IMyCardsScene, name: string): void => {
  const statusDecksPage = scene.getstatusDecksPage();
  if (name === CREATE_BUTTON ) {
    createNewDeck(scene); 
    // } else if ( name === EDIT_BUTTON) {

  } else if ( name === DONE_BUTTON) {
    if (statusDecksPage === CREATE_NEW_DECK) {
      console.log('CREATE_NEW_DECK');
      saveNewDeck(scene);
      
    }
  }
};
