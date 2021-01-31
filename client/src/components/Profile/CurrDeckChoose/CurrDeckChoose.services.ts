import { setBackground, createTextData } from '@/utils/utils';
import { ATLASES, IMAGES, MENU_IMAGES, AUDIO } from '@/components/Game/constant';
import { browserHistory } from '@/router/history';
import { createButton } from '@/components/Button/Button.services';
import { getUserDecks } from '@/components/Deck/Deck.services';
import { PROFILE_URL } from '@/router/constants';
import { getUserProfileInfo } from '@/components/Profile/Profile.services';
import {renderArrowButton} from '@/components/Button/Button.render';

import { AUDIO_CONFIG } from '@/constants/constants';
import {
  positionMenu,
  HEIGHT_OFFSET,
  BUTTON_SCALE,
  NAME_DECKS,
  decksContainerPosition,
  INFO_BLOCK_SCALE,
  INFO_BLOCK_X,
  CHOOSE_CURR_DECK,
  textDecoration,
  positionInfo,
  FIRST_PAGE,
  NUMBER_DECKS_ON_PAGE,
  DECKS_RIGHT,
  DECKS_LEFT,
  ONE_PAGE,
  MIN_POSSIBLE_PAGES,
  ARROW_BUTTON_RISE_SCALE,
  arrowButtonCurrDeck,
} from './constants';

import { renderContainer, renderDeck } from './CurrDeckChoose.render';
import { ICurrDeckChooseScene } from './CurrDeckChoose.model';

const createDecksContainer = async (scene: ICurrDeckChooseScene): Promise<void> => {
  const textUserName: Phaser.GameObjects.Text = createTextData(
    scene,
    positionInfo.TEXT_X,
    positionInfo.TEXT_Y,
    `${CHOOSE_CURR_DECK}`,
    textDecoration,
  );
  const { cur_user_deck_id: currUserDeckId } = await getUserProfileInfo();

  const userDecks = await getUserDecks();

  if (!userDecks) {
    throw new Error();
  }
  const totalPage = userDecks.length / NUMBER_DECKS_ON_PAGE;
  scene.setTotalPage(totalPage);

  const decksContainer = renderContainer(scene, NAME_DECKS, decksContainerPosition);
  scene.setDecksContainer(decksContainer);

  scene.setUserDecks(userDecks);
  renderArrowButtonCurrDeckChooseScene(scene, currUserDeckId);
  renderDeck(scene, userDecks, decksContainer, currUserDeckId);
  console.log('de=', decksContainer);
};

export const create = (scene: ICurrDeckChooseScene): void => {
  setBackground(scene, IMAGES.PROFILE_BACKGROUND.NAME);
  scene.setCurrentPage(FIRST_PAGE);
  const positionMenuCoords = {
    X: scene.cameras.main.width - positionMenu.OFFSET_X,
    Y: positionMenu.Y,
  };

  const menuButton = createButton(
    scene,
    positionMenuCoords,
    0,
    ATLASES.SETTINGS_ATLAS.NAME,
    MENU_IMAGES.MENU_SETTINGS,
    HEIGHT_OFFSET,
  );

  menuButton.on('pointerup', () => {
    browserHistory.push(PROFILE_URL);
  });

  menuButton.setScale(BUTTON_SCALE);

  const userInfoBgr = scene.add.image(
    INFO_BLOCK_X,
    scene.cameras.main.height / 2,
    IMAGES.SETTINGS_BLOCK_IMAGE.NAME,
  );

  userInfoBgr.setScale(INFO_BLOCK_SCALE).setScrollFactor(0);

  createDecksContainer(scene);
};

export const slideCurrDecksPage = (
  scene: ICurrDeckChooseScene,
  name: string,
  cur_user_deck_id: number,
): void => {
  const audio = scene.sound.add(AUDIO.PAGE_TURN_AUDIO.NAME, {
    volume: AUDIO_CONFIG.volume.button,
  });

  const cardsCurrent = scene.getUserDecks();
  const decksContainer = scene.getDecksContainer();
  const currentPage = scene.getCurrentPage();
  const totalPage = scene.getTotalPage();
  decksContainer.removeAll();

  if (name === DECKS_RIGHT) {
    if (currentPage < totalPage) {
      audio.play();
      scene.setCurrentPage(currentPage + ONE_PAGE);
    }
  } else if (name === DECKS_LEFT) {
    if (currentPage > MIN_POSSIBLE_PAGES) {
      audio.play();
      scene.setCurrentPage(currentPage - ONE_PAGE);
    }
  }

  renderDeck(scene, cardsCurrent, decksContainer, cur_user_deck_id);
};

export const renderArrowButtonCurrDeckChooseScene = (scene: ICurrDeckChooseScene, cur_user_deck_id:number): void => {
  arrowButtonCurrDeck.forEach(item => {
    const { NAME, IMG, POS_X, POS_Y } = item;
    const slideButton: Phaser.GameObjects.Sprite = scene.add.sprite(POS_X, POS_Y, IMG);
    renderArrowButton(slideButton, NAME);
    slideButton.on('pointerup', () => {
      slideButton.setScale(ARROW_BUTTON_RISE_SCALE, ARROW_BUTTON_RISE_SCALE);
      slideButton.clearTint();
      slideCurrDecksPage(scene, slideButton.name, cur_user_deck_id);
    });
  });
};