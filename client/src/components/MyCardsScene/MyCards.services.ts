import {Deck} from '@/components/Deck/Deck.model';
import {getUserDeckById} from '@/components/Deck/Deck.services';
import { Card } from '@/components/Card/Card.model';
import { TINT_VALUE_CLICK, decksPosition, NAME_DECKS } from './constants';
import { IMyCardsScene} from './MyCards.model';
import { renderMyCards, controlCardsInfo, controlDeckInfo } from './MyCards.render';
import { AllCards } from './CardsInfo';

const openDeck = async ( scene: IMyCardsScene, userDeck: Deck): Promise<void> => { 
  const userDeckData = await getUserDeckById(userDeck.user_deck_id);
  // console.log('userDeckData', userDeckData);
  const cardsInSelectDeck: Card[] = userDeckData.cards;
  // console.log('userDeckData', cardsInSelectDeck);
  // console.log('getDeksContainer', scene.getDeksContainer());
  const decksContainer = scene.getDeksContainer();
  decksContainer.removeAll();
  renderMyCards(scene, NAME_DECKS, AllCards, decksPosition, decksContainer);
  // renderMyCards(scene, NAME_DECKS, cardsInSelectDeck, decksPosition, decksContainer);

};

export const setClickableDeck = (
  scene: IMyCardsScene,
  userDeck: Deck,
  topCard: Phaser.GameObjects.Sprite,
): void => {
  topCard.setInteractive();
  topCard.on('pointerdown', () => {
    topCard.setTint(TINT_VALUE_CLICK);
  });
  topCard.on('pointerup', () => {
    topCard.clearTint();
    openDeck(scene, userDeck);
  });
};

export const create = (scene: IMyCardsScene): void => {
  controlCardsInfo(scene);
  controlDeckInfo(scene);  
};