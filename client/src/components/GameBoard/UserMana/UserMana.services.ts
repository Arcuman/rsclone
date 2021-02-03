import {IMAGES} from '@/components/Game/images.constants';

export const setBackgroundForUserMana = (scene: Phaser.Scene): Phaser.GameObjects.Sprite => scene.add.sprite(0,
  0,
  IMAGES.MANA_BACKGROUND.NAME,
).setScale(0.7);
