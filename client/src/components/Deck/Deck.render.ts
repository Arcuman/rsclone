import { IMAGES } from '@/components/Game/constant';
import { createBaseCard } from '@/components/Card/Card.render';
import * as Phaser from 'phaser';
import { createTextData } from '@/utils/utils';
import { Deck } from './Deck.model';
import { textDecoration, positionInfo, CHANGE_POSITION_DECK_Y, CARDS_COUNT_TEXT } from './constants';

export function createDeck(scene: Phaser.Scene, deckInfo: Deck): Phaser.GameObjects.Container {
  const deck = createBaseCard({
    scene,
    posX: positionInfo.IMG_X,
    posY: positionInfo.IMG_Y,
    card: {
      id: -1,
      name: IMAGES.COVER.NAME,
      manacost: 0,
      attack: 0,
      health: 0,
      isActive: false,
      image: IMAGES.COVER.NAME,
    },
  });
 
  const textName: Phaser.GameObjects.Text = createTextData(
    scene,
    positionInfo.TEXT_X,
    positionInfo.TEXT_Y,
    deckInfo.name,
    textDecoration,
  );
  deck.add(textName);

  const cardsCount =  deckInfo.cards_count || 0;
  const textCardCount: Phaser.GameObjects.Text = createTextData(
    scene,
    positionInfo.TEXT_X,
    positionInfo.TEXT_Y+CHANGE_POSITION_DECK_Y,
    `${CARDS_COUNT_TEXT} ${cardsCount}`,
    textDecoration,
  );
  deck.add(textCardCount);

  return deck;
}
