import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import { createTextData } from '@/utils/utils';
import { textDecoration } from '@/components/GameBoard/UserAvatar/constants';
import {
  MANA_COUNT_FIELD,
  PLAYER_MANA_X,
  PLAYER_MANA_Y,
} from '@/components/GameBoard/UserMana/constants';

export const createPlayerMana = (
  scene: IGameBoardScene,
  mana: number,
): Phaser.GameObjects.Container => {
  const textMana: Phaser.GameObjects.Text = createTextData(
    scene,
    0,
    0,
    mana.toString(),
    textDecoration,
  ).setOrigin(0.5, 0.5);
  const manaContainer: Phaser.GameObjects.Container = scene.add.container(
    PLAYER_MANA_X,
    PLAYER_MANA_Y,
    textMana,
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
