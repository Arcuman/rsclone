import { Card } from '@/resources/card/card.model';
import { db } from '../../../db';

export interface Deck {
  user_deck_id?: number;
  user_id: number;
  name: string;
  isinitial?: boolean;
  cards_count?: number;
  cards?: Card[];
}

const getAll = async (user_id: number): Promise<Deck[]> => {
  let decks;

  try {
    const {
      rows,
    } = await db.query(
      'Select "UserDecks".*, count("UserDeckCards".user_deck_card_id) as cards_count ' +
        'From "UserDecks" JOIN "UserDeckCards" ' +
        'ON "UserDecks".user_deck_id = "UserDeckCards".user_deck_id ' +
        'Where "UserDecks".user_id=$1 group BY  "UserDecks".user_deck_id',
      [user_id.toString()],
    );
    decks = rows;
  } catch (error) {
    throw new Error('500');
  }
  return decks;
};

const getDeckById = async (id: number): Promise<Deck> => {
  let deck: Deck;

  try {
    ({
      rows: [deck],
    } = await db.query('Select * from "UserDecks" Where user_deck_id=$1', [id]));
  } catch (error) {
    throw new Error('500');
  }

  return deck;
};

const getDeckCards = async (deck_id: number): Promise<Card[]> => {
  let cards: Card[];
  try {
    ({
      rows: cards,
    } = await db.query(
      'Select "Cards".card_id as id,  "Cards".name, "Cards"."isActive", ' +
        '"Cards".health, "Cards".attack, "Cards"."manaCost", "Cards".image  ' +
        'From "UserDeckCards" JOIN "Cards" ' +
        'ON "UserDeckCards".card_id = "Cards".card_id ' +
        'Where "UserDeckCards".user_deck_id=$1',
      [deck_id],
    ));
  } catch (error) {
    throw new Error('500');
  }
  return cards;
};

const getDeckCardsIds = async (deck_id: number): Promise<number[]> => {
  let cardsIds: number[];
  try {
    ({
      rows: cardsIds,
    } = await db.query('Select card_id From "UserDeckCards" Where user_deck_id=$1', [deck_id]));
  } catch (error) {
    throw new Error('500');
  }
  return cardsIds;
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
  const isinitial = data.isinitial ? data.isinitial : false;
  try {
    const query =
      'INSERT INTO "UserDecks" (user_id, name, isinitial) VALUES ($1, $2, $3 ) RETURNING user_deck_id';
    ({
      rows: [deck],
    } = await db.query(query, [data.user_id.toString(), data.name, isinitial.toString()]));
    if (!deck) {
      return 0;
    }
  } catch (error) {
    throw new Error('500');
  }
  return deck.user_deck_id!;
};

const updateDeckById = async (id: number, data: Deck): Promise<Deck> => {
  let deck: Deck;
  try {
    const query = 'UPDATE "UserDecks" Set user_id=$2, name=$3 WHERE user_deck_id=$1  RETURNING *';
    ({
      rows: [deck],
    } = await db.query(query, [id.toString(), data.user_id.toString(), data.name]));
  } catch (error) {
    throw new Error('500');
  }
  return deck;
};

const setDeckCards = async (deck_id: number, cards: Card[]): Promise<number> => {
  try {
    const cardsDecksPairs = cards
      .reduce((prev, curr) => `${prev}, (${curr.id}, ${deck_id})`, '')
      .slice(1);

    const query = `INSERT INTO "UserDeckCards" (card_id, user_deck_id) VALUES ${cardsDecksPairs}`;
    const { rowCount } = await db.query(query, []);
    return rowCount;
  } catch (error) {
    throw new Error('500');
  }
};

export const decksModel = {
  getAll,
  getDeckById,
  getDeckCards,
  getDeckCardsIds,
  setDeckInfo,
  updateDeckById,
  setDeckCards,
  deleteDeckById,
  deleteDeckCards,
};
