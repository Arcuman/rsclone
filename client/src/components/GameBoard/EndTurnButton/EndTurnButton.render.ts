import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import { createTextData } from '@/utils/utils';
import { textDecoration } from '@/components/GameBoard/UserAvatar/constants';
import {
  BUTTON_X,
  BUTTON_Y,
  IS_PLAYER_ONE_TURN_FIELD,
} from '@/components/GameBoard/EndTurnButton/constants';
import { NEXT_TURN } from '@/components/GameBoard/constants';

function getTextButton(isPlayerOne: boolean, isPlayerOneTurn: boolean) {
  if (isPlayerOne === isPlayerOneTurn) {
    return 'END TURN';
  }
  return 'WAIT ENEMY';
}

export const createEndTurnButton = (
  scene: IGameBoardScene,
  isPlayerOneTurn: boolean,
): Phaser.GameObjects.Container => {
  const textButton: Phaser.GameObjects.Text = createTextData(
    scene,
    0,
    0,
    getTextButton(scene.getIsPlayerOne(), isPlayerOneTurn),
    textDecoration,
  ).setOrigin(0.5, 0.5);
  const buttonContainer: Phaser.GameObjects.Container = scene.add.container(
    BUTTON_X,
    BUTTON_Y,
    textButton,
  );
  buttonContainer.setData(IS_PLAYER_ONE_TURN_FIELD, isPlayerOneTurn);
  buttonContainer.on(
    'changedata',
    (gameObject: Phaser.GameObjects.Text, key: string, value: string) => {
      textButton.setText(
        getTextButton(scene.getIsPlayerOne(), buttonContainer.getData(IS_PLAYER_ONE_TURN_FIELD)),
      );
    },
  );
  buttonContainer.setSize(textButton.width, textButton.height);
  buttonContainer.disableInteractive();
  buttonContainer.on('pointerup', () => {
    if (scene.getIsPlayerOne() === buttonContainer.getData(IS_PLAYER_ONE_TURN_FIELD)) {
      scene.getSocket().emit(NEXT_TURN);
    }
  });
  return buttonContainer;
};
