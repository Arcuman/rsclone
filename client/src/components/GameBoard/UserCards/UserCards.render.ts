import Phaser from 'phaser';
import { createPlayerHandCard } from '@/components/Card/Card.render';
import { PLAYER_CARDS_POSITION } from '@/components/GameBoard/UserCards/constants';
import { getPositionOfCard } from '@/components/Card/Card.services';
import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';

export function createPlayerCards(scene: IGameBoardScene): Phaser.GameObjects.Container[] {
  const enemyCards: Phaser.GameObjects.Container[] = [];
  scene.getState().handCards.forEach((card, i) => {
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
