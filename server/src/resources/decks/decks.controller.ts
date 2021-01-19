
import {decksModel, Deck} from './decks.model';
import {usersService} from '@/resources/users/user.controller';

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

const getUserDefaultDeck = async (userId:number):Promise<Deck> => {
  const deckId = await usersService.getDefaultDeckId(userId);
  const deck:Deck = await decksModel.getDeckById(deckId);
  if (!deck){
    throw new Error('no deck');
  }
  
  deck.cards = await decksModel.getDeckCards(deckId);
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

const updateDefaultDeck =  async (deckId:number, userId:number):Promise<number>=>{
  const count = await usersService.updateDefaultDeck(userId, deckId);
  return count;
};

export const decksService =   {
  getAll,
  getDeckById,
  getDeckByIdCards,
  getUserDefaultDeck,
  createDeck,
  updateDeckById,
  updateDefaultDeck,
  deleteDeckById, 
};

