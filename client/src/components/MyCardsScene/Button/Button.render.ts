import { IMyCardsScene } from '@/components/MyCardsScene/MyCards.model';
import { deleteCardFromDeck } from '@/components/MyCardsScene/MyCards.services';
import { browserHistory } from '@/router/history';
import { createButton } from '@/components/Button/Button.services';
import { MENU_URL } from '@/router/constants';
import { ATLASES, MENU_IMAGES } from '@/components/Game/constant';
import { createTextData } from '@/utils/utils';
import { CURSOR_POINTER } from '@/constants/constants';
import { ButtonSettings } from './Button.model';
import { slidePage, choiceAction } from './Button.services';
import { 
  arrowButton,   
  decksControlButtonData,
  promptDecoration,
  arrowButtonSettings,
  deleteButtonSettings,
  controlButtonSettings,
  deleteButtonPosition,
  CARDS_LEFT,
  CARDS_RIGHT,
  DECKS_LEFT,
  DECKS_RIGHT,
  CREATE_BUTTON,
  EDIT_BUTTON,
  DONE_BUTTON,
} from './constants';

export const setInteractiveOnButton = (
  buttonSettings: ButtonSettings,
  button: Phaser.GameObjects.Image,
  promptText?: Phaser.GameObjects.Text,
): void => {
  const {NORMAL_SCALE, RISE_SCALE, TINT_CLICK} = buttonSettings;
  const promptTextVisible = <Phaser.GameObjects.Text>promptText;

  button.setInteractive({ cursor: CURSOR_POINTER });
  
  button.on('pointerover', () => {
    button.setScale(RISE_SCALE);
    if (promptText) {
      promptTextVisible.visible = true;
    }
  });
  button.on('pointerout', () => {
    button.setScale(NORMAL_SCALE);
    if (promptText) {
      promptTextVisible.visible = false;
    }
  });
  button.on('pointerdown', () => {
    button.setScale(NORMAL_SCALE);
    button.setTint(TINT_CLICK);
  });
};

export const renderArrowButton = (
  scene: IMyCardsScene,
): void => {
  const arrowButtonSave = scene.getArrowButton();
  arrowButton.forEach(item => {
    const { NAME, IMG, POS_X, POS_Y } = item;
    const { NORMAL_SCALE } = arrowButtonSettings;
    const slideButton: Phaser.GameObjects.Image = scene.add.image(POS_X, POS_Y, IMG);
    slideButton.setName(NAME);
    slideButton.setScale(NORMAL_SCALE);
    
    setInteractiveOnButton(arrowButtonSettings, slideButton);

    if (NAME === CARDS_LEFT) {
      arrowButtonSave.CARDS_LEFT = slideButton;
    } else if (NAME === CARDS_RIGHT) {
      arrowButtonSave.CARDS_RIGHT = slideButton;
    } else if (NAME === DECKS_LEFT) {
      arrowButtonSave.DECKS_LEFT = slideButton;
    } else if (NAME === DECKS_RIGHT) {
      arrowButtonSave.DECKS_RIGHT = slideButton;
    }

    slideButton.on('pointerup', () => {    
      slideButton.setScale(NORMAL_SCALE);
      slideButton.clearTint();     
      slidePage(scene, slideButton.name);
    });
  });
};

export const createDeleteButton = (scene: IMyCardsScene, idCard: number): Phaser.GameObjects.Image => {
  const { IMG, POS_X, POS_Y} = deleteButtonPosition;
  const deleteButton = scene.add.image(POS_X, POS_Y, IMG); 
  const { NORMAL_SCALE } = deleteButtonSettings;

  deleteButton.setScale(NORMAL_SCALE);

  setInteractiveOnButton(deleteButtonSettings, deleteButton);
  
  deleteButton.on('pointerup', () => {
    deleteButton.setScale(NORMAL_SCALE);
    deleteButton.clearTint();
    deleteCardFromDeck(scene, idCard);    
  });
  return deleteButton;
};

export const decksControlButton = ( scene: IMyCardsScene): void => {
  decksControlButtonData.forEach(item => {
    const {NAME, IMG, PROMPT, POS_X, POS_Y, PROMPT_X, PROMPT_Y } = item;
    const { NORMAL_SCALE } = controlButtonSettings;
    const arrowButtonSave = scene.getArrowButton();
    const slideButton: Phaser.GameObjects.Sprite = scene.add.sprite(POS_X, POS_Y, IMG);
    slideButton.setName(NAME);
    slideButton.setScale(NORMAL_SCALE);
    const textName: Phaser.GameObjects.Text = createTextData(
      scene,
      PROMPT_X,
      PROMPT_Y,
      PROMPT,
      promptDecoration,
    );
    textName.visible = false;

    setInteractiveOnButton(controlButtonSettings, slideButton, textName);
    
    if (NAME === CREATE_BUTTON) {
      arrowButtonSave.CREATE_BUTTON = slideButton;
    } else if (NAME === EDIT_BUTTON) {
      arrowButtonSave.EDIT_BUTTON = slideButton;
    } else if (NAME === DONE_BUTTON) {
      arrowButtonSave.DONE_BUTTON = slideButton;
    } 

    slideButton.on('pointerup', () => {    
      slideButton.setScale(NORMAL_SCALE);
      slideButton.clearTint();      
      choiceAction(scene, slideButton.name); 
    });
  });
};

export const createMenyButton = (
  scene: IMyCardsScene,
  cardsBgAudio: Phaser.Sound.BaseSound,
): void => {
  const positionMenu = {
    OFFSET_X: 650,
    Y: 140,
  };
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
    500,
  );
  menuButton.setScale(0.4);

  menuButton.on('pointerup', () => {
    cardsBgAudio.stop();
    browserHistory.push(MENU_URL);
  });
};
