import { db } from '../../../db';

export interface Card {
  id: number;
  name: string;
  isActive: boolean;
  health: number;
  attack: number;
  manaCost: number;
  isinitial?: boolean;
  image?: string;
}
const getAll = async (): Promise<Card[]> => {
  let cards;

  try {
    const { rows } = await db.query('Select * From "Cards"', []);
    cards = rows;
  } catch (error) {
    throw new Error('500');
  }
  return cards;
};

const getAllByUserId = async (user_id: number): Promise<Card[]> => {
  let cards;

  try {
    const { rows } = await db.query(
      'Select "Cards".* ' +
        'From "UserCards" JOIN "Cards" ' +
        'ON "UserCards".card_id = "Cards".card_id ' +
        'Where "UserCards".user_id=$1',
      [user_id.toString()],
    );
    cards = rows;
  } catch (error) {
    throw new Error('500');
  }
  return cards;
};

const getCardById = async (id: number): Promise<Card> => {
  let card: Card;

  try {
    ({
      rows: [card],
    } = await db.query('Select * from "Cards"  Where card_id=$1', [id]));
  } catch (error) {
    throw new Error('500');
  }

  return card;
};

const getInitialCards = async (count: number): Promise<Card[]> => {
  let cards;

  try {
    const {
      rows,
    } = await db.query('Select *, card_id as id from "Cards" Where isinitial=true LIMIT $1 ', [
      count,
    ]);
    cards = rows;
  } catch (error) {
    throw new Error('500');
  }
  return cards;
};

const getUnavailableCards = async (user_id: number): Promise<Card[]> => {
  let cards;

  try {
    const {
      rows,
    } = await db.query(
      'select card_id as id from "Cards" EXCEPT  select card_id as id from "UserCards" where user_id = $1 ',
      [user_id],
    );
    cards = rows;
  } catch (error) {
    throw new Error('500');
  }
  return cards;
};

const deleteCardById = async (id: number): Promise<number> => {
  try {
    const { rowCount } = await db.query('DELETE FROM "Cards" WHERE card_id=$1', [id]);
    return rowCount;
  } catch (error) {
    throw new Error('500');
  }
};

const setCard = async (data: Card): Promise<number> => {
  let card: Card;
  const isinitial = data.isinitial || false;
  const image = data.image || '';

  try {
    const query =
      'INSERT INTO "Cards" ("isActive", name, attack, "manaCost", health, isinitial, image) ' +
      'VALUES ($1, $2,$3,$4,$5,$6,$7 ) RETURNING card_id as id';

    ({
      rows: [card],
    } = await db.query(query, [
      data.isActive.toString(),
      data.name,
      data.attack.toString(),
      data.manaCost.toString(),
      data.health.toString(),
      isinitial.toString(),
      image,
    ]));

    if (!card) {
      return 0;
    }
  } catch (error) {
    throw new Error('500');
  }
  return card.id;
};

const setUserCard = async (cards: Card[], user_id: number): Promise<boolean> => {
  const cardsUsersPairs = cards
    .reduce((prev, curr) => `${prev}, (${curr.id}, ${user_id})`, '')
    .slice(1);
  try {
    const query = `INSERT INTO "UserCards" (card_id, user_id)  VALUES ${cardsUsersPairs}`;
    const { rowCount } = await db.query(query, []);

    return rowCount > 0;
  } catch (error) {
    throw new Error('500');
  }
};

const updateCardById = async (id: number, data: Card): Promise<Card> => {
  let card: Card;
  const isinitial = data.isinitial || false;
  const image = data.image || '';

  try {
    const query =
      'UPDATE "Cards" Set "isActive"=$2, name=$3, attack=$4, "manaCost"=$5, health=$6, isinitial=$7, image=$8 ' +
      'WHERE card_id=$1  RETURNING *';

    ({
      rows: [card],
    } = await db.query(query, [
      id.toString(),
      data.isActive.toString(),
      data.name,
      data.attack.toString(),
      data.manaCost.toString(),
      data.health.toString(),
      isinitial.toString(),
      image,
    ]));
  } catch (error) {
    throw new Error('500');
  }
  return card;
};

export const cardModel = {
  getAll,
  getAllByUserId,
  getCardById,
  getInitialCards,
  setCard,
  setUserCard,
  updateCardById,
  deleteCardById,
  getUnavailableCards,
};
