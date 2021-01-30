import { IMyCardsScene } from '@/components/MyCardsScene/MyCards.model';
import { createDeck } from '@/components/Deck/Deck.render';
import { createTextData } from '@/utils/utils';
import {  
  newDeckText,
  positionNewDeck,
} from './constants';

export const createNewDeck = (scene: IMyCardsScene): void => {
  const { IMG_X, IMG_Y} = positionNewDeck;
  const decksContainer = scene.getDecksContainer();
  decksContainer.removeAll();
  const newDeckImg = createDeck(scene, {
    IMG_X,
    IMG_Y,
  }, 10);
  const textName: Phaser.GameObjects.Text = createTextData(
    scene,
    -30,
    90,
    'Введите название колоды:',
    newDeckText,
  );
  
  decksContainer.add(newDeckImg);
  decksContainer.add(textName);  
};
