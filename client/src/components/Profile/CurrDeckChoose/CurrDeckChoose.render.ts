import { AUDIO, ATLASES, IMAGES, MENU_IMAGES } from '@/components/Game/constant';
import Phaser from 'phaser';
import { Deck } from '@/components/Deck/Deck.model';
import { setColoredDeck, getUserDecks } from '@/components/Deck/Deck.services';
import { createDeck, createDeckName } from '@/components/Deck/Deck.render';
import { CardsContainerPosition } from '@/components/MyCardsScene/MyCards.model';
import { AUDIO_CONFIG } from '@/constants/constants';
import { setBackground, createTextData } from '@/utils/utils';
import { browserHistory } from '@/router/history';
import { createButton } from '@/components/Button/Button.services';
import { renderArrowButton } from '@/components/Button/Button.render';
import { PROFILE_URL } from '@/router/constants';
import { getUserProfileInfo } from '@/components/Profile/Profile.services';
import { ICurrDeckChooseScene } from './CurrDeckChoose.model';
import {
  positionDeckContainer,
  NUMBER_CARDS_IN_DECK,
  positionDeckName,
  TINT_VALUE,
  NUMBER_DECKS_ON_PAGE,
  offsetDeck,
  positionMenu,
  HEIGHT_OFFSET,
  BUTTON_SCALE,
  NAME_DECKS,
  decksContainerPosition,
  INFO_BLOCK_SCALE,
  INFO_BLOCK_X,
  FIRST_PAGE,
  DECKS_RIGHT,
  DECKS_LEFT,
  ONE_PAGE,
  MIN_POSSIBLE_PAGES,
  ARROW_BUTTON_RISE_SCALE,
  arrowButtonCurrDeck,
  textDecoration,
  positionInfo,
  CHOOSE_CURR_DECK,
} from './constants';
import { selectDeck } from './CurrDeckChoose.services';

const renderContainer = (
  scene: ICurrDeckChooseScene,
  name: string,
  containerPosition: CardsContainerPosition,
): Phaser.GameObjects.Container => {
  const { CONTAINER_X, CONTAINER_Y } = containerPosition;
  const cardContainer = scene.add.container(CONTAINER_X, CONTAINER_Y);

  return cardContainer;
};

const coloredTopCardSelectesDeck = (topCard: Phaser.GameObjects.Sprite): void => {
  topCard.setTint(TINT_VALUE);
  topCard.on('pointerout', () => {
    topCard.setTint(TINT_VALUE);
  });
};

const renderDeck = (
  scene: ICurrDeckChooseScene,
  userDecks: Deck[],
  decksContainer: Phaser.GameObjects.Container,
): void => {
  const { IMG_X, IMG_Y } = positionDeckContainer;
  const currUserDeckId = scene.getCurUserDeckId();
  const currentPage = scene.getCurrentPage();
  const decksOnOnePage: Deck[] = userDecks.filter((item, index) =>
    index >= NUMBER_DECKS_ON_PAGE * (currentPage - 1) && index < NUMBER_DECKS_ON_PAGE * currentPage
      ? item
      : '',
  );

  decksOnOnePage.forEach((item, index) => {
    let coord;
    if (index % 2 === 0) {
      coord = { IMG_X, IMG_Y: IMG_Y + offsetDeck.Y * (index / 2) };
    } else {
      coord = { IMG_X: IMG_X + offsetDeck.X, IMG_Y: IMG_Y + offsetDeck.Y * ((index - 1) / 2) };
    }
    const userDeck = createDeck(scene, coord, NUMBER_CARDS_IN_DECK);
    const lastCardInDeck = userDeck.last;
    const topCard = <Phaser.GameObjects.Sprite>lastCardInDeck;
    setColoredDeck(scene, topCard);

    if (currUserDeckId === item.user_deck_id) {
      coloredTopCardSelectesDeck(topCard);
    }

    topCard.on('pointerup', async () => {
      const audio = scene.sound.add(AUDIO.DECK_PRESS_AUDIO.NAME, {
        volume: AUDIO_CONFIG.volume.card,
      });
      audio.play();
      await selectDeck(scene, item, topCard, decksContainer);
    });

    const userDeckName = createDeckName(scene, item, positionDeckName);

    decksContainer.add(userDeck);
    userDeck.add(userDeckName);
  });
};

const slideCurrDecksPage = (scene: ICurrDeckChooseScene, name: string): void => {
  const audio = scene.sound.add(AUDIO.PAGE_TURN_AUDIO.NAME, {
    volume: AUDIO_CONFIG.volume.button,
  });

  const cardsCurrent = scene.getUserDecks();  
  const currentPage = scene.getCurrentPage();
  const totalPage = scene.getTotalPage();

  const decksContainerOld = scene.getDecksContainer();
  decksContainerOld.destroy();
  const decksContainer = renderContainer(scene, NAME_DECKS, decksContainerPosition);
  scene.setDecksContainer(decksContainer);
  
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

  renderDeck(scene, cardsCurrent, decksContainer);
};

const renderArrowButtonCurrDeckChooseScene = (scene: ICurrDeckChooseScene): void => {
  arrowButtonCurrDeck.forEach(item => {
    const { NAME, IMG, POS_X, POS_Y } = item;
    const slideButton: Phaser.GameObjects.Sprite = scene.add.sprite(POS_X, POS_Y, IMG);
    renderArrowButton(slideButton, NAME);
    slideButton.on('pointerup', () => {
      slideButton.setScale(ARROW_BUTTON_RISE_SCALE, ARROW_BUTTON_RISE_SCALE);
      slideButton.clearTint();
      slideCurrDecksPage(scene, slideButton.name);
    });
  });
};

const createDecksContainer = async (scene: ICurrDeckChooseScene): Promise<void> => {
  createTextData(
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
  scene.setCurUserDeckId(currUserDeckId);

  renderArrowButtonCurrDeckChooseScene(scene);
  renderDeck(scene, userDecks, decksContainer);
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

