let searchInputElement = document.getElementById("searchInput");
let resultsContainerElement = document.getElementById("resultsContainer");
let loadingSpinnerElement = document.getElementById("loadingSpinner");

function createAndAppendResultItem(result) {
  let { link, title, description } = result;

  let resultItemElement = document.createElement("div");
  resultItemElement.classList.add("result-item");

  let titleElement = document.createElement("a");
  titleElement.href = link;
  titleElement.target = "_blank";
  titleElement.textContent = title;
  titleElement.classList.add("result-title");
  resultItemElement.appendChild(titleElement);

  let titleBreakElement = document.createElement("br");
  resultItemElement.appendChild(titleBreakElement);

  let urlElement = document.createElement("a");
  urlElement.classList.add("result-url");
  urlElement.href = link;
  urlElement.target = "_blank";
  urlElement.textContent = link;
  resultItemElement.appendChild(urlElement);

  let linkBreakElement = document.createElement("br");
  resultItemElement.appendChild(linkBreakElement);

  let descriptionElement = document.createElement("p");
  descriptionElement.classList.add("result-description");
  descriptionElement.textContent = description;
  resultItemElement.appendChild(descriptionElement);

  resultsContainerElement.appendChild(resultItemElement);
}

function displaySearchResults(searchResults) {
  loadingSpinnerElement.classList.add("d-none");

  for (let result of searchResults) {
    createAndAppendResultItem(result);
  }
}

function searchWikipedia(event) {
  if (event.key === "Enter") {
    loadingSpinnerElement.classList.remove("d-none");
    resultsContainerElement.textContent = "";

    let searchInput = searchInputElement.value;
    let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
    let options = {
      method: "GET"
    };

    fetch(url, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        let { search_results } = jsonData;
        displaySearchResults(search_results);
      });
  }
}

searchInputElement.addEventListener("keydown", searchWikipedia);
