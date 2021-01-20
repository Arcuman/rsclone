
import {usersService} from '@/resources/users/user.controller';
import { StatusCodes } from 'http-status-codes';
import {decksModel, Deck} from './decks.model';
import statusCodes from './decks.constants';

const isInitialDeck = async (id:number):Promise<boolean> =>{
  const deck = await decksModel.getDeckById(id);
  return deck.isinitial || false;  
};

const getAll = (user_id:number):Promise<Deck[]> =>  decksModel.getAll(user_id);
const getDeckById = (id:number):Promise<Deck> => decksModel.getDeckById(id);

const getDeckByIdCards = async (id:number):Promise<Deck> => {
  const deck:Deck = await decksModel.getDeckById(id);
  if (!deck){
    throw new Error(statusCodes[StatusCodes.NOT_FOUND]);
  }
  
  deck.cards = await decksModel.getDeckCards(id);
  return deck;

};

const getUserDefaultDeck = async (userId:number):Promise<Deck> => {
  const deckId = await usersService.getDefaultDeckId(userId);
  const deck:Deck = await decksModel.getDeckById(deckId);
  if (!deck){
    throw new Error(statusCodes[StatusCodes.NOT_FOUND]);
  }
  
  deck.cards = await decksModel.getDeckCards(deckId);
  return deck;

};

const deleteDeckById =  async (id:number):Promise<number> => {
  if (await isInitialDeck(id)){
    throw new Error(statusCodes[StatusCodes.BAD_REQUEST].initialDelete);
  }

  await  decksModel.deleteDeckCards(id);
  const count = await decksModel.deleteDeckById(id); 
  return count;
};

const createDeck =   async (data:Deck):Promise<number> =>  {
  const deckId = await decksModel.setDeckInfo(data);
  
  if (!deckId) {
    return 0;
  }
  
  await decksModel.setDeckCards(deckId, data.cards!);
  
  return deckId;
};

const updateDeckById =  async (id:number, data:Deck):Promise<Deck>=>{
  if (await isInitialDeck(id)){
    throw new Error(statusCodes[StatusCodes.BAD_REQUEST].initialUpdate);
  }

  await decksModel.deleteDeckCards(id);
  await decksModel.updateDeckById(id, data);
  const cardsCount = await decksModel.setDeckCards(id, data.cards!);
  
  return getDeckByIdCards(id);
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

