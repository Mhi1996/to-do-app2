const express = require("express");
const route = express.Router();
const userController = require("./../controller/user.controllers");

route.post("/create", (req,res)=>{userController.createUser(req,res)});
route.get("/getById/:id", userController.getUserById);
route.patch("/updateById", userController.updateUserById);
route.delete("/deleteById/:id", userController.deleteUserById);

module.exports = route;
