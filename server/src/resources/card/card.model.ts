import { db } from '../../../db';

export interface Card{
  id: number;
  name: string;
  isActive: boolean;
  health: number;
  attack: number;
  manaCost: number;
}

export async function getUserDeckCards(userId: number) : Promise<Array<Card>> {
  const cards : Array<Card> = [];
  const { rows } = await db.query(
    'select "Cards".card_id, "isActive", name, attack, manacost, health \n' +
    'from "Cards" join (\n' +
    '"UserDeckCards" join "UserProfiles" on \n' +
    '"UserProfiles".cur_user_deck_id = "UserDeckCards".user_deck_id\n' +
    ')on "Cards".card_id = "UserDeckCards".card_id\n' +
    'where "UserProfiles".user_id = $1', [userId]);
  rows.forEach(({card_id, isActive, name, attack, manacost, health})=>{
    cards.push(
      {
        id: <number>card_id,
        isActive: <boolean>isActive,
        name : <string>name,
        health: <number>health,
        manaCost: <number>manacost,
        attack: <number>attack,
      });
  });
  return cards;
}



const getAll = async (): Promise<Card[]> => {
  let cards;

  try {
    const  {rows} = await db.query('Select * From "Cards" Where "isActive"=true', []); 
    cards = rows;
  } catch (error) {
    throw new Error('500');
  }
  return cards;
};


const getAllByUserId = async (user_id:number): Promise<Card[]> => {
  let cards;

  try {
    const  {rows} = await db.query('Select "Cards".* , "UserCards".user_card_id '+
                                    'From "UserCards" JOIN "Cards" '+ 
                                    'ON "UserCards".card_id = "Cards".card_id '+
                                    'Where "UserCards".user_id=$1 and "Cards"."isActive"=1', [user_id.toString()]); 
    cards = rows;
  } catch (error) {
    throw new Error('500');
  }
  return cards;
};

const getCardById = async (id: number): Promise<Card> => {
  let card: Card;

  try {
    ({ rows: [card] } = await db.query('Select * from "Cards" Where card_id=$1', [id]));

  } catch (error) {
    throw new Error('500');
  }

  return card;
};

const deleteCardById = async (id: number): Promise<number> => {
  try {
    const { rowCount } = await db.query('DELETE FROM "Cards" WHERE card_id=$1', [id]);
    return rowCount;
  } catch (error) {
    throw new Error('500');
  }
  return 0;
};


const setCard = async (data: Card): Promise<number> => {
  let card: Card;
  try {
    const query = 'INSERT INTO "Cards" (isActive, name, attack, manacost, health) VALUES ($1, $2,$3,$4,$5 ) RETURNING card_id as id';
    ({ rows: [card] } = await db.query(query, 
                                [data.isActive.toString(), data.name, data.attack.toString(),
                                  data.manaCost.toString(), data.health.toString()]));
    if (!card){
      return 0;
    }
  } catch (error) {
    throw new Error('500');
  }
  return card.id!;
};

const updateCardById = async (id: number, data: Card): Promise<Card> => {
  let card: Card;
  try {
    const query = 'UPDATE "UserDecks" Set isActive=$2, name=$3, attack=$4, manacost=$5, health=$6 WHERE card_id=$1  RETURNING *';
    ({ rows: [card] } = await db.query(query, [id.toString(), data.isActive.toString(), data.name, data.attack.toString(),
                                                data.manaCost.toString(), data.health.toString()]));

  } catch (error) {
    throw new Error('500');
  }
  return card;
};


export const cardModel = {
  getAll,
  getAllByUserId,
  getCardById,
  setCard,
  updateCardById,
  deleteCardById, 
  getUserDeckCards
};
