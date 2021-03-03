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
    .then((response) => {
      printShortened(response);
    })
    .catch((error) => {
      printError(error);
    });
});

function printShortened(response) {
  const resDiv = document.getElementById("response-div");
  resDiv.style["backgroundColor"] = "green";
  resDiv.innerText = `Short Url : ${window.location.origin}/api/short/${response.data}`;
}
function printError(error) {
  const resDiv = document.getElementById("response-div");
  resDiv.style["backgroundColor"] = "red";
  // if(error.)
  resDiv.innerText = `Error: ${error.response.data.error} - (Status code ${error.response.status})`;
  console.log(error.response.data);
  console.log(error.response.status);
  console.log(error.response.headers);
}
