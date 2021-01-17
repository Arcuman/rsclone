import { IMAGES, SCENES } from '@/components/Game/constant';
import { MenuScene } from '@/components/MenuScene/MenuScene';
import Phaser from 'phaser';
import { GameBoardScene } from '@/components/GameBoard/GameBoard.render';
import { MyCardsScene } from '@/components/MyCardsScene/MyCardsScene';
import File = Phaser.Loader.File;

export class LoadScene extends Phaser.Scene {
  private nextScene: string;

  constructor() {
    super({
      key: SCENES.LOAD,
      active: false,
      visible: false,
    });
  }

  init(data: { nextScene: string }): void {
    this.nextScene = data.nextScene;
  }

  preload(): void {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(480, 330, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
      },
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value: number) => {
      percentText.setText(`${value * 100}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(490, 340, 300 * value, 30);
    });
    this.load.on('fileprogress', (file: File) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });
    this.load.image(IMAGES.LOAD_BACKGROUND.NAME, IMAGES.LOAD_BACKGROUND.PATH);
    this.load.image(IMAGES.MENU_BACKGROUND.NAME, IMAGES.MENU_BACKGROUND.PATH);
    this.load.image(IMAGES.AGENT.NAME, IMAGES.AGENT.PATH);
    this.load.image(IMAGES.AKAMA.NAME, IMAGES.AKAMA.PATH);
    this.load.image(IMAGES.ASSASSINATE.NAME, IMAGES.ASSASSINATE.PATH);
    this.load.image(IMAGES.MASTER_DISGUISE.NAME, IMAGES.MASTER_DISGUISE.PATH);
    this.load.image(IMAGES.PHARAOH_CAT.NAME, IMAGES.PHARAOH_CAT.PATH);
    this.load.image(IMAGES.PRIZE_PLUNDERER.NAME, IMAGES.PRIZE_PLUNDERER.PATH);
    this.load.image(IMAGES.SAHKET_SAPPER.NAME, IMAGES.SAHKET_SAPPER.PATH);
    this.load.image(IMAGES.SEAL_FATE.NAME, IMAGES.SEAL_FATE.PATH);
    this.load.image(IMAGES.SHADOW_SKULPTOR.NAME, IMAGES.SHADOW_SKULPTOR.PATH);
    this.load.image(IMAGES.SHIV.NAME, IMAGES.SHIV.PATH);
    this.load.image(IMAGES.SINISTER_STRIKE.NAME, IMAGES.SINISTER_STRIKE.PATH);
    this.load.image(IMAGES.SKYVATEER.NAME, IMAGES.SKYVATEER.PATH);
    this.load.image(IMAGES.STOWAWAY.NAME, IMAGES.STOWAWAY.PATH);
    this.load.image(IMAGES.SWEET_TOOTH.NAME, IMAGES.SWEET_TOOTH.PATH);
    this.load.image(IMAGES.VENDETTA.NAME, IMAGES.VENDETTA.PATH);

    this.load.multiatlas(
      IMAGES.MENU_START_ATLAS.NAME,
      IMAGES.MENU_START_ATLAS.PATH,
      IMAGES.MENU_START_ATLAS.IMAGES_CONTAINER
    );
    this.load.multiatlas(
      IMAGES.MY_CARDS_ATLAS.NAME,
      IMAGES.MY_CARDS_ATLAS.PATH,
      IMAGES.MY_CARDS_ATLAS.IMAGES_CONTAINER
    );
    this.load.multiatlas(
      IMAGES.SETTINGS_ATLAS.NAME,
      IMAGES.SETTINGS_ATLAS.PATH,
      IMAGES.SETTINGS_ATLAS.IMAGES_CONTAINER
    );
    this.load.multiatlas(
      IMAGES.EXIT_ATLAS.NAME,
      IMAGES.EXIT_ATLAS.PATH,
      IMAGES.EXIT_ATLAS.IMAGES_CONTAINER
    );

    this.scene.add(SCENES.MENU, MenuScene, false);
    this.scene.add(SCENES.GAME, GameBoardScene, false);
    this.scene.add(SCENES.MY_CARDS, MyCardsScene, false);

    this.load.on('complete', () => {
      this.scene.start(this.nextScene);
    });
  }
}
