import { SCENES, AUDIO } from '@/components/Game/constant';
import Phaser from 'phaser';
import { Deck } from '@/components/Deck/Deck.model';
import { setColoredDeck } from '@/components/Deck/Deck.services';
import { createDeck, createDeckName } from '@/components/Deck/Deck.render';
import { CardsContainerPosition } from '@/components/MyCardsScene/MyCards.model';
import { changeCurrUserDeck } from '@/components/Profile/Profile.services';
import { AUDIO_CONFIG } from '@/constants/constants';
import { create } from './CurrDeckChoose.services';
import {
  positionDeckContainer,
  NUMBER_CARDS_IN_DECK,
  positionDeckName,
  TINT_VALUE,
  NUMBER_DECKS_ON_PAGE,
} from './constants';
import { ICurrDeckChooseScene, StateOfDecks } from './CurrDeckChoose.model';

export class CurrDeckChooseScene extends Phaser.Scene implements ICurrDeckChooseScene {
  private userDecks: Deck[] = [];

  private currentPage: number;

  private totalPage: number;

  private decksContainer: Phaser.GameObjects.Container;

  private stateCardsOfDecks: StateOfDecks = {
    DECKS_DATA: [],
    CURRENT_PAGE: 1,
    TOTAL_PAGE: 1,
  };

  constructor() {
    super({
      key: SCENES.CHOOSE_DECK,
      active: false,
      visible: false,
    });
  }

  public getUserDecks(): Deck[] {
    return this.userDecks;
  }

  public setUserDecks(value: Deck[]): void {
    this.userDecks = value;
  }

  public getDecksContainer(): Phaser.GameObjects.Container {
    return this.decksContainer;
  }

  public setDecksContainer(value: Phaser.GameObjects.Container): void {
    this.decksContainer = value;
  }

  public getCurrentPage(): number {
    return this.currentPage;
  }

  public setCurrentPage(value: number): void {
    this.currentPage = value;
  }

  public getTotalPage(): number {
    return this.totalPage;
  }

  public setTotalPage(value: number): void {
    this.totalPage = value;
  }

  public getStateOfDecks(): StateOfDecks {
    return this.stateCardsOfDecks;
  }

  public setStateOfDecks(value: StateOfDecks): void {
    this.stateCardsOfDecks = value;
  }

  create(): void {
    create(this);

  }
}

export const renderContainer = (
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

const selectDeck = async (
  scene: Phaser.Scene,
  item: Deck,
  topCard: Phaser.GameObjects.Sprite,
  decksContainer: Phaser.GameObjects.Container,
): Promise<void> => {
  const isUpdate = await changeCurrUserDeck(item.user_deck_id);

  if (isUpdate) {
    decksContainer.list.forEach((deck: Phaser.GameObjects.Container) => {
      if (deck.list.length > 1) {
        const topCardItem = <Phaser.GameObjects.Sprite>deck.list[deck.list.length - 2];
        topCardItem.clearTint();
        topCardItem.on('pointerout', () => {
          topCardItem.clearTint();
        });
      }
    });
    setColoredDeck(scene, topCard);
    topCard.setTint(TINT_VALUE);
    topCard.on('pointerout', () => {
      topCard.setTint(TINT_VALUE);
    });
  }
};

export const renderDeck = (
  scene: ICurrDeckChooseScene,
  userDecks: Deck[],
  decksContainer: Phaser.GameObjects.Container,
  cur_user_deck_id: number,
): void => {
  const { IMG_X, IMG_Y } = positionDeckContainer;

  const currentPage = scene.getCurrentPage();
  console.log('d', userDecks);

  const decksOnOnePage: Deck[] = userDecks.filter((item, index) => {
    console.log(`c=${  currentPage  } i=${  index}`);
    return index >= NUMBER_DECKS_ON_PAGE * (currentPage - 1) &&
      index < NUMBER_DECKS_ON_PAGE * currentPage
      ? item
      : '';
  });
  console.log('d2', decksOnOnePage);
  decksOnOnePage.forEach((item, index) => {
    let coord;
    if (index % 2 === 0) {
      coord = { IMG_X, IMG_Y: IMG_Y + 180 * (index / 2) };
    } else {
      coord = { IMG_X: IMG_X + 150, IMG_Y: IMG_Y + 180 * ((index - 1) / 2) };
    }
    const userDeck = createDeck(scene, coord, NUMBER_CARDS_IN_DECK);
    const lastCardInDeck = userDeck.last;
    const topCard = <Phaser.GameObjects.Sprite>lastCardInDeck;
    setColoredDeck(scene, topCard);

    if (cur_user_deck_id === item.user_deck_id) {
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
