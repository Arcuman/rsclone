/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */
import { IMyCardsScene, ControlButton } from '@/components/MyCardsScene/MyCards.model';
import { openDeck } from '@/components/MyCardsScene/MyCards.services';
import { renderMyCards } from '@/components/MyCardsScene/MyCards.render';
import { createDeck } from '@/components/Deck/Deck.render';
import { setUserDeckWithCards } from '@/components/Deck/Deck.services';
import {
  createTextData,
  makeDisableButton,
  makeEnableButton,
  clearDecksContainer,
} from '@/utils/utils';
import { store } from '@/redux/store/rootStore';
import { AUDIO_CONFIG } from '@/constants/constants';
import { AUDIO } from '@/components/Game/constant';
import {
  CREATE_NEW_DECK,
  CARDS_EDIT_DECK,
  NAME_CARDS,
  cardsPosition,
} from '@/components/MyCardsScene/constants';
import {
  newDeckText,
  positionNewDeck,
  positionNewDeckName,
  NAME_DECK_TEXT,
  positionNewDeckInput,
  NAME_INPUT_DEFAULT,
  newDeckInput,
  NAME_INPUT_ORIGIN,
  NAME_INPUT_DEPTH,
} from './constants';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const receiveDeckName = (
  scene: IMyCardsScene,
  click: Phaser.Input.InputPlugin,
  enterDown: Phaser.Input.Keyboard.Key,
  textInput: Phaser.GameObjects.Text,
  arrowButtonSave: ControlButton,
): void => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const newText = textInput.text;

  if (newText !== '') {
    click.removeAllListeners();
    enterDown.removeAllListeners();
    makeEnableButton(<Phaser.GameObjects.Image>arrowButtonSave.DONE_BUTTON);

    const userId = store.getState().authUser.user_id;

    const newDeck = {
      user_id: userId,
      name: newText,
      isCurr: false,
      cards: [],
    };

    scene.setNewDeck(newDeck);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    textInput.setText(NAME_INPUT_DEFAULT);
  }
};

export const createNewDeck = (scene: IMyCardsScene): void => {
  const { TEXT_X, TEXT_Y } = positionNewDeckName;

  const decksContainer = clearDecksContainer(scene);

  const myCards = scene.getUserCards();
  const myCardsContainer = scene.getMyCardsContainer();
  renderMyCards(scene, NAME_CARDS, myCards, cardsPosition, myCardsContainer);

  scene.setstatusDecksPage(CREATE_NEW_DECK);
  scene.setCurrentPageDecks(true);

  const arrowButtonSave = scene.getArrowButton();
  makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.CREATE_BUTTON);
  makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.EDIT_BUTTON);
  makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.DONE_BUTTON);
  makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.DECKS_RIGHT);
  makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.DECKS_LEFT);
  const newDeckImg = createDeck(scene, positionNewDeck);
  const NameDeck: Phaser.GameObjects.Text = createTextData(
    scene,
    TEXT_X,
    TEXT_Y,
    NAME_DECK_TEXT,
    newDeckText,
  );

  const textInput = scene.add.text(
    positionNewDeckInput.TEXT_X,
    positionNewDeckInput.TEXT_Y,
    NAME_INPUT_DEFAULT,
    newDeckInput,
  );

  textInput.setOrigin(NAME_INPUT_ORIGIN, NAME_INPUT_ORIGIN).setDepth(NAME_INPUT_DEPTH);

  scene.setDeckNameInput(textInput);

  textInput.setInteractive().on('pointerdown', () => {
    const audio = scene.sound.add(AUDIO.DECK_INPUT_ACTIVE.NAME, {
      volume: AUDIO_CONFIG.volume.card,
    });
    audio.play();

    textInput.setText('');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    const editor = scene.rexUI.edit(textInput);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unused-expressions
    editor.inputText.node;

    const enterDown = scene.input.keyboard.addKey('Enter');

    const click = scene.input.addListener('pointerup', () => {
      receiveDeckName(scene, click, enterDown, textInput, arrowButtonSave);
    });

    enterDown.addListener('down', () => {
      receiveDeckName(scene, click, enterDown, textInput, arrowButtonSave);
    });
  });

  decksContainer.add(newDeckImg);
  decksContainer.add(NameDeck);
};

export const saveNewDeck = async (scene: IMyCardsScene): Promise<void> => {
  const newDeck = scene.getNewDeck();

  if (Object.keys(newDeck).length !== 0) {
    const deckId = await setUserDeckWithCards(newDeck);
    newDeck.user_deck_id = deckId;

    scene.setCurrentPageDecks(false);
    scene.setstatusDecksPage(CARDS_EDIT_DECK);

    const textInput = scene.getDeckNameInput();
    textInput.destroy();

    const arrowButtonSave = scene.getArrowButton();
    makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.DONE_BUTTON);

    openDeck(scene, newDeck);
  }
};
