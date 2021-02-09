import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import { createTextData } from '@/utils/utils';
import { textManaDecoration } from '@/components/GameBoard/UserAvatar/constants';
import {
  BACKGROUND_USER_MANA_X, BACKGROUND_USER_MANA_Y,
  MANA_COUNT_FIELD,
} from '@/components/GameBoard/UserMana/constants';
import {setBackgroundForUserMana} from '@/components/GameBoard/UserMana/UserMana.services';

export const createPlayerMana = (
  scene: IGameBoardScene,
  mana: number,
): Phaser.GameObjects.Container => {
  const textMana: Phaser.GameObjects.Text = createTextData(
    scene,
    0,
    0,
    mana.toString(),
    textManaDecoration,
  ).setOrigin(0.5, 0.5);
  const manaBackground = setBackgroundForUserMana(scene);
  const manaContainer: Phaser.GameObjects.Container = scene.add.container(
    BACKGROUND_USER_MANA_X,
    BACKGROUND_USER_MANA_Y,
    [manaBackground, textMana],
  );
  manaContainer.setData(MANA_COUNT_FIELD, mana);
  manaContainer.on(
    'changedata',
    () => {
      textMana.setText(manaContainer.getData(MANA_COUNT_FIELD));
    },
  );
  return manaContainer;
};
