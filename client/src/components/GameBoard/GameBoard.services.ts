import Phaser from 'phaser';
import { Card } from '@/components/Card/Card.model';
import { CARD_HEALTH_FIELD, CARD_ID_FIELD } from '@/components/Card/constants';
import { animateNewPosition, calcNewPosition } from '@/components/Card/Card.services';
import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import { ZONE_COUNT_CARDS_FIELD } from '@/components/GameBoard/Table/constants';

export function preload(this: Phaser.Scene): void {}

interface ConfigOfRectangle {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  color: number;
}
function createConfig(
  posX: number,
  posY: number,
  width: number,
  height: number,
  color: number,
): ConfigOfRectangle {
  return {
    positionX: posX,
    positionY: posY,
    width,
    height,
    color,
  };
}

export function create(scene: Phaser.Scene): void {
 
  const endTurnButton = createConfig(1160, 360, 75, 75, 0xbbaa98);
  const playerMana = createConfig(220, 650, 200, 50, 0x005588);
  const enemyMana = createConfig(1060, 70, 200, 50, 0x005588);
  const playerDeck = createConfig(1200, 600, 130, 150, 0x00ff88);
  const enemyDeck = createConfig(80, 120, 130, 150, 0x00ff88);

  scene.add.rectangle(
    endTurnButton.positionX,
    endTurnButton.positionY,
    endTurnButton.width,
    endTurnButton.height,
    endTurnButton.color,
  );

  scene.add.rectangle(
    playerMana.positionX,
    playerMana.positionY,
    playerMana.width,
    playerMana.height,
    playerMana.color,
  );

  scene.add.rectangle(
    enemyMana.positionX,
    enemyMana.positionY,
    enemyMana.width,
    enemyMana.height,
    enemyMana.color,
  );

  scene.add.rectangle(
    playerDeck.positionX,
    playerDeck.positionY,
    playerDeck.width,
    playerDeck.height,
    playerDeck.color,
  );

  scene.add.rectangle(
    enemyDeck.positionX,
    enemyDeck.positionY,
    enemyDeck.width,
    enemyDeck.height,
    enemyDeck.color,
  );
}

export function damageCard(cards: Phaser.GameObjects.Container[], damagedCard: Card): void {
  cards
    .find(card => <number>card.getData(CARD_ID_FIELD) === damagedCard.id)!
    .setData(CARD_HEALTH_FIELD, damagedCard.health);
}

export function destroyPlayerCard(
  scene: IGameBoardScene,
  cards: Phaser.GameObjects.Container[],
  destroyedCard: Card,
): void {
  const deletedIndexCard = cards.findIndex(
    card => <number>card.getData(CARD_ID_FIELD) === destroyedCard.id,
  );
  const newDeletedIndexCard = calcNewPosition(cards, deletedIndexCard);
  cards.splice(newDeletedIndexCard, 1)[0].destroy();
  scene
    .getPlayerTableZone()
    .setData(
      ZONE_COUNT_CARDS_FIELD,
      scene.getPlayerTableZone().getData(ZONE_COUNT_CARDS_FIELD) - 1,
    );
  animateNewPosition(scene, cards);
}

export function destroyEnemyCard(
  scene: IGameBoardScene,
  cards: Phaser.GameObjects.Container[],
  destroyedCard: Card,
): void {
  const deletedIndexCard = cards.findIndex(
    card => <number>card.getData(CARD_ID_FIELD) === destroyedCard.id,
  );
  const newDeletedIndexCard = calcNewPosition(cards, deletedIndexCard);
  cards.splice(newDeletedIndexCard, 1)[0].destroy();
  animateNewPosition(scene, cards);
}
