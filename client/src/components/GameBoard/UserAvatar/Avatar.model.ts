export interface PositionInfo {
  IMG_X: number;
  IMG_Y: number;
  USER_NAME_X: number;
  USER_NAME_Y: number;
  HEALTH_X: number;
  HEALTH_Y: number;
}

export interface AvatarCreateInfo {
  scene: Phaser.Scene;
  posX: number;
  posY: number;
  card: string;
  userName: string;
  health: string;
}

export interface AvatarPosition {
  USER_X: number;
  USER_Y: number;
  ENEMY_X: number;
  ENEMY_Y: number;
}
