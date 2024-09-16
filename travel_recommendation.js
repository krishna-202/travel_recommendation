const url = "./travel_recommendation_api.json";
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    window.travelData = data;
  })
  .catch((error) => console.error("Error fetching the data:", error));

document.getElementById("searchButton").addEventListener("click", function () {
  const searchTerm = document.getElementById("searchBar").value.toLowerCase();
  searchTerm ? searchResults(searchTerm) : "";
});

function searchResults(keyword) {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = "";

  const data = window.travelData;

  // Check for matches in countries
  data.countries.forEach((country) => {
    country.cities.forEach((city) => {
      if (city.name.toLowerCase().includes(keyword)) {
        displayResult(city.name, city.imageUrl, city.description);
      }
    });
  });

  // Check for matches in temples
  if (keyword.includes("temple") || keyword.includes("temples")) {
    data.temples.forEach((temple) => {
      displayResult(temple.name, temple.imageUrl, temple.description);
    });
  }

  // Check for matches in beaches
  if (keyword.includes("beach") || keyword.includes("beaches")) {
    data.beaches.forEach((beach) => {
      displayResult(beach.name, beach.imageUrl, beach.description);
    });
  }
}

function displayResult(name, imageUrl, description) {
  const resultsContainer = document.getElementById("resultsContainer");

  const resultCard = `
        <div class="result-card">
            <img src="${imageUrl}" alt="${name}">
            <h3>${name}</h3>
            <p>${description}</p>
            <button>Visit</button>
        </div>
    `;

  resultsContainer.innerHTML += resultCard;
}

document.getElementById("clearButton").addEventListener("click", function () {
  document.getElementById("searchBar").value = "";
  document.getElementById("resultsContainer").innerHTML = "";
});
