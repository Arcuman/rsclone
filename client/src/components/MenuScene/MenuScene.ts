import { IMAGES, SCENES } from '@/components/Game/constant';
import Phaser from 'phaser';
import { HEIGHT_COEFFICIENT, MENU_ITEM_HEIGHT } from '@/components/MenuScene/constants';
import { handleLogout } from '@/components/Auth/Auth.services';
import { GAME_URL, MY_CARDS_URL } from '@/router/constants';
import { browserHistory } from '@/router/history';

function setBackground(game: Phaser.Scene) {
  const image = game.add.image(
    game.cameras.main.width / 2,
    game.cameras.main.height / 2,
    IMAGES.MENU_BACKGROUND.NAME
  );
  const scaleX = game.cameras.main.width / image.width;
  const scaleY = game.cameras.main.height / image.height;
  const scale = Math.max(scaleX, scaleY);
  image.setScale(scale).setScrollFactor(0);
}

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENES.MENU,
      active: false,
      visible: false,
    });
  }

  create(): void {
    setBackground(this);
    const startButton = this.add.sprite(
      this.game.renderer.width / 2,
      this.game.renderer.height / 2 - MENU_ITEM_HEIGHT * 2 + HEIGHT_COEFFICIENT,
      IMAGES.MENU_START_ATLAS.NAME,
      IMAGES.MENU_START_GAME.IDLE
    );
    startButton.setScale(0.9, 0.9).setInteractive();
    startButton.on('pointerover', () => {
      startButton.setFrame(IMAGES.MENU_START_GAME.HOVER);
    });
    startButton.on('pointerout', () => {
      startButton.setFrame(IMAGES.MENU_START_GAME.IDLE);
    });
    startButton.on('pointerdown', () => {
      startButton.setFrame(IMAGES.MENU_START_GAME.CLICK);
    });
    startButton.on('pointerup', () => {
      browserHistory.push(GAME_URL);
    });
    const myCardsButton = this.add.sprite(
      this.game.renderer.width / 2,
      this.game.renderer.height / 2 - MENU_ITEM_HEIGHT + HEIGHT_COEFFICIENT,
      IMAGES.MY_CARDS_ATLAS.NAME,
      IMAGES.MENU_MY_CARDS.IDLE
    );
    myCardsButton.setScale(0.9, 0.9).setInteractive();
    myCardsButton.on('pointerover', () => {
      myCardsButton.setFrame(IMAGES.MENU_MY_CARDS.HOVER);
    });
    myCardsButton.on('pointerdown', () => {
      myCardsButton.setFrame(IMAGES.MENU_MY_CARDS.CLICK);
    });
    myCardsButton.on('pointerout', () => {
      myCardsButton.setFrame(IMAGES.MENU_MY_CARDS.IDLE);
    });
    myCardsButton.on('pointerup', () => {
      browserHistory.push(MY_CARDS_URL);
    });

    const settingButton = this.add.sprite(
      this.game.renderer.width / 2,
      this.game.renderer.height / 2 + HEIGHT_COEFFICIENT,
      IMAGES.SETTINGS_ATLAS.NAME,
      IMAGES.MENU_SETTINGS.IDLE
    );
    settingButton.setScale(0.9, 0.9).setInteractive();
    settingButton.on('pointerover', () => {
      settingButton.setFrame(IMAGES.MENU_SETTINGS.HOVER);
    });
    settingButton.on('pointerdown', () => {
      settingButton.setFrame(IMAGES.MENU_SETTINGS.CLICK);
    });
    settingButton.on('pointerout', () => {
      settingButton.setFrame(IMAGES.MENU_SETTINGS.IDLE);
    });

    const exitButton = this.add.sprite(
      this.game.renderer.width / 2,
      this.game.renderer.height / 2 + MENU_ITEM_HEIGHT + HEIGHT_COEFFICIENT,
      IMAGES.EXIT_ATLAS.NAME,
      IMAGES.MENU_EXIT.IDLE
    );
    exitButton.setScale(0.9, 0.9).setInteractive();
    exitButton.on('pointerover', () => {
      exitButton.setFrame(IMAGES.MENU_EXIT.HOVER);
    });
    exitButton.on('pointerout', () => {
      exitButton.setFrame(IMAGES.MENU_EXIT.IDLE);
    });
    exitButton.on('pointerdown', () => {
      exitButton.setFrame(IMAGES.MENU_EXIT.CLICK);
    });
    exitButton.on('pointerup', () => {
      handleLogout();
    });
  }
}
