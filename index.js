require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 3000;
const DataBase = require("./DataBase/database.js");

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
