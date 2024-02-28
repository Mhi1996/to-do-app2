const express = require("express");
const router = express.Router();
const userRouter = require("./user.route");
const noteRouter = require("./note.route");

router.use("/user/", userRouter);
router.use("/note/", noteRouter);

module.exports = router;
