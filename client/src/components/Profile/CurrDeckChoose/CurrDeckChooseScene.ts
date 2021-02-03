import { SCENES } from '@/components/Game/constant';
import Phaser from 'phaser';
import { Deck } from '@/components/Deck/Deck.model';
import { create } from './CurrDeckChoose.render';
import { ICurrDeckChooseScene, StateOfDecks } from './CurrDeckChoose.model';

export class CurrDeckChooseScene extends Phaser.Scene implements ICurrDeckChooseScene {
  private userDecks: Deck[] = [];

  private currentPage: number;

  private totalPage: number;

  private curUserDeckId: number;

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

  public getCurUserDeckId(): number {
    return this.curUserDeckId;
  }

  public setCurUserDeckId(value: number): void {
    this.curUserDeckId = value;
  }

  public getTotalPage(): number {
    return this.totalPage;
  }

  public setTotalPage(value: number): void {
    this.totalPage = value;
  }

  public getCurrentPage(): number {
    return this.currentPage;
  }

  public setCurrentPage(value: number): void {
    this.currentPage = value;
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

