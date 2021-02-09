import { createScalableCard } from '@/components/Card/Card.render';
import { getPositionOfCard } from '@/components/Card/Card.services';
import { Card } from '@/components/Card/Card.model';
import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import { IMAGE_CARD_SIZE } from '@/components/Card/constants';
import { ENEMY_CARD } from '@/components/GameBoard/EnemyCards/constant';

export function onHandCardPlay(scene: IGameBoardScene, card: Card, isPlayerOne: boolean):void {
  if (scene.getIsPlayerOne() !== isPlayerOne) {
    scene.getEnemyCards().pop()!.destroy();

    const enemyCard = createScalableCard({
      scene,
      posX: getPositionOfCard(scene, scene.getEnemyTableCards().length),
      posY: scene.getPlayerTableZone().y - IMAGE_CARD_SIZE,
      card,
    });
    enemyCard.input.dropZone = true;
    enemyCard.setName(ENEMY_CARD);
    scene.getEnemyTableCards().push(enemyCard);
  }
}
