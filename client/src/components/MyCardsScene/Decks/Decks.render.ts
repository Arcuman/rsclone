import { IMyCardsScene } from '@/components/MyCardsScene/MyCards.model';
import { createDeck } from '@/components/Deck/Deck.render';
import { createTextData } from '@/utils/utils';
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

export const createNewDeck = (scene: IMyCardsScene): void => {
  const { TEXT_X, TEXT_Y} = positionNewDeckName;
  const decksContainer = scene.getDecksContainer();
  decksContainer.removeAll();
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

  textInput.setInteractive().on('pointerdown', () => {
    textInput.setText('');
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const editor = scene.rexUI.edit(textInput);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unused-expressions
    editor.inputText.node;
  });

  decksContainer.add(newDeckImg);
  decksContainer.add(NameDeck);
};
