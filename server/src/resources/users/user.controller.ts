import { myCrypt } from '@/helpers/myCrypt';
import { webToken } from '@/helpers/webToken';
import { MAX_CARDS_IN_DECK, INITIAL, INITIAL_LEVEL, INITIAL_EXP } from '@/constants/constants';
import { cardService } from '@/resources/card/card.controller';
import { decksService } from '@/resources/decks/decks.controller';
import { levelService } from '@/resources/level/level.controller';
import { Card } from '@/resources/card/card.model';
import statusCodes from './user.constants';
import { usersModel, User, Session, UserProfile, UpdatedUserLevelInfo } from './user.model';

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

  const level = await levelService.getLevelByLevelValue(INITIAL_LEVEL);

  const profile = {
    user_id: userId,
    nickName: name,
    level_id: level.level_id,
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

const getUserProfile = async (id: number): Promise<UserProfile> => {
  const userProfile: UserProfile = await usersModel.getUserProfile(id);
  return userProfile;
};

const setUser = async (userData: User): Promise<number> => {
  const user = await usersModel.getUserByLogin(userData.login);

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

const updateUserProfile = async (id: number, data: UserProfile): Promise<UserProfile> => {
  const profile = await getUserProfile(id);

  const newProfile = Object.entries(profile).reduce((prev, curr) => {
    if (curr[0] !== 'user_id' && data[curr[0]]) {
      return { ...prev, [curr[0]]: data[curr[0]] };
    }
    return { ...prev, [curr[0]]: curr[1] };
  }, {});

  return usersModel.updateUserProfile(id, <UserProfile>newProfile);
};

const updateDefaultDeck = async (user_id: number, deck_id: number): Promise<number> =>
  usersModel.updateDefaultDeck(user_id, deck_id);

const addNewCard = async (unavailableCards: Card[], user_id: number): Promise<Card | undefined> => {
  if (unavailableCards.length === 0) {
    return undefined;
  }
  const newCard = cardService.getRandomCard(unavailableCards);
  const isSetUserCards = await cardService.setUserCards([newCard], user_id);
  if (!isSetUserCards) {
    throw new Error(statusCodes[400].addCard);
  }
  return cardService.getCardById(newCard.id);
};

const updateUserExp = async (
  user_id: number,
  receivedExp: number,
): Promise<UpdatedUserLevelInfo> => {
  const user = await getUserProfile(user_id);
  const userLevel = await levelService.getLevelById(user.level_id);
  const newUserProfileData = { ...user };

  const res: UpdatedUserLevelInfo = {
    prevLevel: userLevel.level,
    newLevel: userLevel.level,
    prevExp: user.exp,
    curExp: user.exp,
    nextLevelExp: userLevel.exp_to_lvl,
    totalLevelExp: userLevel.exp_total,
  };

  if (user.exp + receivedExp >= userLevel.exp_total + userLevel.exp_to_lvl) {
    let newLevel = await levelService.getLevelByLevelValue(userLevel.level + 1);
    if (!newLevel) {
      newLevel = userLevel;
    }

    const unavailableCards = await cardService.getUnavailableCards(user_id);

    if (unavailableCards) {
      res.newCard = await addNewCard(unavailableCards, user_id);
    }
    newUserProfileData.level_id = newLevel.level_id;
    res.newLevel = newLevel.level;
    res.nextLevelExp = newLevel.exp_to_lvl;
    res.totalLevelExp = newLevel.exp_total;
  }

  newUserProfileData.exp += receivedExp;
  res.curExp = newUserProfileData.exp;
  await updateUserProfile(user.user_id, newUserProfileData);
  return res;
};

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
  updateUserExp,
};
