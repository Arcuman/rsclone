import { createScalableCard } from '@/components/Card/Card.render';
import { getPositionOfCard } from '@/components/Card/Card.services';
import { Card } from '@/components/Card/Card.model';
import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import { IMAGE_CARD_SIZE } from '@/components/Card/constants';

export function onHandCardPlay(scene: IGameBoardScene, card: Card, isPlayerOne: boolean) {
  if (scene.getIsPlayerOne() !== isPlayerOne) {
    scene.getEnemyCards().pop()!.destroy();
    scene.getEnemyTableCards().push(
      createScalableCard({
        scene,
        posX: getPositionOfCard(scene, scene.getEnemyTableCards().length),
        posY: scene.getPlayerTableZone().y - IMAGE_CARD_SIZE,
        card,
      }),
    );
  }
}
