import { setBackground, createTextData } from '@/utils/utils';
import { getRequestInit, API_INFO_URLS } from '@/services/api.services';
import { ATLASES, IMAGES, MENU_IMAGES, AUDIO } from '@/components/Game/constant';
import { browserHistory } from '@/router/history';
import { createButton } from '@/components/Button/Button.services';
import {Deck} from '@/components/Deck/Deck.model';
import { getUserDeckById, setColoredDeck, getUserDecks } from '@/components/Deck/Deck.services';
import { createDeck, createDeckInfo, createDeckName } from '@/components/Deck/Deck.render';
import { positionDeckContainer } from '@/components/Deck/constants';
import { PROFILE_URL } from '@/router/constants';
import {getUserProfileInfo} from '@/components/Profile/Profile.services';
import { UserProfile } from '@/components/Profile/Profile.model';
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
} from './constants';
import {renderContainer, renderDeck} from './CurrDeckChoose.render';

const createDecksContainer = async (scene:Phaser.Scene): Promise<void> => {
   
  const textUserName: Phaser.GameObjects.Text = createTextData(
    scene,
    positionInfo.TEXT_X,
    positionInfo.TEXT_Y,
    `${CHOOSE_CURR_DECK}`,
    textDecoration,
  ); 
  const {cur_user_deck_id} = await getUserProfileInfo();

  const userDecks = await getUserDecks();
  console.log(userDecks);
  if (!userDecks) {
    throw new Error();
  } 
  
  const decksContainer = renderContainer(scene, NAME_DECKS, decksContainerPosition );
  // scene.setDecksContainer(decksContainer);
  
  /* const stateCardsOfDecks =  scene.getStateCardsOfDecks();
  stateCardsOfDecks.CURRENT_PAGE = FIRST_PAGE;  
  stateCardsOfDecks.DECKS_DATA = userDecks; */

  renderDeck(scene, userDecks, decksContainer, cur_user_deck_id);  
};
  
export const create = (scene: Phaser.Scene): void => {
  console.log('s');
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
  