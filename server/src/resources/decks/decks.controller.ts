
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

const setDeckInfo =   (userData:Deck):number =>  0;

const updateDeckById =  (id:number, userData:Deck):number => 0;
/*
const setUser =  async (userData:Deck):Promise<number> =>  {
  const user = await decksModel.getUserByLogin(userData.login);
  if (user) {
    return 0;
  }
  const hash =  myCrypt.hashPassword(userData.password);
  const newUserData = {...userData, password:hash};
  return decksModel.setUser(newUserData);
};

const updateUserById = async (id:number, userData:Deck):Promise<Deck> => {
  const hash = myCrypt.hashPassword(userData.password);
  const newUserData = {...userData, password:hash};
  return decksModel.updateUserById(id, newUserData);
};

*/

export const decksService =   {
  getAll,
  getDeckById,
  getDeckByIdCards,
  setDeckInfo,
  updateDeckById,
  deleteDeckById, 
};

