const User = require('./user.model');

const getAll = async () => {
  return User.find();
};

const getUserById = async id => {
  return User.findById(id);
};

const setUser = async userData => {
  return User.create(userData);
};

const updateUserById = async (id, userData) => {
  return User.updateOne({ _id: id }, userData);
};

const deleteUserById = async id => {
  return (await User.deleteOne({ _id: id }).exec()).deletedCount;
};

const getUserByLogin = async login => {
  return User.findOne({ login });
};
module.exports = {
  getAll,
  getUserById,
  setUser,
  updateUserById,
  deleteUserById,
  getUserByLogin,
};
