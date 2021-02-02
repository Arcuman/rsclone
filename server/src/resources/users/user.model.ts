import { Card } from '@/resources/card/card.model';
import { db } from '../../../db';

export interface User {
  user_id: number;
  login: string;
  name: string;
  password?: string;
}

export interface UserProfile {
  user_id: number;
  nickName: string;
  level_id: number;
  exp: number;
  cur_user_deck_id: number;
  countCards?: number;
}

export interface Session {
  refreshToken: string;
  user_id: number;
  ip: string;
  expiresIn: number;
}

export interface UpdatedUserLevelInfo {
  prevLevel: number;
  newLevel: number;
  prevExp: number;
  curExp: number;
  nextLevelExp: number;
  totalLevelExp: number;
  newCard?: Card;
}

const getAll = async (): Promise<User[]> => {
  let users;

  try {
    const { rows } = await db.query('Select user_id, login,name from "Users"', []);

    users = rows;
  } catch (error) {
    throw new Error('500');
  }
  return users;
};

const getUserById = async (id: number): Promise<User> => {
  let user: User;
  try {
    ({
      rows: [user],
    } = await db.query('Select user_id, login,name from "Users" Where user_id=$1', [id]));
  } catch (error) {
    throw new Error('500');
  }
  return user;
};

const getDefaultDeckId = async (id: number): Promise<number> => {
  let deckId: { cur_user_deck_id: number };
  try {
    ({
      rows: [deckId],
    } = await db.query('Select cur_user_deck_id from "UserProfiles" Where user_id=$1', [id]));
  } catch (error) {
    throw new Error('500');
  }
  return deckId.cur_user_deck_id;
};

const getUserProfile = async (id: number): Promise<UserProfile> => {
  let profile: UserProfile;
  try {
    ({
      rows: [profile],
    } = await db.query('Select *  from "UserProfiles" Where user_id=$1', [id]));
  } catch (error) {
    throw new Error('500');
  }
  return profile;
};

const setUser = async (userData: User): Promise<number> => {
  let user: User;

  try {
    const query =
      'INSERT INTO "Users" (login, name, password) VALUES ($1, $2, $3 ) RETURNING user_id';
    ({
      rows: [user],
    } = await db.query(query, [userData.login, userData.name, userData.password!]));
  } catch (error) {
    throw new Error('500');
  }
  return user.user_id;
};

const setUserProfile = async (data: UserProfile): Promise<number> => {
  try {
    const query =
      'INSERT INTO "UserProfiles" (user_id, "nickName", level_id, exp, cur_user_deck_id) ' +
      'VALUES ($1, $2, $3, $4, $5) ';

    const { rowCount } = await db.query(query, [
      data.user_id.toString(),
      data.nickName,
      data.level_id.toString(),
      data.exp.toString(),
      data.cur_user_deck_id.toString(),
    ]);
    return rowCount;
  } catch (error) {
    throw new Error('500');
  }
};

const updateUserById = async (id: number, userData: User): Promise<User> => {
  let user: User;
  try {
    const query =
      'UPDATE "Users" Set login=$2, name=$3, password= $4 WHERE user_id=$1  RETURNING *';
    ({
      rows: [user],
    } = await db.query(query, [id.toString(), userData.login, userData.name, userData.password!]));
  } catch (error) {
    throw new Error('500');
  }
  return user;
};

const updateUserProfile = async (id: number, data: UserProfile): Promise<UserProfile> => {
  let profile: UserProfile;

  try {
    const query =
      'UPDATE "UserProfiles" Set "nickName"=$2, level_id=$3, exp=$4, cur_user_deck_id=$5  ' +
      'WHERE user_id=$1  RETURNING *';

    ({
      rows: [profile],
    } = await db.query(query, [
      id.toString(),
      data.nickName,
      data.level_id.toString(),
      data.exp.toString(),
      data.cur_user_deck_id.toString(),
    ]));
  } catch (error) {
    throw new Error('500');
  }
  return profile;
};

const updateDefaultDeck = async (user_id: number, deck_id: number): Promise<number> => {
  try {
    const query =
      'UPDATE "UserProfiles" Set cur_user_deck_id=$2 WHERE user_id=$1  RETURNING user_id';
    const { rowCount } = await db.query(query, [user_id.toString(), deck_id.toString()]);
    return rowCount;
  } catch (error) {
    throw new Error('500');
  }
};

const deleteUserById = async (id: number): Promise<number> => {
  try {
    const { rowCount } = await db.query('DELETE FROM "Users" WHERE user_id=$1', [id]);
    return rowCount;
  } catch (error) {
    throw new Error('500');
  }
  return 0;
};

const getUserByLogin = async (login: string): Promise<User> => {
  let user: User;

  try {
    ({
      rows: [user],
    } = await db.query('Select * from "Users" Where login=$1', [login]));
  } catch (error) {
    throw new Error('500');
  }
  return user;
};

const getSessionByRefreshToken = async (token: string): Promise<Session> => {
  let session: Session;

  try {
    ({
      rows: [session],
    } = await db.query('Select * From "UsersRefreshSession" Where "refreshToken"=$1', [token]));
  } catch (error) {
    throw new Error('500');
  }

  return session;
};

const deleteSessionByRefreshToken = async (token: string): Promise<number> => {
  try {
    const {
      rowCount,
    } = await db.query('DELETE FROM "UsersRefreshSession"  WHERE "refreshToken"=$1', [token]);
    return rowCount;
  } catch (error) {
    throw new Error('500');
  }
  return 0;
};

const deleteSessionByUserId = async (user_id: number): Promise<number> => {
  try {
    const { rowCount } = await db.query('DELETE FROM "UsersRefreshSession"  WHERE "user_id"=$1', [
      user_id,
    ]);
    return rowCount;
  } catch (error) {
    throw new Error('500');
  }
  return 0;
};

const addRefreshSession = async ({
  refreshToken,
  user_id,
  ip,
  expiresIn,
}: Session): Promise<string> => {
  let session: Session;

  try {
    ({
      rows: [session],
    } = await db.query(
      `INSERT INTO "UsersRefreshSession" ("refreshToken", "user_id", "ip","expiresIn")
                                            VALUES ('${refreshToken}', ${user_id}, '${ip}', ${expiresIn}) RETURNING "refreshToken"`,
      [],
    ));
  } catch (error) {
    throw new Error(error);
  }
  return session.refreshToken;
};

export const usersModel = {
  getAll,
  getUserById,
  getDefaultDeckId,
  getUserProfile,
  setUser,
  setUserProfile,
  updateUserById,
  updateUserProfile,
  updateDefaultDeck,
  deleteUserById,
  getUserByLogin,
  getSessionByRefreshToken,
  deleteSessionByRefreshToken,
  deleteSessionByUserId,
  addRefreshSession,
};
