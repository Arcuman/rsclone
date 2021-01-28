import Phaser from 'phaser';
import { IMAGES, SCENES, AUDIO, ATLASES, MENU_IMAGES} from '@/components/Game/constant';
import { setBackground } from '@/utils/utils';
import { Card } from '@/components/Card/Card.model';
import { browserHistory } from '@/router/history';
import { createButton } from '@/components/Button/Button.services';
import { MENU_URL } from '@/router/constants';
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

  public setUserCards(value: Card[]): void {
    this.userCards = value;
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

  public createMenyButton(scene: IMyCardsScene, cardsBgAudio:Phaser.Sound.BaseSound): void {
    const positionMenu = {
      OFFSET_X: 180,
      Y: 20,
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
  
    menuButton.on('pointerup', () => {
      cardsBgAudio.stop();
      browserHistory.push(MENU_URL);
    });
  }
  
  create(): void {
    const cardsBgAudio = this.sound.add(AUDIO.MYCARDS_BG_AUDIO.NAME, { loop: true });
    cardsBgAudio.play();
    setBackground(this, IMAGES.MY_CARDS_BACKGROUND.NAME);
    this.createMenyButton(this, cardsBgAudio);
    create(this);
  }
}
