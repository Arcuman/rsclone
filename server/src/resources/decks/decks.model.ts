import {Card} from '@/resources/card/card.model';
import { use } from 'passport';
import { db } from '../../../db';

export interface Deck {
  user_deck_id: number;
  user_id: number;
  name: string;
  cards_count?:number;
  cards?:Card[];
}

const getAll = async (user_id:number): Promise<Deck[]> => {

  let decks;

  try {
    const  {rows} = await db.query('Select "UserDecks".*, count("UserDeckCards".user_deck_card_id) as cards_count '+
                                    'From "UserDecks" JOIN "UserDeckCards" '+ 
                                    'ON "UserDecks".user_deck_id = "UserDeckCards".user_deck_id '+
                                    'Where "UserDecks".user_id=$1 group BY  "UserDecks".user_deck_id', [user_id.toString()]); 
    decks = rows;
  } catch (error) {
    throw new Error('500');
  }
  return decks;
};

const getDeckById = async (id: number): Promise<Deck> => {
  let deck: Deck;
  console.log('id=', id);
  try {
    ({ rows: [deck] } = await db.query('Select * from "UserDecks" Where user_deck_id=$1', [id]));

  } catch (error) {
    throw new Error('500');
  }
  console.log('deck=', deck);
  return deck;
};

const getDeckCards = async (deck_id: number): Promise<Card[]> => {
  let cards: Card[];
  try {
    ({ rows: cards } = await db.query('Select "Cards".card_id as id, "Cards".name, "Cards"."isActive", '+
                                        '"Cards".health, "Cards".attack,"Cards".manacost as manaCost '+
                                      'From "UserDeckCards" JOIN "Cards" '+ 
                                      'ON "UserDeckCards".card_id = "Cards".card_id '+
                                      'Where "UserDeckCards".user_deck_id=$1 AND "Cards"."isActive"=true',
    [deck_id]));

  } catch (error) {
    throw new Error('500');

  }
  return cards;
};

const deleteDeckById = async (id: number): Promise<number> => {
  try {
    const { rowCount } = await db.query('DELETE FROM "UserDecks" WHERE user_deck_id=$1', [id]);
    return rowCount;
  } catch (error) {
    throw new Error('500');
  }
  return 0;
};

const deleteDeckCards = async (id: number): Promise<number> => {
  try {
    const { rowCount } = await db.query('DELETE FROM "UserDeckCards" WHERE user_deck_id=$1', [id]);
    return rowCount;
  } catch (error) {
    throw new Error('500');
  }
  return 0;
};

const setDeckInfo = async (data: Deck): Promise<number> => {
  let deck: Deck;
  try {
    const query = 'INSERT INTO "UserDecks" (user_id, name) VALUES ($1, $2 ) RETURNING user_deck_id';
    ({ rows: [deck] } = await db.query(query, [data.user_id.toString(), data.name]));

  } catch (error) {
    throw new Error('500');
  }
  return deck.user_deck_id;
};

const updateDeckById = async (id: number, data: Deck): Promise<Deck> => {
  let deck: Deck;
  try {
    const query = 'UPDATE "UserDecks" Set user_id=$2, name=$3 WHERE user_deck_id=$1  RETURNING *';
    ({ rows: [deck] } = await db.query(query, [id.toString(), data.user_id.toString(), data.name]));

  } catch (error) {
    throw new Error('500');
  }
  return deck;
};

/*
 to do diff deck cards
*/
const updateDeckCards = async (id: number, data: Deck): Promise<void> => {
};

export const decksModel = {
  getAll,
  getDeckById,
  getDeckCards,
  setDeckInfo,
  updateDeckById,
  deleteDeckById, 
  deleteDeckCards,
};
