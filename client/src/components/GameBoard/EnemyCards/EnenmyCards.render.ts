import { IMAGES } from '@/components/Game/constant';
import { createBaseCard } from '@/components/Card/Card.render';
import * as Phaser from 'phaser';
import { getPositionOfCard } from '@/components/Card/Card.services';
import { ENEMY_COVER_CARD } from '@/components/GameBoard/EnemyCards/constant';
import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';

export function createEnemyCards(
  scene: IGameBoardScene,
  enemyCount: number,
): Phaser.GameObjects.Container[] {
  const enemyCards: Phaser.GameObjects.Container[] = [];
  for (let i = 0; i < enemyCount; i += 1) {
    const posX = getPositionOfCard(scene, i);
    enemyCards.push(
      createBaseCard({
        scene,
        posX,
        posY: ENEMY_COVER_CARD.POS_Y,
        card: {
          id: ENEMY_COVER_CARD.ID,
          name: IMAGES.COVER.NAME,
          manaCost: ENEMY_COVER_CARD.MANA_COST,
          attack: ENEMY_COVER_CARD.ATTACK,
          health: ENEMY_COVER_CARD.HEALTH,
          isActive: ENEMY_COVER_CARD.ISACTIVE,
          image: IMAGES.COVER.NAME,
        },
      }),
    );
  }
  return enemyCards;
}
