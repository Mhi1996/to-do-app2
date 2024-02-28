const userService = require("./../service/user.service");

const createUser = async (req, res) => {
  return userService.createUser(req,res);
};

const getUserById = async (req, res) => {
  return userService.getUserById(req);
};

const updateUserById = async (req, res) => {
  return userService.updateUserById(req);
};

const deleteUserById = async (req, res) => {
  return userService.deleteUserById(req);
};


module.exports = { getUserById, createUser, updateUserById, deleteUserById };
