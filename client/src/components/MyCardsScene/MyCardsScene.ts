import Phaser from 'phaser';
import { IMAGES, SCENES } from '@/components/Game/constant';
import { setBackground } from '@/utils/utils';
// import {AllCards} from './CardsInfo';
import {create /* , renderMyCards */} from './MyCards.render';

export class MyCardsScene extends Phaser.Scene {
  private cards = []; // cards

  constructor() {
    super({
      key: SCENES.MY_CARDS,
      active: false,
      visible: false,
    });
  }

  create(): void {
    setBackground(this, IMAGES.LOAD_BACKGROUND.NAME);
    // this.cards = AllCards;
    create(this);
    // renderMyCards(this, this.cards);
  }
}
