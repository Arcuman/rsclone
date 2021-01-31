import { Card, cardModel } from './card.model';

const getAll = (): Promise<Card[]> => cardModel.getAll();
const getAllByUserId = (user_id: number): Promise<Card[]> => cardModel.getAllByUserId(user_id);
const getCardById = (id: number): Promise<Card> => cardModel.getCardById(id);
const getInitialCards = (count: number): Promise<Card[]> => cardModel.getInitialCards(count);
const getUnavailableCards = (user_id: number): Promise<Card[]> =>
  cardModel.getUnavailableCards(user_id);

const deleteCardById = async (id: number): Promise<number> => {
  const count = await cardModel.deleteCardById(id);
  return count;
};

const createCard = async (data: Card): Promise<number> => {
  const cardId = await cardModel.setCard(data);

  if (!cardId) {
    return 0;
  }
  return cardId;
};

const updateCardById = async (id: number, data: Card): Promise<Card> => {
  const card = await cardModel.updateCardById(id, data);
  return card;
};

const setUserCards = async (cards: Card[], userId: number): Promise<boolean> => {
  const notError = await cardModel.setUserCard(cards, userId);

  return notError;
};

function randomCard(min: number, max: number) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const getRandomCard = (cards: Card[]): Card => cards[randomCard(0, cards.length - 1)];

export const cardService = {
  getAll,
  getAllByUserId,
  getCardById,
  getInitialCards,
  createCard,
  setUserCards,
  updateCardById,
  deleteCardById,
  getUnavailableCards,
  getRandomCard,
};
