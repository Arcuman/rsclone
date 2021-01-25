import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import Phaser from 'phaser';
import { avatarPosition } from '@/components/GameBoard/UserAvatar/constants';
import { IMAGES } from '@/components/Game/constant';
import { createAvatar } from '@/components/GameBoard/UserAvatar/Avatar.render';

export function createEnemyAvatar(
  scene: IGameBoardScene,
  userName: string,
  health: number,
): Phaser.GameObjects.Container {
  const { ENEMY_X, ENEMY_Y } = avatarPosition;
  const cardImg = IMAGES.AVATAR.NAME;
  return createAvatar({
    scene,
    posX: ENEMY_X,
    posY: ENEMY_Y,
    card: cardImg,
    userName,
    health: health.toString(),
  });
}

export function createPlayerAvatar(
  scene: IGameBoardScene,
  userName: string,
  health: number,
): Phaser.GameObjects.Container {
  const { USER_X, USER_Y } = avatarPosition;
  const cardImg = IMAGES.AVATAR.NAME;
  return createAvatar({
    scene,
    posX: USER_X,
    posY: USER_Y,
    card: cardImg,
    userName,
    health: health.toString(),
  });
}
