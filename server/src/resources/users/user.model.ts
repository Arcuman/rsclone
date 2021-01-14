import { db } from '../../../db';

export interface User {
  user_id: number;
  login: string;
  name: string;
  password: string;
}

export interface Session {
  refreshToken: string,
  user_id: number;
  ip: string;
  expiresIn: number;
  ua: string;
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
    ({ rows: [user] } = await db.query('Select user_id, login,name from "Users" Where user_id=$1', [id]));

  } catch (error) {
    throw new Error('500');

  }
  return user;
};

const setUser = async (userData: User): Promise<number> => {
  let user: User;
  try {
    const query = 'INSERT INTO "Users" (login, name, password) VALUES ($1, $2, $3 ) RETURNING user_id';
    ({ rows: [user] } = await db.query(query, [userData.login, userData.name, userData.password]));

  } catch (error) {
    throw new Error('500');
  }
  return user.user_id;
};

const updateUserById = async (id: number, userData: User): Promise<User> => {
  let user: User;
  try {
    const query = 'UPDATE "Users" Set login=$2, name=$3, password= $4 WHERE user_id=$1  RETURNING *';
    ({ rows: [user] } = await db.query(query, [id.toString(), userData.login, userData.name, userData.password]));

  } catch (error) {
    throw new Error('500');
  }
  return user;
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
    ({ rows: [user] } = await db.query('Select * from "Users" Where login=$1', [login]));

  } catch (error) {
    throw new Error('500');
  }
  return user;
};


const getSessionByRefreshToken = async (token: string): Promise<Session> => {
  let session: Session;
  try {
    ({ rows: [session] } = await db.query('Select * From "UsersRefreshSession" Where refreshToken=$1', [token]));

  } catch (error) {
    throw new Error('500');

  }
  return session;
};

const deleteSessionByRefreshToken = async (token: string): Promise<number> => {
  try {
    const { rowCount } = await db.query('DELETE FROM "UsersRefreshSession"  WHERE refreshToken=$1', [token]);
    return rowCount;
  } catch (error) {
    throw new Error('500');
  }
  return 0;
};

const addRefreshSession = async ({refreshToken,user_id,ip,expiresIn,ua}: Session): Promise<string> => {
  let session: Session;
  try {
    const query = 'INSERT INTO "UsersRefreshSession" (refreshToken, user_id, ip,expiresIn,ua) VALUES ($1, $2, $3,$4,$5 ) RETURNING refreshToken';
    ({ rows: [session] } = await db.query(query, [refreshToken, user_id, ip, expiresIn, ua]);

  } catch (error) {
    throw new Error('500');
  }
  return session.refreshToken;
};

export const usersModel = {
  getAll,
  getUserById,
  setUser,
  updateUserById,
  deleteUserById,
  getUserByLogin,
  getSessionByRefreshToken,
  deleteSessionByRefreshToken,
  addRefreshSession
};
