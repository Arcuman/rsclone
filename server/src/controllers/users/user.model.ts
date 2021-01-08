import { db } from '../../../db';
import  config  from '../../config/dbConfig';

export interface UserProps {
  id: string;
  login: string;
  name:string;
}

const getAll = async () => {
  
  let users;
  
  try {
    console.log('clll=', db);
    const { rows } = await db.query('Select * from Users', []);
    
    users = rows; 
  } catch (error) {
    // throw new Error('500');

  } /* finally {
    db.end();
  } */
  return users;
 
};

const getUserById = async (id:string) => {
  // return User.findById(id);
};

const setUser = async (userData:UserProps) => {
  // return User.create(userData);
};

const updateUserById = async (id:string, userData:UserProps) => {
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
