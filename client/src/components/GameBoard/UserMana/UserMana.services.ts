import {
  BACKGROUND_NAME_USER_MANA,
  BACKGROUND_USER_MANA_X,
  BACKGROUND_USER_MANA_Y,
} from './constants';

export const setBackgroundForUserMana = (scene: Phaser.Scene): void => {
  scene.add.image(BACKGROUND_USER_MANA_X,
    BACKGROUND_USER_MANA_Y,
    BACKGROUND_NAME_USER_MANA,
  );
};
