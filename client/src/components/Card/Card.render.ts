import { createTextData, setShadow } from '@/utils/utils';
import { CardCreateInfo } from './Card.model';
import { setDraggableOnCard } from './Card.services';
import {
  positionInfo,
  textDecoration,
  SIZE_LITTLE_CARD,
  shadowOptions,
  CARD_CONTAINER_DEPTH,
} from './constants';

export const cardBase = (data: CardCreateInfo): void => {
  const { scene, posX, posY, card, mana, attack, health } = data;
  const { IMG_X, IMG_Y, MANA_X, MANA_Y, ATTACK_X, ATTACK_Y, HEALTH_X, HEALTH_Y } = positionInfo;
  const { OFFSET_X, OFFSET_Y, TINT, ALPHA } = shadowOptions;

  const spriteCard: Phaser.GameObjects.Sprite = scene.add.sprite(IMG_X, IMG_Y, card);
  const shadow = setShadow(scene, card, IMG_X + OFFSET_X, IMG_Y + OFFSET_Y, TINT, ALPHA);

  const textMana: Phaser.GameObjects.Text = createTextData(
    scene,
    MANA_X,
    MANA_Y,
    mana,
    textDecoration,
  );

  const cardLayers = [shadow, spriteCard, textMana];
  const cardContainer = scene.add.container(posX, posY, cardLayers);

  cardContainer.setSize(spriteCard.width, spriteCard.height);
  cardContainer.setScale(SIZE_LITTLE_CARD, SIZE_LITTLE_CARD);
  cardContainer.depth = CARD_CONTAINER_DEPTH;

  if (attack && health) {
    const textAttack: Phaser.GameObjects.Text = createTextData(
      scene,
      ATTACK_X,
      ATTACK_Y,
      attack,
      textDecoration,
    );
    const textHealth: Phaser.GameObjects.Text = createTextData(
      scene,
      HEALTH_X,
      HEALTH_Y,
      health,
      textDecoration,
    );
    cardContainer.add(textAttack);
    cardContainer.add(textHealth);
  }

  setDraggableOnCard(scene, cardContainer, posY);
};
