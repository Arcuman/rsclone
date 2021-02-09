import { setColoredDeck } from '@/components/Deck/Deck.services';
import { changeCurrUserDeck } from '@/components/Profile/Profile.services';
import { Deck } from '@/components/Deck/Deck.model';
import { TINT_VALUE } from './constants';
import { ICurrDeckChooseScene } from './CurrDeckChoose.model';

export const selectDeck = async (
  scene: ICurrDeckChooseScene,
  item: Deck,
  topCard: Phaser.GameObjects.Sprite,
  decksContainer: Phaser.GameObjects.Container,
): Promise<void> => {
  const isUpdate = await changeCurrUserDeck(item.user_deck_id!);

  if (isUpdate) {
    scene.setCurUserDeckId(item.user_deck_id!);
    decksContainer.list.forEach((deck: Phaser.GameObjects.Container) => {
      if (deck.list.length > 1) {
        const topCardItem = <Phaser.GameObjects.Sprite>deck.list[deck.list.length - 2];
        topCardItem.clearTint();
        topCardItem.on('pointerout', () => {
          topCardItem.clearTint();
        });
      }
    });

    setColoredDeck(scene, topCard);
    topCard.setTint(TINT_VALUE);
    topCard.on('pointerout', () => {
      topCard.setTint(TINT_VALUE);
    });
  }
};
