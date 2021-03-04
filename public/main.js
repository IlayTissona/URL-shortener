// const { default: axios } = require("axios");

const inputURL = document.getElementById("url-input");
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
  } else {
    axios
      .get(window.location.origin + "/api/statistic/" + statisticInput.value)
      .then((response) => {
        printTable([response.data]);
      });
  }
});

topUsedButton.addEventListener("click", (event) => {
  axios
    .get(window.location.origin + "/api/statistics/clicks")
    .then((response) => {
      printTable(response.data);
    });
});

timeSort.addEventListener("click", (event) => {
  axios
    .get(window.location.origin + "/api/statistics/createdAt")
    .then((response) => {
      printTable(response.data);
    });
  // clearInterval(updates);
});

statisticTable.addEventListener("click", (event) => {
  if (event.target.className !== "short-url-cell") return;
  navigator.clipboard.writeText(
    window.location.origin + "/api/short/" + event.target.innerText
  );
});

statisticTable.addEventListener("mouseover", (event) => {
  if (event.target.className !== "short-url-cell") return;
  const tooltip = document.getElementById("copy-tooltip");
  tooltip.hidden = false;
});
statisticTable.addEventListener("mouseout", (event) => {
  if (event.target.className !== "short-url-cell") return;
  const tooltip = document.getElementById("copy-tooltip");
  tooltip.hidden = true;
});

axios
  .get(window.location.origin + "/api/statistics/clicks")
  .then((response) => {
    printTable(response.data);
  });
// const updates = setInterval(() => {
//   axios
//     .get(window.location.origin + "/api/statistics/clicks")
//     .then((response) => {
//       printTable(response.data);
//     });
// }, 5000);

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
    if (prop === "createdAt") {
      const date = new Date(urlObj[prop]);
      cell.innerText = printDate(date);
    } else {
      cell.innerText = urlObj[prop];
    }
    if (prop === "full") cell.className = "full-url-cell";
    if (prop === "id") cell.className = "short-url-cell";
    row.append(cell);
  }
  statisticTable.append(row);
}

function printDate(date) {
  let out = {
    year: date.getYear() - 100,
    month: date.getMonth() + 1,
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
  };
  for (let number in out) {
    if (Number(out[number]) < 10) {
      out[number] = "0" + out[number];
    }
  }
  return `${out.day}/${out.month}/${out.year} - ${out.hours}:${out.minutes}`; // DD/MM/YYYY - HH:MM
}
