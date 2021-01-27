import { createBaseCard } from '../Card/Card.render';
import { setScalableCardInContainer, getUserCards } from '../Card/Card.services';
import { AllCards } from './CardsInfo';
import { cardsPosition,
  decksPosition,
  cardsContainerPosition,
  decksContainerPosition,
  CARDS_POS_UP_Y,
  CARDS_POS_DOWN_Y,
  DECKS_OFFSET_Y,
  CARDS_SCALE,
  NUMBER_CARDS_IN_ROW,
  positionDeckName,
  positionDeckContainer,
} from './constants';
import { CardsPosition, CardsContainerPosition } from './MyCards.model';
import { Card } from '../Card/Card.model';
import { getUserDecks, setColoredDeck } from '../Deck/Deck.services';
import { createDeck, createDeckName } from '../Deck/Deck.render';
import { Deck } from '../Deck/Deck.model';
import { setClickableDeck } from './MyCards.services';

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

const renderContainer = (
  scene: Phaser.Scene,
  name: string,  
  containerPosition: CardsContainerPosition,  
):Phaser.GameObjects.Container => { 
  const {CONTAINER_X, CONTAINER_Y} = containerPosition;
  const cardContainer = scene.add.container(CONTAINER_X, CONTAINER_Y);

  return cardContainer;
};

const renderMyCards = (
  scene: Phaser.Scene,
  name: string,
  allCards: Card[],  
  cardsPositionInfo: CardsPosition,
  cardsContainer: Phaser.GameObjects.Container,
):void => { 
  allCards.forEach((item: Card, id:number) => {
    const posX = getPositionX(id, cardsPositionInfo);    
    const posY = getPositionY(id, name);
    const card = createBaseCard({
      scene,
      posX,
      posY,
      card: item,      
    });  
    card.setScale(CARDS_SCALE, CARDS_SCALE);
    cardsContainer.add(card);
    setScalableCardInContainer(scene, card, CARDS_SCALE, cardsContainer );        
  });
};

const renderDeck = (
  scene: Phaser.Scene, 
  userDecks: Deck[],
  decksContainer: Phaser.GameObjects.Container,
):void => { 
  userDecks.forEach(item => {
    const userDeck = createDeck(scene, positionDeckContainer, 5);
    const lastCardInDeck = userDeck.last;
    setColoredDeck(lastCardInDeck);

    setClickableDeck(scene, item, lastCardInDeck);
    const userDeckName = createDeckName(scene, item, positionDeckName);
  
    decksContainer.add(userDeck);
    userDeck.add(userDeckName);
  });
  
};

const getCardsInfo = async (scene: Phaser.Scene): Promise<void> => {
  const userCards = await getUserCards();
  if (!userCards) {
    throw new Error();
  }  
 
  const userDecks = await getUserDecks();
  if (!userDecks) {
    throw new Error();
  }
  
  const cardsContainer = renderContainer(scene, 'cards', cardsContainerPosition );
  renderMyCards(scene, 'cards', userCards, cardsPosition, cardsContainer);

  const decksContainer = renderContainer(scene, 'decks', decksContainerPosition );
  renderDeck(scene, userDecks, decksContainer);  
};

export const create = (scene: Phaser.Scene): void => {
  getCardsInfo(scene);
   
  // renderMyCards(scene, 'decks', AllCards, decksContainerPosition, decksPosition); 
};
