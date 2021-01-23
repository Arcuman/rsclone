import {IMAGES} from '@/components/Game/constant';
import {createTable} from '@/components/GameBoard/Table/Table.render';
import Phaser from 'phaser';
import {
  DROP_ZONE_HIEGHT_OFFSET,
  DROP_ZONE_WIDTH_OFFSET,
  tablePositionInfo,
} from '@/components/GameBoard/Table/constants';

export function createGameTableImg(scene: Phaser.Scene) : Phaser.GameObjects.Container{
  const gameWidth = <number>scene.game.config.width;
  const gameHeight = <number>scene.game.config.height;
  const cardImg = IMAGES.GAME_BOARD.NAME;
  return  createTable({
    scene,
    posX: gameWidth / 2,
    posY: gameHeight / 2,
    img: cardImg,
  });
}

export function createPlayerTableZone(scene: Phaser.Scene, table : Phaser.GameObjects.Container) : Phaser.GameObjects.Zone{
  const gameWidth = <number>scene.game.config.width;
  const gameHeight = <number>scene.game.config.height;
  const tableHalfHeight = table.height / 2;
  const tableWidth = table.width;
  const zone = scene.add
    .zone(
      gameWidth / 2,
      gameHeight / 2 + (tableHalfHeight * tablePositionInfo.TABLE_CONTAINER_SCALE) / 2 - DROP_ZONE_HIEGHT_OFFSET,
      tableWidth,
      tableHalfHeight,
    )
    .setRectangleDropZone(tableWidth * tablePositionInfo.TABLE_CONTAINER_SCALE -DROP_ZONE_WIDTH_OFFSET, (tableHalfHeight) * tablePositionInfo.TABLE_CONTAINER_SCALE - DROP_ZONE_HIEGHT_OFFSET);
  const dropZoneOutline = scene.add.graphics();
  dropZoneOutline.lineStyle(4, 0xff69b4);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  dropZoneOutline.strokeRect(zone.x - zone.input.hitArea.width / 2,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    zone.y - zone.input.hitArea.height / 2,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    zone.input.hitArea.width,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    zone.input.hitArea.height);
  return zone;
}
