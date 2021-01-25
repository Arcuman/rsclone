import Phaser from 'phaser';
import { setBackground } from '@/utils/utils';
import { cardBase } from '@/components/Card/Card.render';
import { GameState } from '@/components/GameBoard/GameBoard.model';
import { IMAGES } from '../Game/constant';
import { createAvatar } from './UserAvatar/Avatar.render';
import { avatarPosition } from './UserAvatar/constants';
import { createTable } from './Table/Table.render';
import { SPRITE_ANIMATION_CONFIG, SPRITE_POSITION } from './constants';

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
  const timer = createConfig(120, 360, 150, 150, 0xbb8c08);
  const endTurnButton = createConfig(1160, 360, 75, 75, 0xbbaa98);
  const playerMana = createConfig(220, 650, 200, 50, 0x005588);
  const enemyMana = createConfig(1060, 70, 200, 50, 0x005588);
  const playerDeck = createConfig(1200, 600, 130, 150, 0x00ff88);
  const enemyDeck = createConfig(80, 120, 130, 150, 0x00ff88);

  const bomb = scene.add.image(140, 350, 'bomb').setSize(150, 150);

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
}

export function addTimerEndSprite(scene: Phaser.Scene) {
  const configExplosion = {
    key: SPRITE_ANIMATION_CONFIG.CONFIG_EXPLOSION.KEY,
    frames: SPRITE_ANIMATION_CONFIG.CONFIG_EXPLOSION.FRAMES,
    frameRate: SPRITE_ANIMATION_CONFIG.CONFIG_EXPLOSION.FRAME_RATE,
    repeat: SPRITE_ANIMATION_CONFIG.CONFIG_EXPLOSION.REPEAT,
  };
  scene.anims.create(configExplosion);
  scene.add.sprite(
    SPRITE_POSITION.EXPLOSION_SPRITE.POS_X,
    SPRITE_POSITION.EXPLOSION_SPRITE.POS_Y,
    SPRITE_ANIMATION_CONFIG.CONFIG_EXPLOSION.FRAMES)
    .play(SPRITE_ANIMATION_CONFIG.CONFIG_EXPLOSION.KEY);
}
export function addTimerAlmostExpired(scene: Phaser.Scene) {
  const configWick = {
    key: SPRITE_ANIMATION_CONFIG.CONFIG_WICK.KEY,
    frames: SPRITE_ANIMATION_CONFIG.CONFIG_WICK.FRAMES,
    frameRate: SPRITE_ANIMATION_CONFIG.CONFIG_WICK.FRAME_RATE,
    repeat: SPRITE_ANIMATION_CONFIG.CONFIG_WICK.REPEAT,
  };
  scene.anims.create(configWick);
  scene.add.sprite(
    SPRITE_POSITION.WICK_SPRITE.POS_X,
    SPRITE_POSITION.WICK_SPRITE.POS_Y,
    SPRITE_ANIMATION_CONFIG.CONFIG_WICK.FRAMES)
    .play(SPRITE_ANIMATION_CONFIG.CONFIG_WICK.KEY);
}
