import Phaser from 'phaser';
import { IMAGES } from '@/components/Game/constant';

function setBackground(game: Phaser.Scene) {
  const image = game.add.image(
    game.cameras.main.width / 2,
    game.cameras.main.height / 2,
    IMAGES.LOAD_BACKGROUND.NAME
  );
  const scaleX = game.cameras.main.width / image.width;
  const scaleY = game.cameras.main.height / image.height;
  const scale = Math.max(scaleX, scaleY);
  image.setScale(scale).setScrollFactor(0);
}

export function preload(this: Phaser.Scene): void {}

interface ConfigOfRectangle {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  color: number;
}
function createConfig(
  posX: number,
  posY: number,
  width: number,
  height: number,
  color: number
): ConfigOfRectangle {
  return {
    positionX: posX,
    positionY: posY,
    width,
    height,
    color,
  };
}

export function create(game: Phaser.Scene): void {
  setBackground(game);
  const enemyCardsConfig = createConfig(640, 80, 600, 140, 0xff0022);
  const playerCardsConfig = createConfig(640, 640, 600, 140, 0xff0011);
  const table = createConfig(640, 360, 800, 300, 0xff0088);
  const playerAvatar = createConfig(1040, 650, 100, 100, 0x005588);
  const enemyAvatar = createConfig(240, 70, 100, 100, 0x005588);
  const timer = createConfig(120, 360, 150, 150, 0xbb8c08);
  const endTurnButton = createConfig(1160, 360, 75, 75, 0xbbaa98);
  const playerMana = createConfig(220, 650, 200, 50, 0x005588);
  const enemyMana = createConfig(1060, 70, 200, 50, 0x005588);
  const playerDeck = createConfig(1200, 600, 130, 150, 0x00ff88);
  const enemyDeck = createConfig(80, 120, 130, 150, 0x00ff88);

  game.add.rectangle(
    enemyCardsConfig.positionX,
    enemyCardsConfig.positionY,
    enemyCardsConfig.width,
    enemyCardsConfig.height,
    enemyCardsConfig.color
  );

  game.add.rectangle(
    playerCardsConfig.positionX,
    playerCardsConfig.positionY,
    playerCardsConfig.width,
    playerCardsConfig.height,
    playerCardsConfig.color
  );

  game.add.rectangle(table.positionX, table.positionY, table.width, table.height, table.color);

  game.add.rectangle(
    playerAvatar.positionX,
    playerAvatar.positionY,
    playerAvatar.width,
    playerAvatar.height,
    playerAvatar.color
  );

  game.add.rectangle(
    enemyAvatar.positionX,
    enemyAvatar.positionY,
    enemyAvatar.width,
    enemyAvatar.height,
    enemyAvatar.color
  );

  game.add.rectangle(timer.positionX, timer.positionY, timer.width, timer.height, timer.color);

  game.add.rectangle(
    endTurnButton.positionX,
    endTurnButton.positionY,
    endTurnButton.width,
    endTurnButton.height,
    endTurnButton.color
  );

  game.add.rectangle(
    playerMana.positionX,
    playerMana.positionY,
    playerMana.width,
    playerMana.height,
    playerMana.color
  );

  game.add.rectangle(
    enemyMana.positionX,
    enemyMana.positionY,
    enemyMana.width,
    enemyMana.height,
    enemyMana.color
  );

  game.add.rectangle(
    playerDeck.positionX,
    playerDeck.positionY,
    playerDeck.width,
    playerDeck.height,
    playerDeck.color
  );

  game.add.rectangle(
    enemyDeck.positionX,
    enemyDeck.positionY,
    enemyDeck.width,
    enemyDeck.height,
    enemyDeck.color
  );
}
