const usersModel = require('./user.model');
const myCrypt = require('../../helpers/myCrypt');
const webToken = require('../../helpers/webToken');

const getAll = () => usersModel.getAll();
const getUserById = async id => usersModel.getUserById(id);

const setUser = async userData => {
  const hash = await myCrypt.hashPassword(userData.password);
  userData.password = hash;
  return await usersModel.setUser(userData);
};

const updateUserById = async (id, userData) => {
  const hash = await myCrypt.hashPassword(userData.password);
  userData.password = hash;
  return await usersModel.updateUserById(id, userData);
};

const deleteUserById = async id => {
  await tasks.deleteUserInTask(id);
  return await usersModel.deleteUserById(id);
};

const checkUserAuth = async (login, password) => {
  const user = await usersModel.getUserByLogin(login);
  if (!user) {
    return 0;
  }
  const isCheck = await myCrypt.checkPassword(password, user.password);
  return isCheck ? user : 0;
};

const findOneByToken = async token => {
  const { user } = await webToken.getDataFromToken(token);
  return await getUserById(user);
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

