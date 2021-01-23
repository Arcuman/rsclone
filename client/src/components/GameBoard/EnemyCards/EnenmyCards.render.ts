import { IMAGES } from '@/components/Game/constant';
import { cardBase } from '@/components/Card/Card.render';
import * as Phaser from 'phaser';

function getPositionOfCard(scene: Phaser.Scene, index: number): number {
  const gameWidth = scene.game.config.width;
  const centerWidth: number = <number>gameWidth / 2;
  let posX;
  if (index % 2 === 0) {
    posX = centerWidth - Math.ceil(index / 2) * (147 - 37);
  } else {
    posX = centerWidth + Math.ceil(index / 2) * (147 - 37);
  }
  return posX;
}

export function createEnemyCards(
  scene: Phaser.Scene,
  enemyCardsCount: number,
): Phaser.GameObjects.Container[] {
  const enemyCards: Phaser.GameObjects.Container[] = [];
  for (let i = 0; i < enemyCardsCount; i += 1) {
    const posX = getPositionOfCard(scene, i);
    enemyCards.push(
      cardBase({
        scene,
        posX,
        posY: 90,
        card: {
          id: -1,
          name: IMAGES.COVER.NAME,
          manacost: 0,
          attack: 0,
          health: 0,
          isActive: false,
          image: IMAGES.COVER.NAME,
        },
      }),
    );
  }
  return enemyCards;
}
