// import {cardBase} from '../Card/Card.render';
// import {AllCards} from './CardsInfo';

export const create = (scene: Phaser.Scene): void => {

  const gameHeight = scene.game.config.height;
  const containerY: number = <number>gameHeight / 2;
 
  // const myDecksBgr: Phaser.GameObjects.Image = 
  scene.add.image(1050, containerY, 'my_decks_container');
  // const myCardsBgr: Phaser.GameObjects.Image = 
  scene.add.image(430, 250, 'my_cards_container');
  // const myCardsDecor: Phaser.GameObjects.Image = 
  scene.add.image(230, 580, 'my_cards_decor');
  // const cardContainer = 
  scene.add.container(430, 250);

  // AllCards.forEach((item, id) => {
  //  const {name, attack, manacost, health, effect, image_url} = item;
  //  const posX = id*30 + 10;
  //  const posY = id*40;
  //  const card = cardBase({
  //    scene,
  //    posX,
  //    posY,
  //    card: name,
  //    mana: manacost.toString(),
  //    attack: attack.toString(),
  //    health: health.toString(),
  //  });
  //  console.log('card', card);
  //  cardContainer.add(card);
  // });
};

// export const renderMyCards = (scene: Phaser.Scene, allCards):void => {
//  // console.log('allCards', allCards);
// };