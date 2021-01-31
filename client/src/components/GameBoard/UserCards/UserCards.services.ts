import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import Phaser from 'phaser';
import { Card } from '@/components/Card/Card.model';
import { getPositionOfCard } from '@/components/Card/Card.services';
import { createPlayerHandCard } from '@/components/Card/Card.render';
import { PLAYER_CARDS_POSITION } from '@/components/GameBoard/UserCards/constants';

export function addNewCard(
  scene: IGameBoardScene,
  cards: Phaser.GameObjects.Container[],
  card: Card,
  index: number,
  posY: number,
): Phaser.GameObjects.Container {
  const posX = getPositionOfCard(scene, index);
  const newCard = createPlayerHandCard({
    scene,
    posX,
    posY,
    card,
  });
  cards.push(newCard);
  return newCard;
}
