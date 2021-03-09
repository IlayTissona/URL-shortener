require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 3000;
const dataBase = require("./dataBaseIndex.js");

dataBase
  .load()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch();
