import {BOMB_IMAGE, SPRITE_ANIMATION_CONFIG, SPRITE_POSITION, TIMER_TOP_DEPTH} from './constants';

export function addTimerEndSprite(scene: Phaser.Scene): void {
  const configExplosion = {
    key: SPRITE_ANIMATION_CONFIG.CONFIG_EXPLOSION.KEY,
    frames: SPRITE_ANIMATION_CONFIG.CONFIG_EXPLOSION.FRAMES,
    frameRate: SPRITE_ANIMATION_CONFIG.CONFIG_EXPLOSION.FRAME_RATE,
    repeat: SPRITE_ANIMATION_CONFIG.CONFIG_EXPLOSION.REPEAT,
  };
  scene.anims.create(configExplosion);
  scene.add
    .sprite(
      SPRITE_POSITION.EXPLOSION_SPRITE.POS_X,
      SPRITE_POSITION.EXPLOSION_SPRITE.POS_Y,
      SPRITE_ANIMATION_CONFIG.CONFIG_EXPLOSION.FRAMES,
    )
    .play(SPRITE_ANIMATION_CONFIG.CONFIG_EXPLOSION.KEY);
}
export function addTimerAlmostExpiredSprite(scene: Phaser.Scene): void {
  const configWick = {
    key: SPRITE_ANIMATION_CONFIG.CONFIG_WICK.KEY,
    frames: SPRITE_ANIMATION_CONFIG.CONFIG_WICK.FRAMES,
    frameRate: SPRITE_ANIMATION_CONFIG.CONFIG_WICK.FRAME_RATE,
    repeat: SPRITE_ANIMATION_CONFIG.CONFIG_WICK.REPEAT,
  };
  scene.anims.create(configWick);
  scene.add
    .sprite(
      SPRITE_POSITION.WICK_SPRITE.POS_X,
      SPRITE_POSITION.WICK_SPRITE.POS_Y,
      SPRITE_ANIMATION_CONFIG.CONFIG_WICK.FRAMES,
    ).setDepth(TIMER_TOP_DEPTH)
    .play(SPRITE_ANIMATION_CONFIG.CONFIG_WICK.KEY);
}

export function setTimerBackground(scene: Phaser.Scene): void {
  scene.add.image(BOMB_IMAGE.POS_X, BOMB_IMAGE.POS_Y, BOMB_IMAGE.TEXTURE);
}
