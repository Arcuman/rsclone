import { Deck } from '@/components/Deck/Deck.model';
import { getUserDeckById, getUserDecks } from '@/components/Deck/Deck.services';
import { Card } from '@/components/Card/Card.model';
import { renderArrowButton } from '@/components/MyCardsScene/Button/Button.render';
import { getUserCards } from '@/components/Card/Card.services';
import { makeDisableButton, makeEnableButton, clearDecksContainer } from '@/utils/utils';
import { AUDIO } from '@/components/Game/constant';
import { AUDIO_CONFIG} from '@/constants/constants';
import { IMyCardsScene } from './MyCards.model';
import { renderMyCards, renderDeck, renderContainer } from './MyCards.render';
import { createMenyButton, decksControlButton } from './Button/Button.render';
import {
  cardsPosition,
  decksPosition,
  cardsContainerPosition,
  decksContainerPosition,
  NAME_CARDS,
  NAME_DECKS,
  FIRST_PAGE,
  NUMBER_CARDS_ON_PAGE,
  DECKS_VIEW_DECK,
  DECKS_EDIT_DECK,
  CARDS_EDIT_DECK,
  positionWarningMessage,
  warningMessageText,
  WARNING_OUTLINE_COLOR,
  WARNING_OUTLINE_SIZE,
  WARNING_OUTLINE_DEPTH,
  WARNING_MAX_CARDS,
  WARNING_ADD_CARDS,
  WARNING_EMPTY,
} from './constants';

export const openDeck = async (scene: IMyCardsScene, userDeck: Deck): Promise<void> => {

  const userDeckId = userDeck.user_deck_id || 0;
  const userDeckData = await getUserDeckById(userDeckId);
  if (!userDeckData) {
    throw new Error();
  }

  scene.setNewDeck(userDeck);

  const cardsInSelectDeck = <Card[]>userDeckData.cards;

  scene.setNewCardsArray(cardsInSelectDeck);

  if (cardsInSelectDeck.length < 10) {
    const warningMessage = scene.getWarningMessage();
    warningMessage.text = WARNING_ADD_CARDS;
    setTimeout( () => {
      warningMessage.text = WARNING_EMPTY;
    }, 5000);
  }

  const stateCardsOfDecks = scene.getStateCardsOfDecks();
  stateCardsOfDecks.CARDS_DATA = cardsInSelectDeck;
  stateCardsOfDecks.CURRENT_PAGE = FIRST_PAGE;

  const totalPage = cardsInSelectDeck.length / NUMBER_CARDS_ON_PAGE;
  stateCardsOfDecks.TOTAL_PAGE = totalPage;

  const arrowButtonSave = scene.getArrowButton();
  makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.CREATE_BUTTON);
  makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.DECKS_LEFT);
  if (cardsInSelectDeck.length === 10) {
    makeEnableButton(<Phaser.GameObjects.Image>arrowButtonSave.DONE_BUTTON);
  }
  if (FIRST_PAGE >= totalPage) {
    makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.DECKS_RIGHT);
  }
  scene.getstatusDecksPage();
  if (scene.getstatusDecksPage() === CARDS_EDIT_DECK) {
    makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.EDIT_BUTTON);
  }
  const decksContainer = clearDecksContainer(scene);
  renderMyCards(scene, NAME_DECKS, cardsInSelectDeck, decksPosition, decksContainer);
  
  const audio = scene.sound.add( AUDIO.DECK_CARDS_SHOW.NAME, {
    volume: AUDIO_CONFIG.volume.card,
  });
  audio.play();
};

export const renderDecksBlock = (scene: IMyCardsScene) : void => {

  const stateCardsOfDecks = scene.getStateCardsOfDecks();
  stateCardsOfDecks.CURRENT_PAGE = FIRST_PAGE;
  const userDecks = stateCardsOfDecks.DECKS_DATA;
  const totalPage = userDecks.length / NUMBER_CARDS_ON_PAGE;
  stateCardsOfDecks.TOTAL_PAGE = totalPage;

  const arrowButtonSave = scene.getArrowButton();
  makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.DECKS_LEFT);
  makeEnableButton(<Phaser.GameObjects.Image>arrowButtonSave.CREATE_BUTTON);

  if (scene.getstatusDecksPage() === DECKS_EDIT_DECK) {
    const audio = scene.sound.add( AUDIO.DECK_EDIT.NAME, {
      volume: AUDIO_CONFIG.volume.card,
    });
    audio.play();

    makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.EDIT_BUTTON);
    makeEnableButton(<Phaser.GameObjects.Image>arrowButtonSave.DONE_BUTTON);
  } else {
    makeEnableButton(<Phaser.GameObjects.Image>arrowButtonSave.EDIT_BUTTON);
    makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.DONE_BUTTON);
  }
  if (totalPage > FIRST_PAGE) {
    makeEnableButton(<Phaser.GameObjects.Image>arrowButtonSave.DECKS_RIGHT);
  } else {
    makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.DECKS_RIGHT);
  }

  const decksContainer = clearDecksContainer(scene);

  renderDeck(scene, userDecks, decksContainer);
};

export const controlCardsInfo = async (scene: IMyCardsScene): Promise<void> => {
  const userCards = await getUserCards();

  if (!userCards) {
    throw new Error();
  }

  scene.setUserCards(userCards);
  scene.setMyCardsCurrentPage(FIRST_PAGE);

  const totalPage = userCards.length / NUMBER_CARDS_ON_PAGE;
  scene.setMyCardsTotalPage(totalPage);

  const cardsContainer = renderContainer(scene, NAME_CARDS, cardsContainerPosition);
  scene.setMyCardsContainer(cardsContainer);

  const arrowButtonSave = scene.getArrowButton();
  makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.CARDS_LEFT);
  if (totalPage <= FIRST_PAGE) {
    makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.CARDS_RIGHT);
  }

  renderMyCards(scene, NAME_CARDS, userCards, cardsPosition, cardsContainer);
};

export const controlDeckInfo = async (scene: IMyCardsScene): Promise<void> => {
  const userDecks = await getUserDecks();

  if (!userDecks) {
    throw new Error();
  }

  const decksContainer = renderContainer(scene, NAME_DECKS, decksContainerPosition);
  scene.setDecksContainer(decksContainer);

  const stateCardsOfDecks = scene.getStateCardsOfDecks();
  stateCardsOfDecks.DECKS_DATA = userDecks;

  renderDecksBlock(scene);
};

export const editCardsInDeck = (scene: IMyCardsScene): void => {
  const audio = scene.sound.add( AUDIO.DECK_EDIT.NAME, {
    volume: AUDIO_CONFIG.volume.card,
  });
  audio.play();

  const arrowButtonSave = scene.getArrowButton();
  makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.EDIT_BUTTON);

  const stateCardsOfDecks = scene.getStateCardsOfDecks();
  const cardsInSelectDeck = stateCardsOfDecks.CARDS_DATA;
  scene.setNewCardsArray(cardsInSelectDeck);

  const decksContainer = clearDecksContainer(scene);

  renderMyCards(scene, NAME_DECKS, cardsInSelectDeck, decksPosition, decksContainer);
};

export const deleteCardFromDeck = (scene: IMyCardsScene, idCard: number): void => {
  const newCards = scene.getNewCardsArray();
  const changeNewCards = newCards.filter(item => item.id !== idCard);
  scene.setNewCardsArray(changeNewCards);

  if (newCards.length < 10) {
    const arrowButtonSave = scene.getArrowButton();
    makeDisableButton(<Phaser.GameObjects.Image>arrowButtonSave.DONE_BUTTON);
  }
  
  const decksContainer = clearDecksContainer(scene);

  renderMyCards(scene, NAME_DECKS, changeNewCards, decksPosition, decksContainer);
};

export const addCardInDeck = (
  scene: IMyCardsScene,
  cardContainer: Phaser.GameObjects.Container,
): void => {

  if (scene.getstatusDecksPage() === CARDS_EDIT_DECK && !scene.getCurrentPageDecks()) {
    const cardName = cardContainer.name;
    const userCards = scene.getUserCards();
    const card = <Card>userCards.find(item => item.name === cardName);
    card.id = card.card_id!;
    const newCards = scene.getNewCardsArray();
    const warningMessage = scene.getWarningMessage();

    if (newCards.length < 10) {
      const haveCard = newCards.find(item => item.id === card.id);

      if (!haveCard) {
        newCards.push(card);

        const audio = scene.sound.add( AUDIO.CARD_DROP_AUDIO.NAME, {
          volume: AUDIO_CONFIG.volume.card,
        });
        audio.play();
         
      } else {
        warningMessage.text = 'Такая карта уже есть в колоде. \n  Выберите другую карту.';
        setTimeout( () => {
          warningMessage.text = WARNING_EMPTY;
        }, 3000);
      }
    } else {
      warningMessage.text = WARNING_MAX_CARDS;
      setTimeout( () => {
        warningMessage.text = WARNING_EMPTY;
      }, 3000);
    }

    if (newCards.length === 10) {
      const arrowButtonSave = scene.getArrowButton();
      makeEnableButton(<Phaser.GameObjects.Image>arrowButtonSave.DONE_BUTTON);
    }
  
    const decksContainer = clearDecksContainer(scene);

    renderMyCards(scene, NAME_DECKS, newCards, decksPosition, decksContainer);
  }
};

const createWarningMessageBlock = (scene: IMyCardsScene): void => {
  const {TEXT_X, TEXT_Y} = positionWarningMessage;

  const warningMessage = scene.add.text(
    TEXT_X,
    TEXT_Y,
    WARNING_EMPTY,
    warningMessageText,
  );

  warningMessage.setStroke(WARNING_OUTLINE_COLOR, WARNING_OUTLINE_SIZE);
  warningMessage.depth = WARNING_OUTLINE_DEPTH;

  scene.setWarningMessage(warningMessage);
};

export const create = (scene: IMyCardsScene, cardsBgAudio: Phaser.Sound.BaseSound): void => {
  renderArrowButton(scene);
  createMenyButton(scene, cardsBgAudio);
  decksControlButton(scene);
  controlCardsInfo(scene);
  controlDeckInfo(scene);
  createWarningMessageBlock(scene);
  scene.setCurrentPageDecks(true);
  scene.setstatusDecksPage(DECKS_VIEW_DECK);
};
