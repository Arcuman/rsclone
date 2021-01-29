import { Deck } from '@/components/Deck/Deck.model';
import { getUserDeckById } from '@/components/Deck/Deck.services';
import { TINT_VALUE_CLICK } from '@/constants/constants';

const openDeck = async (userDeck: Deck): Promise<void> => {
  const userDeckData = await getUserDeckById(userDeck.user_deck_id);
};

export const setClickableDeck = (
  scene: Phaser.Scene,
  userDeck: Deck,
  topCard: Phaser.GameObjects.Sprite,
): void => {
  topCard.setInteractive();
  topCard.on('pointerdown', () => {
    topCard.setTint(TINT_VALUE_CLICK);
  });
  topCard.on('pointerup', () => {
    topCard.clearTint();
    openDeck(userDeck);
  });
};
