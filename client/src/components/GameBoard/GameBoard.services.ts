import Phaser from 'phaser';
import { setBackground } from '@/utils/utils';
import { cardBase } from '@/components/Card/Card.render';
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

export function create(game: Phaser.Scene): void {
  setBackground(game, IMAGES.LOAD_BACKGROUND.NAME);
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
    enemyCardsConfig.color,
  );

  game.add.rectangle(
    playerCardsConfig.positionX,
    playerCardsConfig.positionY,
    playerCardsConfig.width,
    playerCardsConfig.height,
    playerCardsConfig.color,
  );

  game.add.rectangle(table.positionX, table.positionY, table.width, table.height, table.color);

  game.add.rectangle(
    playerAvatar.positionX,
    playerAvatar.positionY,
    playerAvatar.width,
    playerAvatar.height,
    playerAvatar.color,
  );

  game.add.rectangle(
    enemyAvatar.positionX,
    enemyAvatar.positionY,
    enemyAvatar.width,
    enemyAvatar.height,
    enemyAvatar.color,
  );

  game.add.rectangle(timer.positionX, timer.positionY, timer.width, timer.height, timer.color);

  game.add.rectangle(
    endTurnButton.positionX,
    endTurnButton.positionY,
    endTurnButton.width,
    endTurnButton.height,
    endTurnButton.color,
  );

  game.add.rectangle(
    playerMana.positionX,
    playerMana.positionY,
    playerMana.width,
    playerMana.height,
    playerMana.color,
  );

  game.add.rectangle(
    enemyMana.positionX,
    enemyMana.positionY,
    enemyMana.width,
    enemyMana.height,
    enemyMana.color,
  );

  game.add.rectangle(
    playerDeck.positionX,
    playerDeck.positionY,
    playerDeck.width,
    playerDeck.height,
    playerDeck.color,
  );

  game.add.rectangle(
    enemyDeck.positionX,
    enemyDeck.positionY,
    enemyDeck.width,
    enemyDeck.height,
    enemyDeck.color,
  );

  const gameWidth = game.game.config.width;
  const gameHeight = game.game.config.height;

  const containerX: number = <number>gameWidth / 2;
  const containerY: number = <number>gameHeight - 80;

  let cardImg: string = IMAGES.AGENT.NAME;
  cardBase({
    scene: game,
    posX: containerX,
    posY: containerY,
    card: cardImg,
    mana: '6',
    attack: '2',
    health: '2',
  });

  cardImg = IMAGES.SHIV.NAME;
  cardBase({
    scene: game,
    posX: containerX + 50,
    posY: containerY,
    card: cardImg,
    mana: '1',
  });

  cardImg = IMAGES.GAME_BOARD.NAME;
  const createGameTable = createTable({
    scene: game,
    posX: <number>gameWidth / 2,
    posY: <number>gameHeight / 2,
    img: cardImg,
  });

  const { USER_X, USER_Y, ENEMY_X, ENEMY_Y } = avatarPosition;
  cardImg = IMAGES.AVATAR.NAME;
  const userAvatarExample = createAvatar({
    scene: game,
    posX: USER_X,
    posY: USER_Y,
    card: cardImg,
    userName: 'Korolevishna',
    health: '30',
  });

  const enemyAvatarExample = createAvatar({
    scene: game,
    posX: ENEMY_X,
    posY: ENEMY_Y,
    card: cardImg,
    userName: 'Spider',
    health: '30',
  });
}
