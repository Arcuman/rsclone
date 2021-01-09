
import myCrypt from '@/helpers/myCrypt';
import {webToken} from '@/helpers/webToken';
import {usersModel, User} from './user.model';

const getAll = ():Promise<User[]> =>  usersModel.getAll();
const getUserById = (id:number):Promise<User> => usersModel.getUserById(id);

const setUser =  (userData:User):Promise<number> =>  usersModel.setUser(userData);

/* const hash = await myCrypt.hashPassword(userData.password);
  userData.password = hash; */

const updateUserById = (id:number, userData:User):Promise<User> => 
  /* const hash = await myCrypt.hashPassword(userData.password);
  userData.password = hash; */
  usersModel.updateUserById(id, userData)
;

const deleteUserById =  (id:number):Promise<number> => usersModel.deleteUserById(id);

/* const checkUserAuth = async (login:string, password:string):Promise<User|null> => {
  const user = await usersModel.getUserByLogin(login);
  if (!user) {
    return null;
  }
  const isCheck = await myCrypt.checkPassword(password, user.password);
  return isCheck ? user : null;
}; */

const findOneByToken = async (token):Promise<User>=> {
  const { user } = await webToken.getDataFromToken(token);
  return getUserById(user);
};
export const usersService =   {
  getAll,
  getUserById,
  setUser,
  updateUserById,
  deleteUserById,
  // checkUserAuth,
  findOneByToken,
};

