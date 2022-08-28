"use-strict";

const filterBtn = document.querySelector(".filter-form__btn");
const filterDropdown = document.querySelector(".filter-form__dropdown");
const searhInput = document.querySelector("input");
const searchIcon = document.querySelector(".icon-search");
const filterOptions = document.querySelectorAll(".filter-form__option");

filterBtn.addEventListener("click", function () {
  filterDropdown.classList.toggle("active");
});

//SUBMITING FORM

searhInput.addEventListener("submit", function () {
  this.closest("form").requestSubmit();
});

searchIcon.addEventListener("click", function () {
  this.closest("form").requestSubmit();
});

filterOptions.forEach((option) => {
  option.addEventListener("click", function () {
    filterDropdown.classList.remove("active");
    this.closest("form").querySelector("button").value = this.textContent;
    filterBtn.innerHTML = `${this.textContent} <span class="arrow"> &gt</span>`;
    this.closest("form").requestSubmit();
  });
});

document.querySelector("#search-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const countryName = this.querySelector("input").value;

  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((res) => res.json())
    .then((data) => displayAllCountries(data));
});

document.querySelector("#filter-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const region = this.querySelector("button").value;
  searhInput.value = "";

  fetch(`https://restcountries.com/v3.1/region/${region}`)
    .then((res) => res.json())
    .then((data) => displayAllCountries(data));
});

const displayAllCountries = function (data) {
  const countriesContainer = document.querySelector(".countries-list");
  data.forEach((country) => {
    const countryHtml = `<div class="country">
    <img
      src="${country.flags.svg}"
      alt="flag"
      class="flag"
    />
    <div class="country__info">
      <p class="country__info-name">${country.name.common}</p>
      <p class="country__info-popultion">
        <span class="attr">Population:</span>
        <span class="value">${country.population}</span>
      </p>
      <p class="country__info-region">
        <span class="attr">Region:</span>
        <span class="value">${country.region}</span>
      </p>
      <p class="country__info-capital">
        <span class="attr">Capital:</span>
        <span class="value">${country.capital}</span>
      </p>
    </div>
  </div>`;

    countriesContainer.innerHTML += countryHtml;
  });

  document.querySelectorAll(".country").forEach((country) => {
    country.addEventListener("click", function () {
      displaySingleCountry(country);
      addSingleCountry(
        country.querySelector(".country__info-name").textContent
      );
    });
  });
};

const displaySingleCountry = function () {
  document.querySelector(".filtering-section").classList.add("hide");
  document.querySelector(".countries-list").classList.add("hide");
  document.querySelector(".single-country").classList.remove("hide");
};

const displayMultipleCountries = function () {
  document.querySelector(".filtering-section").classList.remove("hide");
  document.querySelector(".countries-list").classList.remove("hide");
  document.querySelector(".single-country").classList.add("hide");
};

const addSingleCountry = function (countryName) {
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((res) => res.json())
    .then((country) => {
      country = country[0];
      console.log(country);
      const countryHtml = `<button class="back-btn">&#8592 Back</button>
      <div class="country">
        <img
          src="${country.flags.svg}"
          alt="flag"
          class="flag"
        />
        <div class="country__info">
          <h1>${country.name.common}</h1>
          <div class="country-details">
            <div>
              <p>
                Native name: <span class="native-name">${
                  country.name.official
                }</span>
              </p>
              <p>Population: <span class="population">${
                country.population
              }</span></p>
              <p>Region: <span class="region">${country.region}</span></p>
              <p>Sub region: <span class="sub-region">${
                country.subregion
              }</span></p>
              <p>Capital: <span class="capital">${country.capital}</span></p>
            </div>
            <div>
              <p>
                Top level domain: <span class="top-level-domain">${
                  country.tld
                }</span>
              </p>
              <p>Currencies: <span class="currencies">${populateCountryInfo(
                country.currencies
              )}</span></p>
              <p>Languages: <span class="languages">${populateCountryInfo(
                country.languages
              )}</span></p>
            </div>
          </div>
          <div class="borders">
            Border countries: 
          </div>
        </div>
      </div>`;
      document.querySelector(".single-country").innerHTML = countryHtml;
      addBorderCountries(country.borders);
      document
        .querySelector(".back-btn")
        .addEventListener("click", displayMultipleCountries);
    });
};

const populateCountryInfo = function (data) {
  let str = "";
  for (const value of Object.values(data)) {
    str += value.name ? `${value.name}, ` : `${value}, `;
  }
  return str.slice(0, -2);
};

const addBorderCountries = function (data) {
  const bordersContainer = document.querySelector(".borders");
  if (!data) return;
  data.forEach((item) => {
    const span = document.createElement("span");
    fetch(`https://restcountries.com/v3.1/alpha/${item}`)
      .then((req) => req.json())
      .then((data) => {
        span.textContent = data[0].name.common;
        bordersContainer.insertAdjacentElement("beforeend", span);
      });
  });
};
