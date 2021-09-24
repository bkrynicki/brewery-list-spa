const BASE_URL = `https://api.openbrewerydb.org/breweries`;

document.addEventListener("DOMContentLoaded", () => {
  //Once the Dom is loaded, send our fetch request for Brewery Information and activate our button to show all breweries
  getBrews();
  document.getElementById("Breweries").addEventListener("click", getBrews);
});

function getBrews() {
  const ul = document.getElementById("brewery-list");
  const info = document.getElementById("info");
  //Clear the page so we don't have duplicate information
  info.innerHTML = "";
  ul.innerHTML = "";
  //Asynchronously fetch the Promise Object, return the response and then turn the response into JSON.
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((brewery) => {
        //Iterate through all the breweries and display the names as clickable links on the page
        ul.innerHTML += `
        <p>
          <a href="#" data-id="${brewery.id}">${brewery.name}</a>
        </p>`;
      });
      clickLinks();
    });
}

function clickLinks() {
  //Select all Breweries that we show on the page and add an event listener for the link to be clicked
  const breweries = document.querySelectorAll("a");
  breweries.forEach((brewery) => {
    brewery.addEventListener("click", showBrewery);
  });
}

const showBrewery = (event) => {
  //Upon 'click' of Brewery link, send fetch request for information on specifically clicked brewery
  console.log(event.target.dataset.id);
  const info = document.getElementById("info");
  const ul = document.getElementById("brewery-list");
  //Clear the Brewery List so that we can show our specific data
  ul.innerHTML = "";
  fetch(BASE_URL + `/${event.target.dataset.id}`)
    .then((response) => response.json())
    .then((data) => {
      //Show the data below as the innerHTML of info div
      info.innerHTML = `<h1>${data.name}</h1><br/>
      <h3>Address: </h3>
      <p>${data.street}</p> 
      <h3>City: </h3>
      <p>${data.city}</p>
      <h3>State: </h3>
      <p>${data.state}</p>
      <h3>ZIP Code: </h3>
      <p>${data.postal_code}</p>
      `;
    });
};
