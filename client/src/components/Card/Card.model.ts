export interface Card {
  id: number;
  name: string;
  isActive: boolean;
  health: number;
  attack: number;
  manaCost: number;
}

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
