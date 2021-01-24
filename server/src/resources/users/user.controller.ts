import { myCrypt } from '@/helpers/myCrypt';
import { webToken } from '@/helpers/webToken';
import { MAX_CARDS_IN_DECK, INITIAL, INITIAL_LEVEL, INITIAL_EXP } from '@/constants/constants';
import { cardService } from '@/resources/card/card.controller';
import { decksService } from '@/resources/decks/decks.controller';
import statusCodes from './user.constants';
import { usersModel, User, Session, UserProfile } from './user.model';

const createInitialUserData = async (userId: number, name: string): Promise<void> => {
  const initialCards = await cardService.getInitialCards(MAX_CARDS_IN_DECK);

  if (!initialCards.length) {
    throw new Error(statusCodes[404].initialCards);
  }

  const isSetUserCards = await cardService.setUserCards(initialCards, userId);

  if (!isSetUserCards) {
    throw new Error(statusCodes[400].initialCards);
  }

  const initialDeck = {
    user_id: userId,
    name: INITIAL,
    isinitial: true,
    cards: initialCards,
  };

  const deckId = await decksService.createDeck(initialDeck);

  if (!deckId) {
    throw new Error(statusCodes[400].initialDeck);
  }
  
  const profile = {
    user_id: userId,
    nickName: name,
    level: INITIAL_LEVEL,
    exp: INITIAL_EXP,
    cur_user_deck_id: deckId,
  };

  const rowCount = await usersModel.setUserProfile(profile);
  if (!rowCount) {
    throw new Error(statusCodes[400].initialProfile);
  }
};

const getAll = (): Promise<User[]> => usersModel.getAll();
export const getUserById = (id: number): Promise<User> => usersModel.getUserById(id);
const getUserByLogin = (login: string): Promise<User> => usersModel.getUserByLogin(login);
const getDefaultDeckId = (id: number): Promise<number> => usersModel.getDefaultDeckId(id);

const getUserProfile = (id: number): Promise<UserProfile> => usersModel.getUserProfile(id);

const setUser = async (userData: User): Promise<number> => {
  const user =await usersModel.getUserByLogin(userData.login);
  
  if (user || !userData.password) {
    return 0;
  }
  
  const hash = myCrypt.hashPassword(userData.password);
  const newUserData = { ...userData, password: hash };
  const userId = await usersModel.setUser(newUserData);
  
  createInitialUserData(userId, newUserData.name);
  
  return userId;
};

const updateUserById = async (id: number, userData: User): Promise<User> => {
  if (!userData.password) {
    throw new Error();
  }
  const hash = myCrypt.hashPassword(userData.password);
  const newUserData = { ...userData, password: hash };
  return usersModel.updateUserById(id, newUserData);
};

const updateUserProfile = async (id: number, data: UserProfile): Promise<UserProfile> =>
  usersModel.updateUserProfile(id, data);

const updateDefaultDeck = async (user_id: number, deck_id: number): Promise<number> =>
  usersModel.updateDefaultDeck(user_id, deck_id);

const deleteUserById = (id: number): Promise<number> => usersModel.deleteUserById(id);

const checkUserAuth = async (login: string, password: string): Promise<User | null> => {
  const user = await usersModel.getUserByLogin(login);

  if (!user || !user.password) {
    return null;
  }
  const isCheck = myCrypt.checkPassword(password, user.password);

  return isCheck ? user : null;
};

const findOneByToken = async (token: string): Promise<User> => {
  const userId = webToken.getDataFromToken(token);
  const user = await getUserById(userId);
  return user;
};

const getSessionByRefreshToken = (token: string): Promise<Session> =>
  usersModel.getSessionByRefreshToken(token);
const deleteSessionByRefreshToken = (token: string): Promise<number> =>
  usersModel.deleteSessionByRefreshToken(token);
const deleteSessionByUserId = (id: number): Promise<number> => usersModel.deleteSessionByUserId(id);

const addRefreshSession = async (newRefreshSession: Session): Promise<string> =>
  usersModel.addRefreshSession(newRefreshSession);

export const usersService = {
  getAll,
  getUserById,
  getUserByLogin,
  getUserProfile,
  setUser,
  updateUserById,
  updateUserProfile,
  updateDefaultDeck,
  deleteUserById,
  checkUserAuth,
  findOneByToken,
  getSessionByRefreshToken,
  deleteSessionByRefreshToken,
  deleteSessionByUserId,
  addRefreshSession,
  getDefaultDeckId,
};
