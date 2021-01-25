import {cardBase} from '../Card/Card.render';
import {AllCards} from './CardsInfo';
import {cardsPosition, decksPosition, cardsContainerPosition, decksContainerPosition, CARDS_POS_UP_Y, CARDS_POS_DOWN_Y, DECKS_OFFSET_Y, CARDS_SCALE, NUMBER_CARDS_IN_ROW } from './constants';
import {CardsPosition, CardsContainerPosition} from './MyCards.model';
import {Card} from '../Card/Card.model';

function getPositionY(index: number, name: string): number {
  const weightId = Math.floor(index/NUMBER_CARDS_IN_ROW);  
  let posY = 0;
  if (name === 'cards') {
    if (weightId === 0 || weightId === 2) {
      posY = CARDS_POS_UP_Y;
    } else {
      posY = CARDS_POS_DOWN_Y;
    }
  } else if (name === 'decks') {
    posY = weightId*DECKS_OFFSET_Y;
  }
  
  return posY;
}

function getPositionX(index: number, cardsPositionInfo: CardsPosition): number {
  const {OFFSET_X, EXTRA_OFFSET_X, REDUCE_ID_1, REDUCE_ID_2, REDUCE_ID_3 } = cardsPositionInfo;
  let posX;
  if (index <= 2) {    
    posX = index*OFFSET_X;
  } else if (index >= 3 && index <= 5) {   
    posX = (index-REDUCE_ID_1)*OFFSET_X;
  } else if (index >= 6 && index <= 8) {   
    posX = (index-REDUCE_ID_2)*OFFSET_X + EXTRA_OFFSET_X;
  } else {   
    posX = (index-REDUCE_ID_3)* OFFSET_X + EXTRA_OFFSET_X;
  }
  return posX;
}

const renderMyCards = (
  scene: Phaser.Scene,
  name: string,
  allCards: Card[],
  containerPosition: CardsContainerPosition,
  cardsPositionInfo: CardsPosition, 
):void => { 
  const {CONTAINER_X, CONTAINER_Y} = containerPosition;
  const cardContainer = scene.add.container(CONTAINER_X, CONTAINER_Y);

  allCards.forEach((item: Card, id:number) => {
    const posX = getPositionX(id, cardsPositionInfo);    
    const posY = getPositionY(id, name);
    const card = cardBase({
      scene,
      posX,
      posY,
      card: item,      
    });  
    card.setScale(CARDS_SCALE, CARDS_SCALE);
    cardContainer.add(card);
  });
};

export const create = (scene: Phaser.Scene): void => {
  renderMyCards(scene, 'cards', AllCards, cardsContainerPosition, cardsPosition);
  renderMyCards(scene, 'decks', AllCards, decksContainerPosition, decksPosition); 
};

