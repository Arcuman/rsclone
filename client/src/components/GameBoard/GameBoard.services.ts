import Phaser from 'phaser';
import { setBackground } from '@/utils/utils';
import { cardBase } from '@/components/Card/Card.render';
import { GameState } from '@/components/GameBoard/GameBoard.model';
import { IMAGES } from '../Game/constant';
import { createAvatar } from './UserAvatar/Avatar.render';
import { avatarPosition } from './UserAvatar/constants';
import { createTable } from './Table/Table.render';

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
  color: number,
): ConfigOfRectangle {
  return {
    positionX: posX,
    positionY: posY,
    width,
    height,
    color,
  };
}

export function create(scene: Phaser.Scene): void {
  const enemyCardsConfig = createConfig(640, 80, 600, 140, 0xff0022);
  const playerCardsConfig = createConfig(640, 640, 600, 140, 0xff0011);
  const table = createConfig(640, 360, 800, 300, 0xff0088);
  const timer = createConfig(120, 360, 150, 150, 0xbb8c08);
  const endTurnButton = createConfig(1160, 360, 75, 75, 0xbbaa98);
  const playerMana = createConfig(220, 650, 200, 50, 0x005588);
  const enemyMana = createConfig(1060, 70, 200, 50, 0x005588);
  const playerDeck = createConfig(1200, 600, 130, 150, 0x00ff88);
  const enemyDeck = createConfig(80, 120, 130, 150, 0x00ff88);

  scene.add.rectangle(
    enemyCardsConfig.positionX,
    enemyCardsConfig.positionY,
    enemyCardsConfig.width,
    enemyCardsConfig.height,
    enemyCardsConfig.color,
  );

  scene.add.rectangle(
    playerCardsConfig.positionX,
    playerCardsConfig.positionY,
    playerCardsConfig.width,
    playerCardsConfig.height,
    playerCardsConfig.color,
  );

  scene.add.rectangle(table.positionX, table.positionY, table.width, table.height, table.color);

  scene.add.rectangle(timer.positionX, timer.positionY, timer.width, timer.height, timer.color);

  scene.add.rectangle(
    endTurnButton.positionX,
    endTurnButton.positionY,
    endTurnButton.width,
    endTurnButton.height,
    endTurnButton.color,
  );

  scene.add.rectangle(
    playerMana.positionX,
    playerMana.positionY,
    playerMana.width,
    playerMana.height,
    playerMana.color,
  );

  scene.add.rectangle(
    enemyMana.positionX,
    enemyMana.positionY,
    enemyMana.width,
    enemyMana.height,
    enemyMana.color,
  );

  scene.add.rectangle(
    playerDeck.positionX,
    playerDeck.positionY,
    playerDeck.width,
    playerDeck.height,
    playerDeck.color,
  );

  scene.add.rectangle(
    enemyDeck.positionX,
    enemyDeck.positionY,
    enemyDeck.width,
    enemyDeck.height,
    enemyDeck.color,
  );

  const gameWidth = scene.game.config.width;
  const gameHeight = scene.game.config.height;

  const containerX: number = <number>gameWidth / 2;
  const containerY: number = <number>gameHeight - 80;

  const cardImg = IMAGES.GAME_BOARD.NAME;
  const createGameTable = createTable({
    scene,
    posX: <number>gameWidth / 2,
    posY: <number>gameHeight / 2,
    img: cardImg,
  });
}

export function createEnemyAvatar(
  scene: Phaser.Scene,
  state: GameState,
): Phaser.GameObjects.Container {
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
export function createPlayerAvatar(
  scene: Phaser.Scene,
  state: GameState,
): Phaser.GameObjects.Container {
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
