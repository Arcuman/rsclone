import { CardCreateInfo } from './Card.model';
import { setDraggableOnCard } from './Card.services';
import { positionInfo, textDecoration, SIZE_LITTLE_CARD } from './constants';

const createTextData = (
  scene: Phaser.Scene,
  posX: number,
  posY: number,
  value: string,
): Phaser.GameObjects.Text => {
  const text: Phaser.GameObjects.Text = scene.add.text(posX, posY, value, {
    fontFamily: textDecoration.FONT_FAMILY,
    fontSize: textDecoration.FONT_SIZE,
    color: textDecoration.FONT_COLOR,
  });
  text.setStroke(textDecoration.TEXT_OUTLINE_COLOR, textDecoration.TEXT_OUTLINE_SIZE);
  text.depth = textDecoration.TEXT_DEPTH;
  return text;
};

export const cardBase = (data: CardCreateInfo): void => {
  const { scene, posX, posY, card, mana, attack, health } = data;
  const spriteCard: Phaser.GameObjects.Sprite = scene.add.sprite(
    positionInfo.IMG_X,
    positionInfo.IMG_Y,
    card,
  );
  const textMana: Phaser.GameObjects.Text = createTextData(
    scene,
    positionInfo.MANA_X,
    positionInfo.MANA_Y,
    mana,
  );
  const textAttack: Phaser.GameObjects.Text = createTextData(
    scene,
    positionInfo.ATTACK_X,
    positionInfo.ATTACK_Y,
    attack,
  );
  const textHealth: Phaser.GameObjects.Text = createTextData(
    scene,
    positionInfo.HEALTH_X,
    positionInfo.HEALTH_Y,
    health,
  );

  const cardContainer = scene.add.container(posX, posY, [
    spriteCard,
    textMana,
    textAttack,
    textHealth,
  ]);

  cardContainer.setSize(spriteCard.width, spriteCard.height);
  cardContainer.setScale(SIZE_LITTLE_CARD, SIZE_LITTLE_CARD);

  setDraggableOnCard(scene, cardContainer, posY);
};
