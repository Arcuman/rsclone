import { IMyCardsScene } from '@/components/MyCardsScene/MyCards.model';
import { renderDeck, renderContainer } from '@/components/MyCardsScene/MyCards.render';
import { makeDisableButton, makeEnableButton } from '@/utils/utils';
import { Deck } from '@/components/Deck/Deck.model';
import { updateUserDeckWithCards } from '@/components/Deck/Deck.services';
import {
  DECKS_RIGHT,
  DECKS_LEFT,
  MIN_POSSIBLE_PAGES,
  ONE_PAGE, 
} from '@/components/MyCardsScene/Button/constants';
import {
  NAME_DECKS,
  decksContainerPosition,
} from '@/components/MyCardsScene/constants';

export const slideDecksInMyDecks = (
  scene: IMyCardsScene,
  name: string,
  audio: Phaser.Sound.BaseSound,
): void => {
  const stateCardsOfDecks = scene.getStateCardsOfDecks();
  const decksCurrent = stateCardsOfDecks.DECKS_DATA;
  const arrowButtonSave = scene.getArrowButton();
  
  const decksContainerOld = scene.getDecksContainer();
  decksContainerOld.destroy();
  const decksContainer = renderContainer(scene, NAME_DECKS, decksContainerPosition);
  scene.setDecksContainer(decksContainer);

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
    // makeEnableButton(<Phaser.GameObjects.Image>arrowButtonSave.DONE_BUTTON);
   
    const newDeck = scene.getNewDeck();
    console.log('newDeck', newDeck);
    
    newDeck.cards = newCards;
    console.log('newDeck', newDeck);
    updateUserDeckWithCards(newDeck);
    
  } else {
    //
  }
  // updateUserDeckWithCards();
};