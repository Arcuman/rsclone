import { setBackground, createTextData } from '@/utils/utils';
import { getRequestInit, API_INFO_URLS } from '@/services/api.services';
import { ATLASES, IMAGES, MENU_IMAGES, AUDIO } from '@/components/Game/constant';
import { browserHistory } from '@/router/history';
import { createButton } from '@/components/Button/Button.services';
import { Deck } from '@/components/Deck/Deck.model';
import { getUserDeckById, setColoredDeck } from '@/components/Deck/Deck.services';
import { createDeck, createDeckInfo, createDeckName } from '@/components/Deck/Deck.render';
import { positionDeckContainer } from '@/components/Deck/constants';
import { MENU_URL, CURR_DECK_CHOOSE_URL } from '@/router/constants';
import { store } from '@/redux/store/rootStore';
import { StatusCodes } from 'http-status-codes';
import { countCards } from '@/components/Card/Card.services';
import { AUDIO_CONFIG, TINT_VALUE_CLICK, IS_MUTE_ON_LS_PARAM} from '@/constants/constants';
import { ImageState } from '@/types/types';
import {
  textDecoration,
  positionInfo,
  positionMenu,
  HEIGHT_OFFSET,
  USER_PROFILE_INFO,
  INFO_BLOCK_X,
  INFO_BLOCK_SCALE,
  positionDeckText,
  positionMute,
  BUTTON_SCALE,
  MUTE_BUTTON_SCALE,
} from './constants';

import { UserProfile, Level } from './Profile.model';

const getLevelInfo = async (levelId: number): Promise<Level> => {
  const requestInit = getRequestInit();

  const level = await fetch(`${API_INFO_URLS.level}/${levelId}`, requestInit)
    .then(
      (response): Promise<Level> => {
        if (response.status !== StatusCodes.OK) {
          throw new Error();
        }
        return response.json();
      },
    )
    .then((levelData: Level) => levelData)
    .catch(error => {
      throw new Error(error);
    });

  return level;
};

export const getUserProfileInfo = async (): Promise<UserProfile> => {
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
    .then(async (userProfileData: UserProfile) => {
      const levelInfo: Level = await getLevelInfo(userProfileData.level_id);
      return { ...userProfileData, level: levelInfo.level };
    })
    .catch(error => {
      throw new Error(error);
    });

  return user;
};

export const changeCurrUserDeck = async (newDeckId: number): Promise<boolean> => {
  const { user_id: userId } = store.getState().authUser;
  const requestInit = getRequestInit('PUT');
  requestInit.body = JSON.stringify({ cur_user_deck_id: newDeckId });

  const isUpdate = await fetch(`${API_INFO_URLS.users}/${userId}/profile`, requestInit)
    .then(
      (response): Promise<boolean> => {
        if (response.status !== StatusCodes.OK) {
          throw new Error();
        }
        return response.json();
      },
    )
    .catch(error => {
      throw new Error(error);
    });

  return isUpdate;
};

export const setClickableDeck = (
  scene: Phaser.Scene,
  userDeck: Deck,
  topCard: Phaser.GameObjects.Sprite,
): void => {
  topCard.setInteractive();
  topCard.on('pointerdown', () => {
    topCard.setTint(TINT_VALUE_CLICK);
  });
  topCard.on('pointerup', () => {
    const audio = scene.sound.add( AUDIO.DECK_PRESS_AUDIO.NAME, {
      volume: AUDIO_CONFIG.volume.card,
    });
    audio.play();

    topCard.clearTint();
    browserHistory.push(CURR_DECK_CHOOSE_URL);
  });
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

  const level = user.level ? user.level.toString() : '';
  const textUserLevel: Phaser.GameObjects.Text = createTextData(
    scene,
    positionInfo.TEXT_X,
    positionInfo.TEXT_Y + HEIGHT_OFFSET,
    `${USER_PROFILE_INFO.level} ${level}`,
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

  const userCurrDeck = createDeck(scene, positionDeckContainer);
  const lastCardInDeck = userCurrDeck.last;
  setColoredDeck(scene, <Phaser.GameObjects.Sprite>lastCardInDeck);
  setClickableDeck(scene, userCurrDeckInfo, <Phaser.GameObjects.Sprite>lastCardInDeck);
  const userCurrDeckName = createDeckName(scene, userCurrDeckInfo, positionDeckText);
  const userCurrDeckNumber = createDeckInfo(scene, userCurrDeckInfo);
  userCurrDeck.add(userCurrDeckName);
  userCurrDeck.add(userCurrDeckNumber);

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

const renderMuteButton = (scene: Phaser.Scene, isMuteOn:boolean): void =>{
  const positionMuteCoords = {
    X: scene.cameras.main.width - positionMute.OFFSET_X,
    Y: positionMute.Y,
  };
  let image:ImageState =  MENU_IMAGES.MUTE_OFF_BUTTON;
  if (isMuteOn){
    image = MENU_IMAGES.MUTE_ON_BUTTON;
  }
  const muteButton = createButton(
    scene,
    positionMuteCoords,
    0,
    ATLASES.MUTE_ON_ATLAS.NAME,
    image,
    HEIGHT_OFFSET,
  );
  muteButton.setScale(MUTE_BUTTON_SCALE);
  muteButton.on('pointerup', () => {
    // eslint-disable-next-line no-param-reassign
    scene.sound.mute=!isMuteOn;
    const userLogin = store.getState().authUser.login;
    localStorage.setItem(`${userLogin}_${IS_MUTE_ON_LS_PARAM}`, (!isMuteOn).toString());
    muteButton.destroy();
    renderMuteButton(scene, !isMuteOn);
  });
};

export const create = (scene: Phaser.Scene): void => {
  // eslint-disable-next-line no-param-reassign
  scene.sound.pauseOnBlur = false;
  const profileBgAudio = scene.sound.add(AUDIO.PROFILE_BG_AUDIO.NAME, {
    loop: true,
    volume: AUDIO_CONFIG.volume.bg,
  });
  profileBgAudio.play();
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
    profileBgAudio.stop();
    browserHistory.push(MENU_URL);
  });
  menuButton.setScale(BUTTON_SCALE);
  const userLogin = store.getState().authUser.login;
  const isMuteOn = localStorage.getItem(`${userLogin}_${IS_MUTE_ON_LS_PARAM}`) === 'true';
  renderMuteButton(scene, isMuteOn);

  createInfoContainer(scene);
};
