import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import { createTextData } from '@/utils/utils';
import { textDecoration } from '@/components/GameBoard/UserAvatar/constants';

import { START_GAME } from '@/components/GameBoard/constants';
import { BUTTON_X, BUTTON_Y, READY_TEXT } from '@/components/GameBoard/ReadyButton/constants';

export const createReadyButton = (scene: IGameBoardScene): Phaser.GameObjects.Container => {
  const textButton: Phaser.GameObjects.Text = createTextData(
    scene,
    0,
    0,
    READY_TEXT,
    textDecoration,
  ).setOrigin(0.5, 0.5);
  const buttonContainer: Phaser.GameObjects.Container = scene.add.container(
    BUTTON_X,
    BUTTON_Y,
    textButton,
  );
  buttonContainer.setSize(textButton.width, textButton.height);
  buttonContainer.setInteractive();
  buttonContainer.on('pointerup', () => {
    scene.getSocket().emit(START_GAME);
    buttonContainer.destroy();
  });
  return buttonContainer;
};
