
import {myCrypt} from '@/helpers/myCrypt';
import {webToken} from '@/helpers/webToken';
import {usersModel, User} from './user.model';

const getAll = ():Promise<User[]> =>  usersModel.getAll();
const getUserById = (id:number):Promise<User> => usersModel.getUserById(id);

const setUser =  async (userData:User):Promise<number> =>  {
  const hash =  myCrypt.hashPassword(userData.password);
  const newUserData = {...userData, password:hash};
  return usersModel.setUser(newUserData);
};

const updateUserById = async (id:number, userData:User):Promise<User> => {
  const hash = myCrypt.hashPassword(userData.password);
  const newUserData = {...userData, password:hash};
  return usersModel.updateUserById(id, newUserData);
};

const deleteUserById =  (id:number):Promise<number> => usersModel.deleteUserById(id);

const checkUserAuth = async (login:string, password:string):Promise<User|null> => {
  const user = await usersModel.getUserByLogin(login);
  if (!user) {
    return null;
  }
  const isCheck =  myCrypt.checkPassword(password, user.password);
  return isCheck ? user : null;
}; 

const findOneByToken = async (token:string):Promise<User>=> {
  // console.log('find token=', token);
  const userId = webToken.getDataFromToken(token);
  // console.log('user=', userId);
  const user = await getUserById(userId);
  return user;
}; 

export const usersService =   {
  getAll,
  getUserById,
  setUser,
  updateUserById,
  deleteUserById,
  checkUserAuth,
  findOneByToken,
};

