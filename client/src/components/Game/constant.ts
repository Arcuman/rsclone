import Phaser from 'phaser';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
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
    NAME: 'menu_button_atlas',
    PATH: 'assets/images/menu/menu_button_atlas.json',
    IMAGES_CONTAINER: 'assets/images/menu/',
  },
  MUTE_ON_ATLAS: {
    NAME: 'mute_on_atlas',
    PATH: 'assets/images/menu/mute_on_atlas.json',
    IMAGES_CONTAINER: 'assets/images/menu/',
  },
  TURN_BUTTON_ATLAS: {
    NAME: 'TURN_BUTTON_ATLAS',
    PATH: 'assets/images/turn_button_atlas.json',
    IMAGES_CONTAINER: 'assets/images/',
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
  CHOOSE_DECK: 'CHOOSE_DECK',
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
    createContainer: true,
  },
  scene: [],
  audio: {
    disableWebAudio: true,
    context:  new (window.AudioContext)(),
  },
  plugins: {
    scene: [
      {
        key: 'rexUI',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        plugin: RexUIPlugin,
        mapping: 'rexUI',
      },
    ],
  },
});
