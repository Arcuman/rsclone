import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import {
  BUTTON_X,
  BUTTON_Y,
  IS_PLAYER_ONE_TURN_FIELD,
} from '@/components/GameBoard/EndTurnButton/constants';
import { NEXT_TURN } from '@/components/GameBoard/constants';
import { ATLASES } from '@/components/Game/constant';
import { END_TURN_BUTTON } from '@/components/Game/images.constants';

function getImageButton(isPlayerOne: boolean, isPlayerOneTurn: boolean) {
  if (isPlayerOne === isPlayerOneTurn) {
    return END_TURN_BUTTON.IDLE;
  }
  return END_TURN_BUTTON.ENEMY;
}

export const createEndTurnButton = (
  scene: IGameBoardScene,
  isPlayerOneTurn: boolean,
): Phaser.GameObjects.Container => {
  const button = scene.add
    .sprite(
      0,
      0,
      ATLASES.TURN_BUTTON_ATLAS.NAME,
      getImageButton(scene.getIsPlayerOne(), isPlayerOneTurn),
    )
    .setScale(0.4)
    .setSize(160, 50);
  const buttonContainer: Phaser.GameObjects.Container = scene.add.container(
    BUTTON_X,
    BUTTON_Y,
    button,
  );
  buttonContainer.setData(IS_PLAYER_ONE_TURN_FIELD, isPlayerOneTurn);
  buttonContainer.on('changedata', () => {
    button.setFrame(
      getImageButton(scene.getIsPlayerOne(), buttonContainer.getData(IS_PLAYER_ONE_TURN_FIELD)),
    );
  });
  buttonContainer.setSize(button.width, button.height);
  buttonContainer.disableInteractive();

  buttonContainer.on('pointerover', () => {
    if (scene.getIsPlayerOne() === buttonContainer.getData(IS_PLAYER_ONE_TURN_FIELD))
      button.setFrame(END_TURN_BUTTON.HOVER);
  });
  buttonContainer.on('pointerout', () => {
    if (scene.getIsPlayerOne() === buttonContainer.getData(IS_PLAYER_ONE_TURN_FIELD))
      button.setFrame(END_TURN_BUTTON.IDLE);
  });
  buttonContainer.on('pointerdown', () => {
    if (scene.getIsPlayerOne() === buttonContainer.getData(IS_PLAYER_ONE_TURN_FIELD))
      button.setFrame(END_TURN_BUTTON.CLICK);
  });
  buttonContainer.on('pointerup', () => {
    if (scene.getIsPlayerOne() === buttonContainer.getData(IS_PLAYER_ONE_TURN_FIELD)) {
      scene.getSocket().emit(NEXT_TURN);
      button.setFrame(END_TURN_BUTTON.ENEMY);
    }
  });
  return buttonContainer;
};
