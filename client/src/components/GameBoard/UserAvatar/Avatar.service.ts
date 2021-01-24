import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import Phaser from 'phaser';
import { avatarPosition } from '@/components/GameBoard/UserAvatar/constants';
import { IMAGES } from '@/components/Game/constant';
import { createAvatar } from '@/components/GameBoard/UserAvatar/Avatar.render';

export function createEnemyAvatar(scene: IGameBoardScene): Phaser.GameObjects.Container {
  const state = scene.getState();
  const { ENEMY_X, ENEMY_Y } = avatarPosition;
  const cardImg = IMAGES.AVATAR.NAME;
  return createAvatar({
    scene,
    posX: ENEMY_X,
    posY: ENEMY_Y,
    card: cardImg,
    userName: state.enemy.name.toString(),
    health: state.enemy.health.toString(),
  });
}

export function createPlayerAvatar(scene: IGameBoardScene): Phaser.GameObjects.Container {
  const state = scene.getState();
  const { USER_X, USER_Y } = avatarPosition;
  const cardImg = IMAGES.AVATAR.NAME;
  return createAvatar({
    scene,
    posX: USER_X,
    posY: USER_Y,
    card: cardImg,
    userName: state.name.toString(),
    health: state.health.toString(),
  });
}
