import Phaser from 'phaser';
import { IMAGES, MENU_IMAGES } from './images.constants';
import { AUDIO } from './audio.constants';

export { IMAGES, MENU_IMAGES, AUDIO };

export const ATLASES = {
  MENU_START_ATLAS: {
    NAME: 'menu_start_atlas',
    PATH: 'assets/images/menu/start_atlas.json',
    IMAGES_CONTAINER: 'assets/images/menu/',
  },
  MY_CARDS_ATLAS: {
    NAME: 'menu_my_cards_atlas',
    PATH: 'assets/images/menu/my_cards_atlas.json',
    IMAGES_CONTAINER: 'assets/images/menu/',
  },
  SETTINGS_ATLAS: {
    NAME: 'setting_atlas',
    PATH: 'assets/images/menu/setting_atlas.json',
    IMAGES_CONTAINER: 'assets/images/menu/',
  },
  EXIT_ATLAS: {
    NAME: 'exit_atlas',
    PATH: 'assets/images/menu/exit_atlas.json',
    IMAGES_CONTAINER: 'assets/images/menu/',
  },
  MENU_ATLAS: {
    NAME: 'exit_atlas',
    PATH: 'assets/images/menu/exit_atlas.json',
    IMAGES_CONTAINER: 'assets/images/menu/',
  },
  MUTE_ON_ATLAS: {
    NAME: 'mute_on_atlas',
    PATH: 'assets/images/menu/mute_on_atlas.json',
    IMAGES_CONTAINER: 'assets/images/menu/',
  },
  MUTE_OFF_ATLAS: {
    NAME: 'mute_off_atlas',
    PATH: 'assets/images/menu/mute_off_atlas.json',
    IMAGES_CONTAINER: 'assets/images/menu/',
  },
};

export const SCENES = {
  LOAD: 'LOAD',
  MENU: 'MENU',
  MY_CARDS: 'MY_CARDS',
  FIND_ENEMY: 'FIND_ENEMY',
  GAME_BOARD: 'GAME_BOARD',
  PROFILE: 'PROFILE',
  GAME_OVER: 'GAME_OVER',
};

export const createConfig = (parent: HTMLElement): Phaser.Types.Core.GameConfig => ({
  type: Phaser.AUTO,
  parent,
  width: 1280,
  height: 720,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: false,
  },
  scene: [],
  audio: {
    disableWebAudio: true,
    context:  new (window.AudioContext)(),
  },
});
