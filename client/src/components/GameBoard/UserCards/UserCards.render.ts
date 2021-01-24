import Phaser from 'phaser';
import { createPlayerHandCard } from '@/components/Card/Card.render';
import { Card } from '@/components/Card/Card.model';
import { PLAYER_CARDS_POSITION } from '@/components/GameBoard/UserCards/constants';
import { getPositionOfCard } from '@/components/Card/Card.services';

export function createPlayerCards(
  scene: Phaser.Scene,
  cards: Card[],
): Phaser.GameObjects.Container[] {
  const enemyCards: Phaser.GameObjects.Container[] = [];
  cards.forEach((card, i) => {
    const posX = getPositionOfCard(scene, i);
    enemyCards.push(
      createPlayerHandCard({
        scene,
        posX,
        posY: PLAYER_CARDS_POSITION,
        card,
      }),
    );
  });
  return enemyCards;
}
