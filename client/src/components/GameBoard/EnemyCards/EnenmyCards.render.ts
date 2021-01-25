import { IMAGES } from '@/components/Game/constant';
import { createBaseCard } from '@/components/Card/Card.render';
import * as Phaser from 'phaser';
import { getPositionOfCard } from '@/components/Card/Card.services';
import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import { COVER_CARD } from '@/constants/constants';

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
        posY: COVER_CARD.POS_Y,
        card: {
          id: COVER_CARD.ID,
          name: IMAGES.COVER.NAME,
          manaCost: COVER_CARD.MANA_COST,
          attack: COVER_CARD.ATTACK,
          health: COVER_CARD.HEALTH,
          isActive: COVER_CARD.ISACTIVE,
          image: IMAGES.COVER.NAME,
        },
      }),
    );
  }
  return enemyCards;
}
