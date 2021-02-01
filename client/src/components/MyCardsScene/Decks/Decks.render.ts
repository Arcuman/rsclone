import { IMyCardsScene, CREATE_NEW_DECK, ControlButton } from '@/components/MyCardsScene/MyCards.model';
import { openDeck } from '@/components/MyCardsScene/MyCards.services';
import { Deck } from '@/components/Deck/Deck.model';
import { createDeck } from '@/components/Deck/Deck.render';
import { setUserDeckWithCards } from '@/components/Deck/Deck.services';
import { getUserProfileInfo } from '@/components/Profile/Profile.services';
import { createTextData, makeDisableButton, makeEnableButton } from '@/utils/utils';
import { Math } from 'phaser';
import { textDecoration } from '@/components/GameBoard/UserAvatar/constants';
import { store } from '@/redux/store/rootStore';
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

const receiveDeckName = async (
  scene: IMyCardsScene,
  click: Phaser.Input.InputPlugin,
  enterDown: Phaser.Input.Keyboard.Key,
  textInput,
  arrowButtonSave: ControlButton): Promise<void> => {
  const newText = textInput.text;
  console.log('newText', newText);

  click.removeAllListeners();
  enterDown.removeAllListeners();

  if (newText !== '') {
    makeEnableButton(<Phaser.GameObjects.Image>arrowButtonSave.DONE_BUTTON);
   
    const userId = store.getState().authUser.user_id;
    const newDeck = {
      user_id: userId,
      name: <string>newText,
      isCurr: true,
      cards: [],
    };
    console.log('newDeck', newDeck);

    scene.setNewDeck(newDeck);
    console.log('newDeck2', scene.getNewDeck());
  } else {
    textInput.setText(NAME_INPUT_DEFAULT);
  }
 
};

export const createNewDeck = (scene: IMyCardsScene): void => {
  const { TEXT_X, TEXT_Y} = positionNewDeckName;
  const decksContainer = scene.getDecksContainer();
  decksContainer.removeAll();
  scene.setstatusDecksPage(CREATE_NEW_DECK);
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
 
  textInput
    .setOrigin(NAME_INPUT_ORIGIN, NAME_INPUT_ORIGIN)
    .setDepth(NAME_INPUT_DEPTH);
  
  scene.setDeckNameInput(textInput);

  textInput.setInteractive().on('pointerdown', () => {
    textInput.setText('');
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    const editor = scene.rexUI.edit(textInput);
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

export const saveNewDeck = async (scene:  IMyCardsScene ): Promise<void> => {
  const newDeck =  scene.getNewDeck();
 
  const deckId = await setUserDeckWithCards(newDeck);
  console.log('deckId=', deckId);
  newDeck.user_deck_id = deckId;
  if (Object.keys(newDeck).length !== 0) {
    // console.log('open deck');
    openDeck(scene, newDeck);
    const textInput = scene.getDeckNameInput();
    textInput.destroy();    
  }
  // if(newDeck.length > 0);  
};
