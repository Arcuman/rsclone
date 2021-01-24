import { createTextData, setShadow } from '@/utils/utils';
import Phaser from 'phaser';
import { CardCreateInfo } from './Card.model';
import { setClickableCard, setDraggableCard, setScalableCard } from './Card.services';
import {
  positionInfo,
  textDecoration,
  SIZE_LITTLE_CARD,
  shadowOptions,
  CARD_CONTAINER_DEPTH,
  CARD_HEALTH_FIELD,
  CARD_ID_FIELD,
  CARD_ORIGIN_CENTER,
  SIZE_TINY_CARD,
} from './constants';

export function createBaseCard(data: CardCreateInfo): Phaser.GameObjects.Container {
  const { scene, posX, posY, card } = data;
  const { IMG_X, IMG_Y, MANA_X, MANA_Y, ATTACK_X, ATTACK_Y, HEALTH_X, HEALTH_Y } = positionInfo;
  const { OFFSET_X, OFFSET_Y, TINT, ALPHA } = shadowOptions;

  const spriteCard: Phaser.GameObjects.Sprite = scene.add
    .sprite(IMG_X, IMG_Y, card.image)
    .setOrigin(CARD_ORIGIN_CENTER, CARD_ORIGIN_CENTER);

  const shadow = setShadow(scene, card.image, IMG_X + OFFSET_X, IMG_Y + OFFSET_Y, TINT, ALPHA);

  const cardLayers: (Phaser.GameObjects.Text | Phaser.GameObjects.Sprite)[] = [shadow, spriteCard];

  if (card.manacost) {
    const textMana: Phaser.GameObjects.Text = createTextData(
      scene,
      MANA_X,
      MANA_Y,
      card.manacost.toString(),
      textDecoration,
    );
    cardLayers.push(textMana);
  }
  const cardContainer = scene.add.container(posX, posY, cardLayers);
  cardContainer.setSize(spriteCard.width, spriteCard.height);
  cardContainer.setScale(SIZE_LITTLE_CARD);
  cardContainer.depth = CARD_CONTAINER_DEPTH;
  if (card.isActive) {
    const textAttack: Phaser.GameObjects.Text = createTextData(
      scene,
      ATTACK_X,
      ATTACK_Y,
      card.attack.toString(),
      textDecoration,
    );
    const textHealth: Phaser.GameObjects.Text = createTextData(
      scene,
      HEALTH_X,
      HEALTH_Y,
      card.health.toString(),
      textDecoration,
    );
    cardContainer.add([textAttack, textHealth]);

    cardContainer.setData(CARD_HEALTH_FIELD, card.health);
    cardContainer.setData(CARD_ID_FIELD, card.id);
    cardContainer.on(
      'changedata',
      (gameObject: Phaser.GameObjects.Text, key: string, value: string) => {
        textHealth.setText(cardContainer.getData(CARD_HEALTH_FIELD));
      },
    );
  }
  return cardContainer;
}

export function createPlayerHandCard(data: CardCreateInfo): Phaser.GameObjects.Container {
  const cardContainer = createBaseCard(data);
  setDraggableCard(data.scene, cardContainer);
  setScalableCard(data.scene, cardContainer);
  setClickableCard(data.scene, cardContainer);
  return cardContainer;
}

export function createScalableCard(data: CardCreateInfo): Phaser.GameObjects.Container {
  const cardContainer = createBaseCard(data);
  setScalableCard(data.scene, cardContainer);
  cardContainer.setScale(SIZE_TINY_CARD);
  return cardContainer;
}
