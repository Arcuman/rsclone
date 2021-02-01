import { IMyCardsScene } from '@/components/MyCardsScene/MyCards.model';
import { renderDeck } from '@/components/MyCardsScene/MyCards.render';
import { makeDisableButton, makeEnableButton } from '@/utils/utils';
import {
  DECKS_RIGHT,
  DECKS_LEFT,
  MIN_POSSIBLE_PAGES,
  ONE_PAGE, 
} from '@/components/MyCardsScene/Button/constants';

export const slideDecksInMyDecks = (
  scene: IMyCardsScene,
  name: string,
  audio: Phaser.Sound.BaseSound,
): void => {
  const stateCardsOfDecks = scene.getStateCardsOfDecks();
  const decksCurrent = stateCardsOfDecks.DECKS_DATA;
  const arrowButtonSave = scene.getArrowButton();
  const decksContainer = scene.getDecksContainer();
  decksContainer.removeAll();

  // console.log('stateCardsOfDecks.CURRENT_PAGE', stateCardsOfDecks.CURRENT_PAGE);
  // console.log('stateCardsOfDecks.TOTAL_PAGE', stateCardsOfDecks.TOTAL_PAGE);
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

  // console.log('change current page', stateCardsOfDecks.CURRENT_PAGE);

  renderDeck(scene, decksCurrent, decksContainer);  
};