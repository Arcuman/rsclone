export interface TablePositionInfo {
  IMG_X: number;
  IMG_Y: number;
  SHADOW_X: number;
  SHADOW_Y: number;
  SHADOW_TINT: number;
  SHADOW_ALPHA: number;
  TABLE_CONTAINER_SCALE: number;
}

export interface TableCreateInfo {
  scene: Phaser.Scene;
  posX: number;
  posY: number;
  img: string;
}
