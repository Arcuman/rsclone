import Phaser from 'phaser';

export const IMAGES = {
  MENU_BACKGROUND: {
    NAME: 'menu-background',
    PATH: 'assets/images/menu-bgr.jpg',
  },
  LOAD_BACKGROUND: {
    NAME: 'load-background',
    PATH: 'assets/images/loading-bgr.jpg',
  },
  AGENT: {
    NAME: 'agent',
    PATH: 'assets/images/agent.png',
  },
  AKAMA: {
    NAME: 'akama',
    PATH: 'assets/images/akama.png',
  },
  ASSASSINATE: {
    NAME: 'assassinate',
    PATH: 'assets/images/assassinate.png',
  },
  MASTER_DISGUISE: {
    NAME: 'master_disguise',
    PATH: 'assets/images/master_disguise.png',
  },
  PHARAOH_CAT: {
    NAME: 'pharaoh_cat',
    PATH: 'assets/images/pharaoh_cat.png',
  },
  PRIZE_PLUNDERER: {
    NAME: 'prize_plunderer',
    PATH: 'assets/images/prize_plunderer.png',
  },
  SAHKET_SAPPER: {
    NAME: 'sahket_sapper',
    PATH: 'assets/images/sahket_sapper.png',
  },
  SEAL_FATE: {
    NAME: 'seal_fate',
    PATH: 'assets/images/seal_fate.png',
  },
  SHADOW_SKULPTOR: {
    NAME: 'shadow_sculptor',
    PATH: 'assets/images/shadow_sculptor.png',
  },
  SHIV: {
    NAME: 'shiv',
    PATH: 'assets/images/shiv.png',
  },
  SINISTER_STRIKE: {
    NAME: 'sinister_strike',
    PATH: 'assets/images/sinister_strike.png',
  },
  SKYVATEER: {
    NAME: 'skyvateer',
    PATH: 'assets/images/skyvateer.png',
  },
  STOWAWAY: {
    NAME: 'stowaway',
    PATH: 'assets/images/stowaway.png',
  },
  SWEET_TOOTH: {
    NAME: 'sweet_tooth',
    PATH: 'assets/images/sweet_tooth.png',
  },
  VENDETTA: {
    NAME: 'vendetta',
    PATH: 'assets/images/vendetta.png',
  },
  GAME_BOARD: {
    NAME: 'game_board',
    PATH: 'assets/images/game_board.png',
  },
  AVATAR: {
    NAME: 'avatar',
    PATH: 'assets/images/avatar.png',
  },
  MY_CARDS_CONTAINER: {
    NAME: 'my_cards_container',
    PATH: 'assets/images/my_cards/book_my_cards.png',
  },
  MY_DECKS_CONTAINER: {
    NAME: 'my_decks_container',
    PATH: 'assets/images/my_cards/my_deck_container.png',
  },
  MY_CARDS_DECOR: {
    NAME: 'my_cards_decor',
    PATH: 'assets/images/my_cards/decor_my_cards.png',
  },
};

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
};

export const MENU_IMAGES = {
  MENU_START_GAME: {
    IDLE: 'start-game-button-ru.png',
    HOVER: 'start-game-button-hover-ru.png',
    CLICK: 'start-game-button-click-ru.png',
  },
  MENU_MY_CARDS: {
    IDLE: 'my-cards-button-ru.png',
    HOVER: 'my-cards-button-hover-ru.png',
    CLICK: 'my-cards-button-click-ru.png',
  },
  MENU_SETTINGS: {
    IDLE: 'settings-button-ru.png',
    HOVER: 'settings-button-hover-ru.png',
    CLICK: 'settings-button-click-ru.png',
  },
  MENU_EXIT: {
    IDLE: 'exit-button-ru.png',
    HOVER: 'exit-button-hover-ru.png',
    CLICK: 'exit-button-click-ru.png',
  },
};

export const SCENES = {
  LOAD: 'LOAD',
  MENU: 'MENU',
  MY_CARDS: 'MY_CARDS',
  FIND_ENEMY: 'FIND_ENEMY',
  GAME_BOARD: 'GAME_BOARD',
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
  backgroundColor: 0x33ffff,
});
