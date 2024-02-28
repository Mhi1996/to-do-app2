const express = require("express");
const app = express();
app.use(express.json());
const bodyParser = require("body-parser");
const connectDB = require("./src/db/index");
const cors = require("cors");
const route = require("./src/routes");

app.use(cors());
connectDB();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/", route);

app.listen("2233", () => {
  console.log(`To Do App server is running on port 2233`);
});

module.exports = app;
