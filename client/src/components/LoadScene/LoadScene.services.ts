import { ATLASES, IMAGES, SCENES } from '@/components/Game/constant';
import { MenuScene } from '@/components/MenuScene/MenuScene';
import { ProfileScene } from '@/components/Profile/Profile.render';
import { GameBoardScene } from '@/components/GameBoard/GameBoard.render';
import { MyCardsScene } from '@/components/MyCardsScene/MyCardsScene';
import {
  LOADING_TEXT,
  LOADING_TEXT_FONT,
  LOADINT_ASSETS,
  PROGRESS_BAR,
  PROGRESS_BOX,
  TEXT_FONT,
  TEXT_ZERO_PROCENT,
} from '@/components/LoadScene/constants';
import { FindEnemyScene } from '@/components/FindEnemyScene/FindEnemyScene';
import File = Phaser.Loader.File;

function setLoadingBar(scene: Phaser.Scene) {
  const progressBar = scene.add.graphics();
  const progressBox = scene.add.graphics();
  progressBox.fillStyle(PROGRESS_BOX.color, PROGRESS_BOX.alpha);
  progressBox.fillRect(PROGRESS_BOX.x, PROGRESS_BOX.y, PROGRESS_BOX.width, PROGRESS_BOX.height);

  const { width } = scene.cameras.main;
  const { height } = scene.cameras.main;
  const loadingText = scene.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: LOADING_TEXT,
    style: {
      font: LOADING_TEXT_FONT,
    },
  });
  loadingText.setOrigin(0.5, 0.5);

  const percentText = scene.make.text({
    x: width / 2,
    y: height / 2 - 5,
    text: TEXT_ZERO_PROCENT,
    style: {
      font: TEXT_FONT,
    },
  });
  percentText.setOrigin(0.5, 0.5);

  const assetText = scene.make.text({
    x: width / 2,
    y: height / 2 + 50,
    text: '',
    style: {
      font: TEXT_FONT,
    },
  });
  assetText.setOrigin(0.5, 0.5);
  scene.load.on('progress', (value: number) => {
    percentText.setText(`${value * 100}%`);
    progressBar.clear();
    progressBox.fillStyle(PROGRESS_BAR.color, PROGRESS_BAR.alpha);
    progressBox.fillRect(
      PROGRESS_BAR.x,
      PROGRESS_BAR.y,
      PROGRESS_BAR.width * value,
      PROGRESS_BAR.height,
    );
  });
  scene.load.on('fileprogress', (file: File) => {
    assetText.setText(LOADINT_ASSETS(file.key));
  });
}

function loadImages(scene: Phaser.Scene) {
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const prop in IMAGES) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    scene.load.image(IMAGES[prop].NAME, IMAGES[prop].PATH);
  }
}

function loadAtlases(scene: Phaser.Scene) {
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const prop in ATLASES) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    scene.load.multiatlas(ATLASES[prop].NAME, ATLASES[prop].PATH, ATLASES[prop].IMAGES_CONTAINER);
  }
}
function loadScenes(scene: Phaser.Scene) {
  scene.scene.add(SCENES.MENU, MenuScene, false);
  scene.scene.add(SCENES.GAME_BOARD, GameBoardScene, false);
  scene.scene.add(SCENES.MY_CARDS, MyCardsScene, false);
  scene.scene.add(SCENES.FIND_ENEMY, FindEnemyScene, false);
  scene.scene.add(SCENES.PROFILE, ProfileScene, false);
}

export function preload(scene: Phaser.Scene, nextScene: string): void {
  setLoadingBar(scene);
  scene.load.reset();
  loadImages(scene);
  loadAtlases(scene);
  loadScenes(scene);
  scene.load.on('complete', () => {
    scene.scene.start(nextScene);
  });
}
