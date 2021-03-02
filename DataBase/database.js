const fs = require("fs");
const ID_LENGTH = 5;

class DataBase {
  constructor() {
    this.urls = [];
  }

  addShortened(fullURL) {
    const shortened = new ShortenedURL(fullURL);
    this.urls.push(shortened);
    return shortened.id;
  }

  getFullUrl(shortened) {
    const shortenedObg = this.urls.find((urlObj) => urlObj.id === shortened);
    return shortenedObg.full;
  }
  save() {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        process.cwd() + "/DataBase/shortened.json",
        JSON.stringify(this.urls),
        (err) => {
          if (err) reject(err);
          else resolve("OK");
        }
      );
    });
  }
  load() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        process.cwd() + "/DataBase/shortened.json",
        {},
        (err, data) => {
          if (err) reject(err);
          else resolve(JSON.parse(data));
        }
      );
    });
  }
}
class ShortenedURL {
  constructor(fullURL) {
    this.full = fullURL;
    this.id = generateID(ID_LENGTH);
    this.createdAt = Date.now();
    this.clicks = 0;
  }
}

function generateID(length) {
  const chars =
    "abcdefghijklmnopqrstuvwxtzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charsArr = chars.split("");
  let id = "";

  for (let i = 0; i < length; i++) {
    id += charsArr[Math.floor(Math.random() * 62)];
  }

  const existingIds = JSON.parse(
    fs.readFileSync(process.cwd() + "/DataBase/ids.json")
  );
  const isExists = existingIds.some((val) => val === id);

  if (isExists) {
    return generateID(length);
  }
  existingIds.push(id);
  fs.writeFileSync(
    process.cwd() + "/DataBase/ids.json",
    JSON.stringify(existingIds)
  );
  return id;
}

const test = new DataBase();

console.log(test.addShortened("www.dasv.sdfv"));
console.log(test.addShortened("www.fvsvf.sdfv"));
console.log(test.addShortened("www.hghhr.sdfv"));
console.log(test.addShortened("www.asdf.sdfv"));
console.log(test.addShortened("www.dalkjsv.sdfv"));
test.save().then(
  test
    .load()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
);
