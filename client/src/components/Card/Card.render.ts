import { createTextData, setShadow } from '@/utils/utils';
import { CardCreateInfo } from './Card.model';
import { setDraggableOnCard } from './Card.services';
import {
  positionInfo,
  textDecoration,
  SIZE_LITTLE_CARD,
  shadowOptions,
  CARD_CONTAINER_DEPTH,
  CARD_HEALTH_FIELD,
  CARD_ID_FIELD,
} from './constants';

export const cardBase = (data: CardCreateInfo): Phaser.GameObjects.Container => {
  const { scene, posX, posY, card } = data;
  const { IMG_X, IMG_Y, MANA_X, MANA_Y, ATTACK_X, ATTACK_Y, HEALTH_X, HEALTH_Y } = positionInfo;
  const { OFFSET_X, OFFSET_Y, TINT, ALPHA } = shadowOptions;

  const spriteCard: Phaser.GameObjects.Sprite = scene.add
    .sprite(IMG_X, IMG_Y, card.name)
    .setOrigin(0.5, 0.5);
  const shadow = setShadow(scene, card.name, IMG_X + OFFSET_X, IMG_Y + OFFSET_Y, TINT, ALPHA);
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
  cardContainer.setSize(spriteCard.width, spriteCard.height);
  cardContainer.setScale(SIZE_LITTLE_CARD, SIZE_LITTLE_CARD);
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
    cardContainer.add(textAttack);
    cardContainer.add(textHealth);

    cardContainer.setData(CARD_HEALTH_FIELD, card.health);
    cardContainer.setData(CARD_ID_FIELD, card.id);
    cardContainer.on(
      'changedata',
      (gameObject: Phaser.GameObjects.Text, key: string, value: string) => {
        textHealth.setText(cardContainer.getData(CARD_HEALTH_FIELD));
      },
    );
  }
  if (card.manaCost) {
    setDraggableOnCard(scene, cardContainer, posY);
  }
  return cardContainer;
};
