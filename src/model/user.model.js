const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");
const { json } = require("express");
dotenv.config();
const bcrypt = require("bcrypt");

const user_Schema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    status: { type: String, default: "Active" },
    password: { type: String },
    username: { type: String, min: 4, max: 20, unique: true, required: true },
    textDoc: { type: String },
  },
  { timestamps: true }
);

module.exports = createToken = async (user) => {
  try {
    const token = await jsonwebtoken.sign({ user }, process.env.SECRET_KEY, {
      expiresIn: 100000,
    });
    console.log(`token ${token}`);
    return token;
  } catch (error) {
    console.log(`jwt error ${error}`);
    throw error;
  }
};

const verifyToken = async (userToken) => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(userToken, process.env.SECRET_KEY, (user, error) => {
      if (user) {
        resolve(user);
      } else {
        reject(error);
      }
    });
  });
};

module.exports = passwordBcrypt = async (password) => {
  console.log(`before password   == ${password}`);
  const res = await bcrypt.hash(password, 5, function (err, hash) {
    console.log(`hash==== ${hash}`);
    password = hash;
  });
  console.log(`after password   == ${res.password}`);
  return res;
};

const User = new mongoose.model("User", user_Schema);
module.exports = { User, createToken, verifyToken, passwordBcrypt };
