import { setBackground } from '@/utils/utils';
import { ATLASES, IMAGES, MENU_IMAGES, SCENES } from '@/components/Game/constant';
import { HEIGHT_COEFFICIENT, MENU_ITEM_HEIGHT } from '@/components/MenuScene/constants';
import { browserHistory } from '@/router/history';
import { GAME_URL, MY_CARDS_URL, PROFILE_URL } from '@/router/constants';
import { handleLogout } from '@/components/Auth/Auth.services';

interface MenuState {
  IDLE: string;
  HOVER: string;
  CLICK: string;
}

function createButton(
  scene: Phaser.Scene,
  positionY: number,
  atlasName: string,
  menu: MenuState,
): Phaser.GameObjects.Sprite {
  const button = scene.add.sprite(
    scene.game.renderer.width / 2,
    scene.game.renderer.height / 2 - positionY + HEIGHT_COEFFICIENT,
    atlasName,
    menu.IDLE,
  );
  button.setScale(0.9, 0.9).setInteractive();
  button.on('pointerover', () => {
    button.setFrame(menu.HOVER);
  });
  button.on('pointerout', () => {
    button.setFrame(menu.IDLE);
  });
  button.on('pointerdown', () => {
    button.setFrame(menu.CLICK);
  });
  return button;
}

export function create(scene: Phaser.Scene): void {
  setBackground(scene, IMAGES.MENU_BACKGROUND.NAME);
  const startButton = createButton(
    scene,
    MENU_ITEM_HEIGHT * 2,
    ATLASES.MENU_START_ATLAS.NAME,
    MENU_IMAGES.MENU_START_GAME,
  );
  startButton.on('pointerup', () => {
    browserHistory.push(GAME_URL);
  });
  const myCardsButton = createButton(
    scene,
    MENU_ITEM_HEIGHT,
    ATLASES.MY_CARDS_ATLAS.NAME,
    MENU_IMAGES.MENU_MY_CARDS,
  );
  myCardsButton.on('pointerup', () => {
    browserHistory.push(MY_CARDS_URL);
  });

  const settingButton = createButton(
    scene,
    0,
    ATLASES.SETTINGS_ATLAS.NAME,
    MENU_IMAGES.MENU_SETTINGS,
  );
  
  settingButton.on('pointerup', () => {
    browserHistory.push(PROFILE_URL);
  });

  const exitButton = createButton(
    scene,
    -MENU_ITEM_HEIGHT,
    ATLASES.EXIT_ATLAS.NAME,
    MENU_IMAGES.MENU_EXIT,
  );
  exitButton.on('pointerup', () => {
    handleLogout();
  });
}
