import { CardCreateInfo } from './Card.model';
import { setDraggableOnCard } from './Card.services';

const createTextData = (
  scene: Phaser.Scene,
  posX: number,
  posY: number,
  sort: string,
): Phaser.GameObjects.Text => {
  const text: Phaser.GameObjects.Text = scene.add.text(posX, posY, sort, {
    fontFamily: 'number_font',
    fontSize: '32px',
    color: '#ffffff',
  });
  text.setStroke('#000000', 5);
  text.depth = 2;
  return text;
};

export const cardBase = (data: CardCreateInfo): void => {
  const { scene, posX, posY, card, mana, hit, life } = data;
  const spriteCard: Phaser.GameObjects.Sprite = scene.add.sprite(0, 0, card);
  const textMana: Phaser.GameObjects.Text = createTextData(scene, -60, -98, mana);
  const textPower: Phaser.GameObjects.Text = createTextData(scene, -60, 60, hit);
  const textLife: Phaser.GameObjects.Text = createTextData(scene, 48, 60, life);

  const cardContainer = scene.add.container(posX, posY, [
    spriteCard,
    textMana,
    textPower,
    textLife,
  ]);
  cardContainer.setSize(spriteCard.width, spriteCard.height);
  cardContainer.setScale(0.6, 0.6);

  setDraggableOnCard(scene, cardContainer, posY);
};
