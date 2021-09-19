const BASE_URL = `https://api.openbrewerydb.org/breweries`;

document.addEventListener("DOMContentLoaded", () => {
  getBrews();
  document.getElementById("Breweries").addEventListener("click", getBrews);
});

function getBrews() {
  const ul = document.getElementById("brewery-list");
  const info = document.getElementById("info");
  info.innerHTML = "";
  ul.innerHTML = "";
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((brewery) => {
        //Iterate through all the breweries and display the names as clickable links on the page
        ul.innerHTML += `
        <li><a href="#" data-id="${brewery.id}">${brewery.name}</a></li>`;
      });
      clickLinks();
    });
}

function clickLinks() {
  const breweries = document.querySelectorAll("a");
  breweries.forEach((brewery) => {
    brewery.addEventListener("click", showBrewery);
  });
}

const showBrewery = (event) => {
  console.log(event.target.dataset.id);
  const info = document.getElementById("info");
  const ul = document.getElementById("brewery-list");
  ul.innerHTML = "";
  fetch(BASE_URL + `/${event.target.dataset.id}`)
    .then((response) => response.json())
    .then((data) => {
      info.innerHTML = `<h1>${data.name}</h1><br/>
      <h3>Address: </h3>
      <p>${data.street}</p> 
      <h3>City: </h3>
      <p>${data.city}</p>
      <h3>State: </h3>
      <p>${data.state}</p>
      <h3>ZIP Code: </h3>
      <p>${data.postal_code}</p>
      <h3>URL: </h3>
      <p>${data.website_url}</p>`;
    });
};

// function renderBrews(brews) {
//   const ul = document.querySelector("ul");
//   brews.forEach((brew) => {
//     const li = document.createElement("li");
//     li.innerHTML = brew.name;
//     ul.appendChild(li);
//   });
// }
// <a href="#">${</a>
