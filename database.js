const fs = require("fs");
const ID_LENGTH = 5;

class DataBase {
  constructor() {
    this.urls = [];
  }
}

class ShortenedURL {
  constructor(fullURL) {
    this.full = fullURL;
    this.id = generateID(ID_LENGTH);
    this.createdAt = new Date(Date.now);
    this.clicks = 0;
  }
}

function generateID(length) {
  const chars =
    "abcdefghijklmnopqrstuvwxtzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charsArr = chars.split("");
  const id = "";

  for (let i = 0; i < length; i++) {
    id += charsArr[Math.floor(Math.random() * 62)];
  }
  return id;
}
