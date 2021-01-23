import { setShadow } from '@/utils/utils';
import { tablePositionInfo } from './constants';
import { TableCreateInfo } from './Table.model';

export const createTable = (data: TableCreateInfo): Phaser.GameObjects.Container => {
  const { scene, posX, posY, img } = data;
  const {
    IMG_X,
    IMG_Y,
    SHADOW_X,
    SHADOW_Y,
    SHADOW_TINT,
    SHADOW_ALPHA,
    TABLE_CONTAINER_SCALE,
  } = tablePositionInfo;

  const spriteTable: Phaser.GameObjects.Sprite = scene.add.sprite(IMG_X, IMG_Y, img);

  const shadow = setShadow(
    scene,
    img,
    IMG_X + SHADOW_X,
    IMG_Y + SHADOW_Y,
    SHADOW_TINT,
    SHADOW_ALPHA,
  );

  const tableLayers: Phaser.GameObjects.Sprite[] = [shadow, spriteTable];
  const tableContainer = scene.add.container(posX, posY, tableLayers);

  tableContainer.setSize(spriteTable.width, spriteTable.height);
  tableContainer.setScale(TABLE_CONTAINER_SCALE, TABLE_CONTAINER_SCALE);

  return tableContainer;
};
