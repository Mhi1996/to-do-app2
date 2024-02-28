const mongoose = require("mongoose").ObjectId;
const { User, passwordBcrypt } = require("../model/user.model");

const createUser = async function (req, res) {
  try {
    let { name, username, password, email } = req.body;
    const pwd = passwordBcrypt(password);
    console.log(`pwd===== ${pwd}`);
    let saveUser = await User.create({
      name: name,
      username: username,
      password: pwd,
      email: email,
    });
    const token = await createToken(saveUser);
    console.log(`user token  ${token}`);
    if (!saveUser) res.status(404).send({ msg: "User not Added" });
    res.status(200).send({ result: saveUser });
  } catch (error) {
    throw error;
  }
};

const getUserById = async (req) => {
  try {
    const id = req.params.id;
    const res = await User.findById({ _id: id, status: "Active" });
    if (!res) res.status(404).send({ msg: "User not found" });
    res.status(200).send({ result: res });
  } catch (error) {
    throw error;
  }
};

const updateUserById = async (req) => {
  try {
    const data = req.body;
    const res = await User.findOneAndUpdate(
      { _id: data.id, status: "Active" },
      { name: data.name, email: data.email, username: data.username },
      { new: true }
    );
    if (!res) return "User not found";
    console.log(`data updated ${res}`);
    return res;
  } catch (error) {
    throw error;
  }
};

const deleteUserById = async (req) => {
  try {
    const id = req.params.id;
    const res = await User.findByIdAndDelete({ _id: id, status: "Active" });
    if (!res) return "User not found";
    return res;
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser, getUserById, updateUserById, deleteUserById };
