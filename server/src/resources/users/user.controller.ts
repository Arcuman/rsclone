
import {myCrypt} from '@/helpers/myCrypt';
import {webToken} from '@/helpers/webToken';
import {usersModel, User, Session} from './user.model';

const getAll = ():Promise<User[]> =>  usersModel.getAll();
const getUserById = (id:number):Promise<User> => usersModel.getUserById(id);
const getUserByLogin = (login:string):Promise<User> => usersModel.getUserByLogin(login);

const setUser =  async (userData:User):Promise<number> =>  {
  const user = await usersModel.getUserByLogin(userData.login);
  if (user) {
    return 0;
  }
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
  const userId = webToken.getDataFromToken(token);
  const user = await getUserById(userId);
  return user;
}; 

const getSessionByRefreshToken = (token:string):Promise<Session> => usersModel.getSessionByRefreshToken(token);
const deleteSessionByRefreshToken =  (token:string):Promise<number> => usersModel.deleteSessionByRefreshToken(token);
const deleteSessionByUserId =  (id:number):Promise<number> => usersModel.deleteSessionByUserId(id);

const addRefreshSession =  async (newRefreshSession:Session):Promise<string> =>  usersModel.addRefreshSession(newRefreshSession);

export const usersService =   {
  getAll,
  getUserById,
  getUserByLogin,
  setUser,
  updateUserById,
  deleteUserById,
  checkUserAuth,
  findOneByToken,
  getSessionByRefreshToken,
  deleteSessionByRefreshToken,
  deleteSessionByUserId,
  addRefreshSession,
};

