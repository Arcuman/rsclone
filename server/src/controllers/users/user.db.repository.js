const User = require('./user.model');

const getAll = async () => User.find();

const getUserById = async id => User.findById(id);

const setUser = async userData => User.create(userData);

const updateUserById = async (id, userData) => User.updateOne({ _id: id }, userData);

const deleteUserById = async id => (await User.deleteOne({ _id: id }).exec()).deletedCount;

const getUserByLogin = async login => User.findOne({ login });
module.exports = {
  getAll,
  getUserById,
  setUser,
  updateUserById,
  deleteUserById,
  getUserByLogin,
};
