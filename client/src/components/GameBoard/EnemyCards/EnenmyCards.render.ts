import * as Phaser from 'phaser';
import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import { COVER_CARD } from '@/constants/constants';
import { addNewCard } from '@/components/GameBoard/UserCards/UserCards.services';
import { enemyCardCover } from '@/components/GameBoard/EnemyCards/constant';

export function createEnemyCards(
  scene: IGameBoardScene,
  enemyCount: number,
): Phaser.GameObjects.Container[] {
  const enemyCards: Phaser.GameObjects.Container[] = [];
  for (let i = 0; i < enemyCount; i += 1) {
    addNewCard(scene, enemyCards, enemyCardCover, i, COVER_CARD.POS_Y);
  }
  return enemyCards;
}
