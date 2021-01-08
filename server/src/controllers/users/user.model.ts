import { db } from '../../../db';
import  config  from '../../config/dbConfig';

export interface User{
  id: string;
  login: string;
  name:string;
}

const getAll = async () => {
  
  let users;
  
  try {
    const { rows } = await db.query('Select user_id, login,name from "Users"', []);
    
    users = rows; 
  } catch (error) {
    throw new Error('500');

  } 
  return users;
 
};

const getUserById = async (id:string)=> {
  let user;
  
  try {
    const { rows } = await db.query('Select user_id, login,name from "Users" Where user_id=$1', [id]);
    user = rows; 
  } catch (error) {
    throw new Error('500');

  } 
  return user; 
};

const setUser = async (userData:User) => {
  // return User.create(userData);
};

const updateUserById = async (id:string, userData:User) => {
  // return User.updateOne({ _id: id }, userData);
};

const deleteUserById = async (id:string) => {
  // return (await User.deleteOne({ _id: id }).exec()).deletedCount;
};

const getUserByLogin = async (login:string) => {
  // return User.findOne({ login });
};
export {
  getAll,
  getUserById,
  setUser,
  updateUserById,
  deleteUserById,
  getUserByLogin,
};
