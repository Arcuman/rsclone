import { createTextData, setShadow } from '@/utils/utils';
import {
  textDecoration,
  AvatarNameDecoration,
  positionInfo,
  shadowOptions,
  SIZE_AVATAR,
  TEXT_FIELD_NAME,
} from './constants';
import { AvatarCreateInfo } from './Avatar.model';

export const createAvatar = (data: AvatarCreateInfo): Phaser.GameObjects.Container => {
  const { scene, posX, posY, card, userName, health } = data;
  const { IMG_X, IMG_Y, USER_NAME_X, USER_NAME_Y, HEALTH_X, HEALTH_Y } = positionInfo;
  const { OFFSET_X, OFFSET_Y, TINT, ALPHA } = shadowOptions;

  const spriteCard: Phaser.GameObjects.Sprite = scene.add.sprite(IMG_X, IMG_Y, card);

  const shadow = setShadow(scene, card, IMG_X + OFFSET_X, IMG_Y + OFFSET_Y, TINT, ALPHA);

  const textHealth: Phaser.GameObjects.Text = createTextData(
    scene,
    HEALTH_X,
    HEALTH_Y,
    health,
    textDecoration,
  ).setOrigin(0.5, 0.5);

  const textUserName: Phaser.GameObjects.Text = createTextData(
    scene,
    USER_NAME_X,
    USER_NAME_Y,
    userName,
    AvatarNameDecoration,
  );

  textUserName.x = -textUserName.width / 2;

  const avatarLayers = [shadow, spriteCard, textHealth, textUserName];
  const cardContainer: Phaser.GameObjects.Container = scene.add.container(posX, posY, avatarLayers);

  cardContainer.setData(TEXT_FIELD_NAME, health);
  cardContainer.on(
    'changedata',
    (gameObject: Phaser.GameObjects.Text, key: string, value: string) => {
      textHealth.setText(cardContainer.getData(TEXT_FIELD_NAME));
    },
  );
  cardContainer.setSize(spriteCard.width, spriteCard.height);
  cardContainer.setScale(SIZE_AVATAR, SIZE_AVATAR);
  return cardContainer;
};
