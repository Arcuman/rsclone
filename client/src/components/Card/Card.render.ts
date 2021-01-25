import { createTextData, setShadow } from '@/utils/utils';
import Phaser from 'phaser';
import { CardCreateInfo, HandCardCreateInfo } from './Card.model';
import {
  setClickableCard,
  setDraggableCard,
  setDropOnHandCard,
  setScalableCard,
} from './Card.services';
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
  CARD_MANA_FIELD,
  CARD_IS_ACTIVE_FIELD,
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

  if (card.manaCost) {
    const textMana: Phaser.GameObjects.Text = createTextData(
      scene,
      MANA_X,
      MANA_Y,
      card.manaCost.toString(),
      textDecoration,
    );
    cardLayers.push(textMana);
  }
  const cardContainer = scene.add.container(posX, posY, cardLayers);

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
    cardContainer.setData(CARD_IS_ACTIVE_FIELD, card.isActive);
    cardContainer.on(
      'changedata',
      (gameObject: Phaser.GameObjects.Text, key: string, value: string) => {
        textHealth.setText(cardContainer.getData(CARD_HEALTH_FIELD));
      },
    );
  }
  cardContainer.setData(CARD_ID_FIELD, card.id);
  cardContainer.setData(CARD_MANA_FIELD, card.manaCost);
  cardContainer.setSize(spriteCard.width, spriteCard.height);
  cardContainer.setScale(SIZE_LITTLE_CARD);
  cardContainer.depth = CARD_CONTAINER_DEPTH;
  return cardContainer;
}

export function createPlayerHandCard(data: HandCardCreateInfo): Phaser.GameObjects.Container {
  const cardContainer = createBaseCard(data);
  setScalableCard(data.scene, cardContainer, SIZE_LITTLE_CARD);
  setDraggableCard(data.scene, cardContainer);
  setClickableCard(data.scene, cardContainer);
  setDropOnHandCard(data.scene, cardContainer);
  return cardContainer;
}

export function createScalableCard(data: CardCreateInfo): Phaser.GameObjects.Container {
  const cardContainer = createBaseCard(data);
  setScalableCard(data.scene, cardContainer, SIZE_TINY_CARD);
  cardContainer.setScale(SIZE_TINY_CARD);
  return cardContainer;
}
