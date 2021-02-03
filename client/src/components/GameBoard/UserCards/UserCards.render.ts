import Phaser from 'phaser';
import { PLAYER_CARDS_POSITION } from '@/components/GameBoard/UserCards/constants';
import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import { Card } from '@/components/Card/Card.model';
import { addNewCard } from '@/components/GameBoard/UserCards/UserCards.services';

export function createPlayerCards(
  scene: IGameBoardScene,
  playerCards: Card[],
): Phaser.GameObjects.Container[] {
  const playerContainerCards: Phaser.GameObjects.Container[] = [];
  playerCards.forEach((card, i) => {
    addNewCard(scene, playerContainerCards, card, i, PLAYER_CARDS_POSITION);
  });
  return playerContainerCards;
}
