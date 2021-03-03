// const axios = require("axios");
// import axios from "axios";
const inputURL = document.getElementById("url_input");
const shortButton = document.getElementById("submit");
console.log("dfvs");
shortButton.addEventListener("click", (event) => {
  if (!inputURL.value) {
    alert("Please enter URL to short");
    return;
  }
  axios
    .post(window.location.origin + "/api/short/new", {
      fullUrl: inputURL.value,
    })
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});
