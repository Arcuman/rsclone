import { setBackground, createTextData } from '@/utils/utils';
import { ATLASES, IMAGES,  MENU_IMAGES } from '@/components/Game/constant';
import { browserHistory } from '@/router/history';
import { createButton } from '@/components/Button/Button.services';
import { MENU_URL } from '@/router/constants';
import { HEADER_JSON } from '@/constants/constants';
import { store } from '@/redux/store/rootStore';
import { StatusCodes } from 'http-status-codes';
import {Card} from '@/components/Card/Card.model';
import { use } from 'matter';
import {
  textDecoration,
  positionInfo,
  HEIGHT_OFFSET,
  USER_PROFILE_INFO,
  API_INFO_URLS,
} from './constants';
import { UserProfile } from './Profile.model';

const getUserCurrDeck = async (deckId:number) =>{
  const { accessToken } = store.getState().authUser;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    ...HEADER_JSON,
  };
  const requestInit: RequestInit = {
    method: 'GET',
    headers,
    mode: 'cors',
    cache: 'default',
    credentials: 'include',
  };

  const userCurrDeck = await fetch(`${API_INFO_URLS.userDeck}/${deckId}`, requestInit)
    .then(
      (response): Promise<Card[]> => {
        if (response.status !== StatusCodes.OK) {
          throw new Error();
        }
        return response.json();
      },
    )
    .then((currDeck: Card[]) => currDeck)
    .catch(error => {
      throw new Error(error);
    });
  
  return userCurrDeck;
};

const getUserProfileInfo = async (): Promise<UserProfile> => {
  const { user_id: userId, accessToken } = store.getState().authUser;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    ...HEADER_JSON,
  };
  const requestInit: RequestInit = {
    method: 'GET',
    headers,
    mode: 'cors',
    cache: 'default',
    credentials: 'include',
  };

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

const getUserCounCards = async ():Promise<number> =>{
  const { user_id: userId, accessToken } = store.getState().authUser;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    ...HEADER_JSON,
  };
  const requestInit: RequestInit = {
    method: 'GET',
    headers,
    mode: 'cors',
    cache: 'default',
    credentials: 'include',
  };

  const cardsCount = await fetch(`${API_INFO_URLS.cards}`, requestInit)
    .then(
      (response): Promise<Card[]> => {
        if (response.status !== StatusCodes.OK) {
          throw new Error();
        }
        return response.json();
      },
    )
    .then((cards: Card[]):number => cards.length)
    .catch(error => {
      throw new Error(error);
    });
  
  return cardsCount;
};

const createInfoContainer = async (scene: Phaser.Scene): Promise<void> => {
  const userInfoBgr = scene.add.image(
    270,
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
    positionInfo.TEXT_Y + 50,
    `${USER_PROFILE_INFO.level} ${user.level.toString()}`,
    textDecoration,
  );

  const textUserExp: Phaser.GameObjects.Text = createTextData(
    scene,
    positionInfo.TEXT_X,
    positionInfo.TEXT_Y + 100,
    `${USER_PROFILE_INFO.exp} ${user.exp.toString()}`,
    textDecoration,
  );
  
  const userCountCards = await getUserCounCards();
  const textUserCards: Phaser.GameObjects.Text = createTextData(
    scene,
    positionInfo.TEXT_X,
    positionInfo.TEXT_Y + 150,
    `${USER_PROFILE_INFO.cards} ${userCountCards.toString()} шт.`,
    textDecoration,
  );
  console.log('deckId=', user.cur_user_deck_id);
  const userCurrDeck = await getUserCurrDeck(user.cur_user_deck_id);
  console.log('deck', userCurrDeck);
  const userInfoBLock = [userInfoBgr, textUserName, textUserLevel, textUserExp, textUserCards];
  const userInfoContainer: Phaser.GameObjects.Container = scene.add.container(0, 0, userInfoBLock);
};

export const create = (scene: Phaser.Scene): void => {
  const positionMenu = {
    X: scene.cameras.main.width - 180,
    Y: 20,
  };
  setBackground(scene, IMAGES.PROFILE_BACKGROUND.NAME);

  const menuButton = createButton(
    scene,
    positionMenu,
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
