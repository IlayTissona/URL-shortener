require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const DataBase = require("./DataBase/database.js");
// const middleWares = require("./middlwares.js");

const dataBase = new DataBase();
dataBase.load().then((res) => res);

app.use(cors());
app.use(express.json());

app.use("/public", express.static(`./public`));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/short/new", urlCheck, returnExisting, (req, res) => {
  dataBase
    .addShortened(req.body.fullUrl)
    .then((id) => {
      console.log(id);
      res.send(id);
    })
    .catch((e) => res.sendStatus(500));
});

app.get("/api/short/:id", (req, res) => {
  let full = dataBase.getFullUrl(req.params.id);
  res.status(302).redirect(full);
});

app.get("/api/statistic/:id", (req, res) => {
  let urlObj = dataBase.getObjById(req.params.id);
  res.json(urlObj);
});

app.get("/api/statistics/:prop?", (req, res) => {
  const { prop } = req.params; // /clicks - will return sorted most to least clicked, /date - will return sorted by date
  const urlsArr = dataBase.getAllData(prop);
  res.json(urlsArr);
});

module.exports = app;

//---------------------middleWares-----------------------

function urlCheck(req, res, next) {
  const { fullUrl } = req.body;

  const validUrlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

  if (!validUrlRegex.test(fullUrl)) {
    res.status(400).send({ error: "invalid url" });
  } else {
    next();
  }
}

function returnExisting(req, res, next) {
  const { fullUrl } = req.body;
  const existing = dataBase.getIdByFullUrl(fullUrl);
  if (existing) {
    res.send(existing);
  } else {
    next();
  }
}
