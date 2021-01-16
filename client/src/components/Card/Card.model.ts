export interface CardCreateInfo {
  scene: Phaser.Scene;
  posX: number;
  posY: number;
  card: string;
  mana: string;
  attack: string;
  health: string;
}

export interface PositionInfo {
  IMG_X: number;
  IMG_Y: number;
  MANA_X: number;
  MANA_Y: number;
  ATTACK_X: number;
  ATTACK_Y: number;
  HEALTH_X: number;
  HEALTH_Y: number;
}

export interface TextDecoration {
  FONT_SIZE: string;
  FONT_FAMILY: string;
  FONT_COLOR: string;
  TEXT_OUTLINE_COLOR: string;
  TEXT_OUTLINE_SIZE: number;
  TEXT_DEPTH: number;
}
