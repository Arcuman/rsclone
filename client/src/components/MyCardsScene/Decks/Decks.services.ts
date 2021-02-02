import { IMyCardsScene } from '@/components/MyCardsScene/MyCards.model';
import { renderDeck } from '@/components/MyCardsScene/MyCards.render';
import { controlDeckInfo } from '@/components/MyCardsScene/MyCards.services';
import { makeDisableButton, makeEnableButton, clearDecksContainer } from '@/utils/utils';
import { updateUserDeckWithCards, deleteUserDeckById } from '@/components/Deck/Deck.services';
import {
  DECKS_RIGHT,
  DECKS_LEFT,
  MIN_POSSIBLE_PAGES,
  ONE_PAGE, 
} from '@/components/MyCardsScene/Button/constants';
import {
  DECKS_VIEW_DECK,
} from '@/components/MyCardsScene/constants';

export const slideDecksInMyDecks = (
  scene: IMyCardsScene,
  name: string,
  audio: Phaser.Sound.BaseSound,
): void => {
  const stateCardsOfDecks = scene.getStateCardsOfDecks();
  const decksCurrent = stateCardsOfDecks.DECKS_DATA;
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
  renderDeck(scene, decksCurrent, decksContainer);  
};

export const saveEditDeckInDB = (scene:  IMyCardsScene): void => {
  const newCards = scene.getNewCardsArray();  
  if (newCards.length === 10) {
    const newDeck = scene.getNewDeck();
    newDeck.cards = newCards;
    
    updateUserDeckWithCards(newDeck);
       
    setTimeout( () => {
      scene.setCurrentPageDecks(true);
      scene.setstatusDecksPage(DECKS_VIEW_DECK);
      const decksContainerOld = scene.getDecksContainer();
      decksContainerOld.destroy();      
      controlDeckInfo(scene);      
    }, 1000);   
  } 
};

export const deleteDeckInDeck = (scene:  IMyCardsScene, idDeck: number): void => {
  deleteUserDeckById(idDeck);
 
  setTimeout(  () => {
    const decksContainerOld = scene.getDecksContainer();
    decksContainerOld.destroy();      
    controlDeckInfo(scene);      
  }, 2000);  
};
