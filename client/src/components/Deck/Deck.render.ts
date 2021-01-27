import { IMAGES } from '@/components/Game/constant';
import * as Phaser from 'phaser';
import { createTextData } from '@/utils/utils';
import {PositionText} from '@/types/types';
import { positionDeckText } from '@/components/Profile/constants';
import { Deck, PositionDeckContainer } from './Deck.model';
import {
  textDecoration,
  CHANGE_POSITION_DECK_Y,
  CARDS_COUNT_TEXT,
  RATIO_OFFSET_X,
  RATIO_OFFSET_Y,
  SCALE_CARD_IN_DECK,
  STANDART_NUMBER_CARD,
} from './constants';

export function createDeck(scene: Phaser.Scene, position: PositionDeckContainer, numberCard?:number): Phaser.GameObjects.Container {
  const numberCardsInDeck = numberCard || STANDART_NUMBER_CARD;  
  const deck = scene.add.container( position.IMG_X, position.IMG_Y);

  for (let x = 0; x < numberCardsInDeck; x += 1) {
    const offsetCardX = x*RATIO_OFFSET_X;
    const offsetCardY = x*RATIO_OFFSET_Y;
    const cardInDeck : Phaser.GameObjects.Sprite = scene.add.sprite(offsetCardX, offsetCardY, IMAGES.COVER.NAME);
    cardInDeck.setScale(SCALE_CARD_IN_DECK);
    deck.add(cardInDeck);    
  }
  
  return deck;
}

export function createDeckName(scene: Phaser.Scene, deckInfo: Deck, positionDeckName: PositionText ): Phaser.GameObjects.Text {
  const textName: Phaser.GameObjects.Text = createTextData(
    scene,
    positionDeckName.TEXT_X,
    positionDeckName.TEXT_Y,
    deckInfo.name,
    textDecoration,
  );
 
  return textName;
}

export function createDeckInfo(scene: Phaser.Scene, deckInfo: Deck): Phaser.GameObjects.Text {
  const cardsCount = deckInfo.cards_count || 0;
  const textCardCount: Phaser.GameObjects.Text = createTextData(
    scene,
    positionDeckText.TEXT_X,
    positionDeckText.TEXT_Y + CHANGE_POSITION_DECK_Y,
    `${CARDS_COUNT_TEXT} ${cardsCount}`,
    textDecoration,
  );
 
  return textCardCount;
}
