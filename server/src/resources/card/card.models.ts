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

