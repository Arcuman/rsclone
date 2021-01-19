
import {Card} from '@/resources/card/card.model';
import {decksModel, Deck} from './decks.model';

const getAll = (user_id:number):Promise<Deck[]> =>  decksModel.getAll(user_id);
const getDeckById = (id:number):Promise<Deck> => decksModel.getDeckById(id);

const getDeckByIdCards = async (id:number):Promise<Deck> => {
  const deck:Deck = await decksModel.getDeckById(id);
  if (!deck){
    throw new Error('no deck');
  }
  
  deck.cards = await decksModel.getDeckCards(id);
  return deck;

};

const deleteDeckById =  async (id:number):Promise<number> => {
  await  decksModel.deleteDeckCards(id);
  const count = await decksModel.deleteDeckById(id); 
  return count;
};

const createDeck =   async (data:Deck):Promise<number> =>  {
  const deckId = await decksModel.setDeckInfo(data);
  
  if (!deckId) {
    return 0;
  }
  const cardsCount = await decksModel.setDeckCards(deckId, data.cards!);
  return cardsCount;
};

const updateDeckById =  async (id:number, data:Deck):Promise<number>=>{
  await decksModel.deleteDeckCards(id);
  await decksModel.updateDeckById(id, data);
  const cardsCount = await decksModel.setDeckCards(id, data.cards!);
  return cardsCount;
};

export const decksService =   {
  getAll,
  getDeckById,
  getDeckByIdCards,
  createDeck,
  updateDeckById,
  deleteDeckById, 
};

