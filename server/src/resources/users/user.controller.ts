
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
  console.log('check=', password, login);
  const user = await usersModel.getUserByLogin(login);
  console.log('user =', user );
  if (!user) {
    return null;
  }
  const isCheck =  myCrypt.checkPassword(password, user.password);
  console.log('is check=', isCheck);
  return isCheck ? user : null;
}; 

const findOneByToken = async (token:string):Promise<User>=> {
  const userId = webToken.getDataFromToken(token);
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

