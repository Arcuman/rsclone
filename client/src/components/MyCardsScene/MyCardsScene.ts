import Phaser from 'phaser';
import { IMAGES, SCENES } from '@/components/Game/constant';
import { setBackground } from '@/utils/utils';
import { Card } from '@/components/Card/Card.model';
import { create } from './MyCards.services';
import { IMyCardsScene } from './MyCards.model';

export class MyCardsScene extends Phaser.Scene implements IMyCardsScene {
  private userCards: Card[] = [];

  private currentPageMyCards: number;

  private myCardsContainer: Phaser.GameObjects.Container;

  private deksContainer: Phaser.GameObjects.Container;

  constructor() {
    super({
      key: SCENES.MY_CARDS,
      active: false,
      visible: false,
    });
  }

  public getUserCards(): Card[] {
    return this.userCards;
  }

  public setUserCards(value:Card[]): void {
    this.userCards= value;
  }

  public getMyCardsContainer(): Phaser.GameObjects.Container {
    return this.myCardsContainer;
  }

  public setMyCardsContainer( value: Phaser.GameObjects.Container ): void {
    this.myCardsContainer= value;
  }

  public getDeksContainer(): Phaser.GameObjects.Container {
    return this.deksContainer;
  }

  public setDeksContainer( value: Phaser.GameObjects.Container ): void {
    this.deksContainer= value;
  }

  create(): void {
    setBackground(this, IMAGES.MY_CARDS_BACKGROUND.NAME);
    create(this);
  }  
}
