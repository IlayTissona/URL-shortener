const inputURL = document.getElementById("url_input");
const shortButton = document.getElementById("submit");
const statisticInput = document.getElementById("statistic-input");
const statisticButton = document.getElementById("statistic-button");
const topUsedButton = document.getElementById("top-used-button");
const timeSort = document.getElementById("time-sort-button");
const statisticTable = document.getElementById("statistics-table");

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

statisticButton.addEventListener("click", (event) => {
  if (!statisticInput.value) {
    axios.get(window.location.origin + "/api/statistics/").then((response) => {
      console.log(response);
      printTable(response.data);
    });
    // .catch((error) => {
    //   printError(error);
    // });
  }
});

function printShortened(response) {
  const resDiv = document.getElementById("response-div");
  resDiv.style["backgroundColor"] = "green";
  resDiv.innerText = `Short Url : ${window.location.origin}/api/short/${response.data}`;
}

function printError(error) {
  const resDiv = document.getElementById("response-div");
  resDiv.style["backgroundColor"] = "red";
  resDiv.innerText = `Error: ${error.response.data.error}  (Status code ${error.response.status})`;
}

function printTable(urlsArr) {
  statisticTable.innerHTML = `<th>Full URL</th>
  <th>Shortened URL</th>
  <th>Created at</th>
  <th>Clicks</th>`;
  urlsArr.forEach((urlObj) => {
    printTableRow(urlObj);
  });
}

function printTableRow(urlObj) {
  const row = document.createElement("tr");
  for (prop in urlObj) {
    let cell = document.createElement("td");
    cell.innerText = urlObj[prop];
    row.append(cell);
  }
  statisticTable.append(row);
}
