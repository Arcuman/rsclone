import { db } from '../../../db';

export interface User{
  id: number;
  login: string;
  name:string;
  password:string;
}

const getAll = async ():Promise<User[]> => {
  
  let users;
  
  try {
    const { rows } = await db.query('Select user_id, login,name from "Users"', []);
    
    users = rows; 
  } catch (error) {
    throw new Error('500');

  } 
  return users;
 
};

const getUserById = async (id:number):Promise<User>=> {
  let user;
  try {
    ({ rows: [user]} = await db.query('Select user_id, login,name from "Users" Where user_id=$1', [id]));
   
  } catch (error) {
    throw new Error('500');

  } 
  return user; 
};

const setUser = async (userData:User):Promise<number> => {
  let user;
  try {
    const query = 'INSERT INTO "Users" (login, name, password) VALUES ($1, $2, $3 ) RETURNING user_id';
    ({ rows:[user] }  = await db.query(query, [userData.login, userData.name, userData.password]));
    
  } catch (error) {
    throw new Error('500');
  } 
  return  user.user_id;
};

const updateUserById = async (id:number, userData:User):Promise<User> => {
  let user;
  try {
    const query = 'UPDATE "Users" Set login=$2, name=$3, password= $4 WHERE user_id=$1  RETURNING *';
    ({ rows:[user] } = await db.query(query, [id.toString(), userData.login, userData.name, userData.password ]));
    
  } catch (error) {
    throw new Error('500');
  } 
  return  user;
};

const deleteUserById = async (id:number):Promise<number>=> {
  try {
    const {rowCount} = await db.query('DELETE FROM "Users" WHERE user_id=$1', [id]);
    return rowCount;
  } catch (error) {
    throw new Error('500');
  } 
  return  0;
};

const getUserByLogin = async (login:string) => {
  let user:User;
  try {
    ({ rows: [user]} = await db.query('Select * from "Users" Where login=$1', [login]));
   
  } catch (error) {
    throw new Error('500');

  } 
  return user; 
};

export const usersModel = {
  getAll,
  getUserById,
  setUser,
  updateUserById,
  deleteUserById,
  getUserByLogin,
};
