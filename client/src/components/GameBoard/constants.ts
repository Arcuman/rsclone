import { ConfigOfRectangle } from './GameBoard.models';

function createConfig(
  posX: number,
  posY: number,
  width: number,
  height: number,
  color: number,
): ConfigOfRectangle {
  return {
    POSITION_X: posX,
    POSITION_Y: posY,
    WIDTH: width,
    HEIGHT: height,
    COLOR: color,
  };
}

export const enemyCardsConfig = createConfig(640, 80, 600, 140, 0xff0022);
export const playerCardsConfig = createConfig(640, 640, 600, 140, 0xff0011);
export const table = createConfig(640, 360, 800, 300, 0xff0088);
export const playerAvatar = createConfig(1040, 650, 100, 100, 0x005588);
export const enemyAvatar = createConfig(240, 70, 100, 100, 0x005588);
export const timer = createConfig(120, 360, 150, 150, 0xbb8c08);
export const endTurnButton = createConfig(1160, 360, 75, 75, 0xbbaa98);
export const playerMana = createConfig(220, 650, 200, 50, 0x005588);
export const enemyMana = createConfig(1060, 70, 200, 50, 0x005588);
export const playerDeck = createConfig(1200, 600, 130, 150, 0x00ff88);
export const enemyDeck = createConfig(80, 120, 130, 150, 0x00ff88);
