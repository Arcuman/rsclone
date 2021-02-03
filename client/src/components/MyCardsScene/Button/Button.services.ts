import { IMyCardsScene } from '@/components/MyCardsScene/MyCards.model';
import { makeDisableButton, makeEnableButton, clearDecksContainer, clearCardsContainer } from '@/utils/utils';
import { renderMyCards } from '@/components/MyCardsScene/MyCards.render';
import { renderDecksBlock, editCardsInDeck } from '@/components/MyCardsScene/MyCards.services';
import { createNewDeck, saveNewDeck } from '@/components/MyCardsScene/Decks/Decks.render';
import { slideDecksInMyDecks, saveEditDeckInDB } from '@/components/MyCardsScene/Decks/Decks.services';
import { AUDIO_CONFIG } from '@/constants/constants';
import { AUDIO } from '@/components/Game/constant';
import {
  decksPosition,
  NAME_DECKS,
  cardsPosition,
  NAME_CARDS,
  CREATE_NEW_DECK,
  CARDS_VIEW_DECK,
  DECKS_EDIT_DECK,
  CARDS_EDIT_DECK,
  DECKS_VIEW_DECK,
} from '@/components/MyCardsScene/constants';
import {
  CARDS_LEFT,
  CARDS_RIGHT,
  DECKS_RIGHT,
  DECKS_LEFT,
  MIN_POSSIBLE_PAGES,
  ONE_PAGE,
  CREATE_BUTTON,
  EDIT_BUTTON,
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

  const decksContainer = clearDecksContainer(scene);

  if (name === DECKS_RIGHT) {
    if (stateCardsOfDecks.CURRENT_PAGE < stateCardsOfDecks.TOTAL_PAGE) {
      audio.play();
      stateCardsOfDecks.CURRENT_PAGE += ONE_PAGE;

      makeEnableButton(<Phaser.GameObjects.Image>arrowButtonSave.DECKS_LEFT);
    }
    if (stateCardsOfDecks.CURRENT_PAGE >= stateCardsOfDecks.TOTAL_PAGE) {
      makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.DECKS_RIGHT);
    }
  } else if (name === DECKS_LEFT) {
    if (stateCardsOfDecks.CURRENT_PAGE > MIN_POSSIBLE_PAGES) {
      audio.play();
      stateCardsOfDecks.CURRENT_PAGE -= ONE_PAGE;

      makeEnableButton(<Phaser.GameObjects.Image>arrowButtonSave.DECKS_RIGHT);
    }
    if ( stateCardsOfDecks.CURRENT_PAGE === MIN_POSSIBLE_PAGES) {
      makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.DECKS_LEFT);
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
  let myCardsCurrentPage = scene.getMyCardsCurrentPage();
  const arrowButtonSave = scene.getArrowButton();
  const myCardsTotalPage = scene.getMyCardsTotalPage();
  
  const myCardsContainer = clearCardsContainer(scene);
   
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
  const currentPageDecks = scene.getCurrentPageDecks();
  const arrowButtonSave = scene.getArrowButton();
  
  if (name === CREATE_BUTTON ) {
    const audio = scene.sound.add( AUDIO.DECK_CREATE.NAME, {
      volume: AUDIO_CONFIG.volume.card,
    });
    audio.play();

    createNewDeck(scene); 
  } else if ( name === EDIT_BUTTON) {
    if (currentPageDecks === false) {
      scene.setstatusDecksPage(CARDS_EDIT_DECK);
      editCardsInDeck(scene);
    } else if (currentPageDecks === true) {
      scene.setstatusDecksPage(DECKS_EDIT_DECK);
      renderDecksBlock(scene);
    }
  } else if ( name === DONE_BUTTON) {
    const audio = scene.sound.add( AUDIO.DECK_SAVE.NAME, {
      volume: AUDIO_CONFIG.volume.card,
    });
    audio.play();

    if (currentPageDecks === false) {
      if (statusDecksPage === CREATE_NEW_DECK) {
        //   
      } else if ( statusDecksPage === CARDS_VIEW_DECK ) {
        makeEnableButton(<Phaser.GameObjects.Image>arrowButtonSave.CREATE_BUTTON);
        scene.setCurrentPageDecks(true);
        scene.setstatusDecksPage(DECKS_VIEW_DECK);
        renderDecksBlock(scene);
      } else if (statusDecksPage === CARDS_EDIT_DECK) {
        saveEditDeckInDB(scene);
      }
    } else if (currentPageDecks === true) {
      if (statusDecksPage === CREATE_NEW_DECK) {        
        saveNewDeck(scene);      
      } else if (statusDecksPage === DECKS_EDIT_DECK) {
        scene.setCurrentPageDecks(true);
        scene.setstatusDecksPage(DECKS_VIEW_DECK);
        renderDecksBlock(scene);
      }      
    }
  }
};
