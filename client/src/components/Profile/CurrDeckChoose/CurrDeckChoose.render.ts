import { SCENES } from '@/components/Game/constant';
import Phaser from 'phaser';
import { Deck } from '@/components/Deck/Deck.model';
import { setColoredDeck } from '@/components/Deck/Deck.services';
import { createDeck, createDeckName } from '@/components/Deck/Deck.render';
import { CardsContainerPosition } from '@/components/MyCardsScene/MyCards.model';
import { changeCurrUserDeck } from '@/components/Profile/Profile.services';
import { create } from './CurrDeckChoose.services';
import {
  positionDeckContainer,
  NUMBER_CARDS_IN_DECK,
  positionDeckName,
  TINT_VALUE,
} from './constants';

export class CurrDeckChooseScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENES.CHOOSE_DECK,
      active: false,
      visible: false,
    });
  }

  create(): void {
    create(this);
  }
}

export const renderContainer = (
  scene: Phaser.Scene,
  name: string,
  containerPosition: CardsContainerPosition,
): Phaser.GameObjects.Container => {
  const { CONTAINER_X, CONTAINER_Y } = containerPosition;
  const cardContainer = scene.add.container(CONTAINER_X, CONTAINER_Y);

  return cardContainer;
};

export const renderDeck =  (
  scene: Phaser.Scene,
  userDecks: Deck[],
  decksContainer: Phaser.GameObjects.Container,
  cur_user_deck_id: number,
): void => {
  const { IMG_X, IMG_Y } = positionDeckContainer;
  userDecks.forEach((item, index) => {
    let coord;
    if (index % 2 === 0) {
      coord = { IMG_X, IMG_Y: IMG_Y + 180 * (index / 2) };
    } else {
      coord = { IMG_X: IMG_X + 150, IMG_Y: IMG_Y + 180 * ((index - 1) / 2) };
    }
    const userDeck = createDeck(scene, coord, NUMBER_CARDS_IN_DECK);
    const lastCardInDeck = userDeck.last;
    setColoredDeck(scene, <Phaser.GameObjects.Sprite>lastCardInDeck);

    const topCard = <Phaser.GameObjects.Sprite>lastCardInDeck;

    if (cur_user_deck_id === item.user_deck_id) {
      topCard.setTint(TINT_VALUE);
      topCard.on('pointerout', () => {
        topCard.setTint(TINT_VALUE);
      });
    }
    topCard.on('pointerup', async () => {
      const isUpdate = await changeCurrUserDeck(item.user_deck_id, cur_user_deck_id);
      if (isUpdate){
        topCard.setTint(TINT_VALUE);
        
      }
    });

    // setClickableDeck(scene, item, <Phaser.GameObjects.Sprite>lastCardInDeck, TINT_VALUE_CLICK);
    const userDeckName = createDeckName(scene, item, positionDeckName);

    decksContainer.add(userDeck);
    userDeck.add(userDeckName);
  });
};
