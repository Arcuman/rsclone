import Phaser from 'phaser';
import { Card } from '@/components/Card/Card.model';
import { CARD_HEALTH_FIELD, CARD_ID_FIELD } from '@/components/Card/constants';
import { animateNewPosition, calcNewPosition } from '@/components/Card/Card.services';
import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import { ZONE_COUNT_CARDS_FIELD } from '@/components/GameBoard/Table/constants';

export function preload(this: Phaser.Scene): void {}

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
