require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const DataBase = require("./DataBase/database.js");

const dataBase = new DataBase();
dataBase.load().then((res) => res);

app.use(cors());
app.use(express.json());

app.use("/public", express.static(`./public`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// app.get("/test", (req, res) => {
//   dataBase.load().then((data) => res.send(data));
// });

app.post("/new", (req, res) => {
  const id = dataBase.addShortened(req.body.fullUrl);
  dataBase
    .save()
    .then((ok) => res.send(id))
    .catch((e) => res.sendStatus(500));
});

module.exports = app;
