import { IGameBoardScene } from '@/components/GameBoard/GameBoard.model';
import { createTextData } from '@/utils/utils';
import { PLAYER_HEALTH_FIELD, textDecoration } from '@/components/GameBoard/UserAvatar/constants';
import { MANA_COUNT_FIELD } from '@/components/GameBoard/UserMana/constants';

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
  )
    .setOrigin(0.5, 0.5)
    .setDepth(100);
  const manaContainer: Phaser.GameObjects.Container = scene.add
    .container(120, 640, textMana)
    .setDepth(10);
  manaContainer.setData(MANA_COUNT_FIELD, mana);
  manaContainer.on(
    'changedata',
    (gameObject: Phaser.GameObjects.Text, key: string, value: string) => {
      textMana.setText(manaContainer.getData(MANA_COUNT_FIELD));
    },
  );
  return manaContainer;
};
