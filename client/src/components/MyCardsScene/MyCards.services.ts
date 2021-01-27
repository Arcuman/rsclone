import {Deck} from '../Deck/Deck.model';
import {getUserDeckById} from '../Deck/Deck.services';

const openDeck = async (userDeck: Deck): Promise<void> => { 
  const userDeckData = await getUserDeckById(userDeck.user_deck_id);  
};

export const setClickableDeck = (
  scene: Phaser.Scene,
  userDeck: Deck,
  topCard: Phaser.GameObjects.GameObject,
): void => {
  topCard.setInteractive();
  topCard.on('pointerdown', () => {
    topCard.setTint(0x59503d);
  });
  topCard.on('pointerup', () => {
    topCard.clearTint();
    openDeck(userDeck);
  });
};
