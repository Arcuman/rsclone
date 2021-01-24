import { setBackground, createTextData } from '@/utils/utils';
import { ATLASES, IMAGES, MENU_IMAGES } from '@/components/Game/constant';
import { browserHistory } from '@/router/history';
import { createButton } from '@/components/Button/Button.services';
import { MENU_URL } from '@/router/constants';
import { HEADER_JSON } from '@/constants/constants';
import { store } from '@/redux/store/rootStore';
import { StatusCodes } from 'http-status-codes';
import { Card } from '@/components/Card/Card.model';
import { Deck } from '@/components/Deck/Deck.model';
import { createDeck } from '@/components/Deck/Deck.render';
import {
  textDecoration,
  positionInfo,
  positionMenu,
  HEIGHT_OFFSET,
  USER_PROFILE_INFO,
  API_INFO_URLS,
  INFO_BLOCK_X,
} from './constants';
import { UserProfile } from './Profile.model';

const getRequestInit = ():RequestInit =>{
  const { accessToken } = store.getState().authUser;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    ...HEADER_JSON,
  };
  return {
    method: 'GET',
    headers,
    mode: 'cors',
    cache: 'default',
    credentials: 'include',
  };
};

const getUserCurrDeck = async (deckId: number) => {
  const requestInit = getRequestInit();
  
  const userCurrDeck = await fetch(`${API_INFO_URLS.userDeck}/${deckId}`, requestInit)
    .then(
      (response): Promise<Deck> => {
        if (response.status !== StatusCodes.OK) {
          throw new Error();
        }
        return response.json();
      },
    )
    .then((currDeck: Deck) => currDeck)
    .catch(error => {
      throw new Error(error);
    });

  return userCurrDeck;
};

const getUserProfileInfo = async (): Promise<UserProfile> => {
  const { user_id: userId } = store.getState().authUser;
  
  const requestInit = getRequestInit();

  const user = await fetch(`${API_INFO_URLS.userProfile}/${userId}`, requestInit)
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

const getUserCounCards = async (): Promise<number> => {
  const requestInit = getRequestInit();

  const cardsCount = await fetch(`${API_INFO_URLS.cards}`, requestInit)
    .then(
      (response): Promise<Card[]> => {
        if (response.status !== StatusCodes.OK) {
          throw new Error();
        }
        return response.json();
      },
    )
    .then((cards: Card[]): number => cards.length)
    .catch(error => {
      throw new Error(error);
    });

  return cardsCount;
};

const createInfoContainer = async (scene: Phaser.Scene): Promise<void> => {
  const userInfoBgr = scene.add.image(
    INFO_BLOCK_X,
    scene.cameras.main.height / 2,
    IMAGES.SETTINGS_BLOCK_IMAGE.NAME,
  );

  userInfoBgr.setScale(0.8).setScrollFactor(0);
  const user = await getUserProfileInfo();
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

  const userCountCards = await getUserCounCards();
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

  const userCurrDeckInfo = await getUserCurrDeck(user.cur_user_deck_id);
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
