import { ATLASES, IMAGES, SCENES } from '@/components/Game/constant';
import { MenuScene } from '@/components/MenuScene/MenuScene';
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
import File = Phaser.Loader.File;

function setLoadingBar(game: Phaser.Scene) {
  const progressBar = game.add.graphics();
  const progressBox = game.add.graphics();
  progressBox.fillStyle(PROGRESS_BOX.color, PROGRESS_BOX.alpha);
  progressBox.fillRect(PROGRESS_BOX.x, PROGRESS_BOX.y, PROGRESS_BOX.width, PROGRESS_BOX.height);

  const { width } = game.cameras.main;
  const { height } = game.cameras.main;
  const loadingText = game.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: LOADING_TEXT,
    style: {
      font: LOADING_TEXT_FONT,
    },
  });
  loadingText.setOrigin(0.5, 0.5);

  const percentText = game.make.text({
    x: width / 2,
    y: height / 2 - 5,
    text: TEXT_ZERO_PROCENT,
    style: {
      font: TEXT_FONT,
    },
  });
  percentText.setOrigin(0.5, 0.5);

  const assetText = game.make.text({
    x: width / 2,
    y: height / 2 + 50,
    text: '',
    style: {
      font: TEXT_FONT,
    },
  });
  assetText.setOrigin(0.5, 0.5);
  game.load.on('progress', (value: number) => {
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
  game.load.on('fileprogress', (file: File) => {
    assetText.setText(LOADINT_ASSETS(file.key));
  });
}

function loadImages(game: Phaser.Scene) {
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const prop in IMAGES) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    game.load.image(IMAGES[prop].NAME, IMAGES[prop].PATH);
  }
}

function loadAtlases(game: Phaser.Scene) {
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const prop in ATLASES) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    game.load.multiatlas(ATLASES[prop].NAME, ATLASES[prop].PATH, ATLASES[prop].IMAGES_CONTAINER);
  }
}
function loadScenes(game: Phaser.Scene) {
  game.scene.add(SCENES.MENU, MenuScene, false);
  game.scene.add(SCENES.GAME, GameBoardScene, false);
  game.scene.add(SCENES.MY_CARDS, MyCardsScene, false);
}

export function preload(game: Phaser.Scene, nextScene: string): void {
  setLoadingBar(game);
  game.load.reset();
  loadImages(game);
  loadAtlases(game);
  loadScenes(game);
  game.load.on('complete', () => {
    game.scene.start(nextScene);
  });
}
