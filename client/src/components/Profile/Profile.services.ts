import { setBackground, createTextData } from '@/utils/utils';
import { getRequestInit, API_INFO_URLS } from '@/services/api.services';
import { ATLASES, IMAGES, MENU_IMAGES } from '@/components/Game/constant';
import { browserHistory } from '@/router/history';
import { createButton } from '@/components/Button/Button.services';
import { getUserDeckById } from '@/components/Deck/Deck.services';
import { createDeck } from '@/components/Deck/Deck.render';
import { MENU_URL } from '@/router/constants';
import { store } from '@/redux/store/rootStore';
import { StatusCodes } from 'http-status-codes';
import {countCards} from '@/components/Card/Card.services';
import {
  textDecoration,
  positionInfo,
  positionMenu,
  HEIGHT_OFFSET,
  USER_PROFILE_INFO,
  INFO_BLOCK_X,
  INFO_BLOCK_SCALE,
} from './constants';
import { UserProfile } from './Profile.model';

const getUserProfileInfo = async (): Promise<UserProfile> => {
  const { user_id: userId } = store.getState().authUser;
  const requestInit = getRequestInit();

  const user = await fetch(`${API_INFO_URLS.users}/${userId}/profile`, requestInit)
    .then(
      (response): Promise<UserProfile> => {
        if (response.status !== StatusCodes.OK) {
          throw new Error();
        }
        return response.json();
      },
    )
    .then((userProfileData: UserProfile) => userProfileData)
    .catch(error => {
      throw new Error(error);
    });

  return user;
};

const createInfoContainer = async (scene: Phaser.Scene): Promise<void> => {
  const userInfoBgr = scene.add.image(
    INFO_BLOCK_X,
    scene.cameras.main.height / 2,
    IMAGES.SETTINGS_BLOCK_IMAGE.NAME,
  );

  userInfoBgr.setScale(INFO_BLOCK_SCALE).setScrollFactor(0);

  const user = await getUserProfileInfo();
  if (!user) {
    throw new Error();
  }
  const textUserName: Phaser.GameObjects.Text = createTextData(
    scene,
    positionInfo.TEXT_X,
    positionInfo.TEXT_Y,
    `${USER_PROFILE_INFO.nickName} ${user.nickName}`,
    textDecoration,
  );

  const textUserLevel: Phaser.GameObjects.Text = createTextData(
    scene,
    positionInfo.TEXT_X,
    positionInfo.TEXT_Y + HEIGHT_OFFSET,
    `${USER_PROFILE_INFO.level} ${user.level.toString()}`,
    textDecoration,
  );

  const textUserExp: Phaser.GameObjects.Text = createTextData(
    scene,
    positionInfo.TEXT_X,
    positionInfo.TEXT_Y + HEIGHT_OFFSET * 2,
    `${USER_PROFILE_INFO.exp} ${user.exp.toString()}`,
    textDecoration,
  );

  const userCountCards = await countCards();
  const textUserCards: Phaser.GameObjects.Text = createTextData(
    scene,
    positionInfo.TEXT_X,
    positionInfo.TEXT_Y + HEIGHT_OFFSET * 3,
    `${USER_PROFILE_INFO.cards} ${userCountCards.toString()} ${USER_PROFILE_INFO.counts}`,
    textDecoration,
  );
  const textCurrDeck: Phaser.GameObjects.Text = createTextData(
    scene,
    positionInfo.TEXT_X,
    positionInfo.TEXT_Y + HEIGHT_OFFSET * 4,
    `${USER_PROFILE_INFO.currDeck}`,
    textDecoration,
  );

  const userCurrDeckInfo = await getUserDeckById(user.cur_user_deck_id);
  const userCurrDeck = createDeck(scene, userCurrDeckInfo);

  const userInfoBLock = [
    userInfoBgr,
    textUserName,
    textUserLevel,
    textUserExp,
    textUserCards,
    textCurrDeck,
    userCurrDeck,
  ];

  scene.add.container(0, 0, userInfoBLock);
};

export const create = (scene: Phaser.Scene): void => {
  setBackground(scene, IMAGES.PROFILE_BACKGROUND.NAME);

  const positionMenuCoords = {
    X: scene.cameras.main.width - positionMenu.OFFSET_X,
    Y: positionMenu.Y,
  };

  const menuButton = createButton(
    scene,
    positionMenuCoords,
    0,
    ATLASES.MENU_ATLAS.NAME,
    MENU_IMAGES.MENU_BUTTON,
    HEIGHT_OFFSET,
  );

  menuButton.on('pointerup', () => {
    browserHistory.push(MENU_URL);
  });

  createInfoContainer(scene);
};
