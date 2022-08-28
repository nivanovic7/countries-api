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
    .then((data) => displayCountry(data));
});

document.querySelector("#filter-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const region = this.querySelector("button").value;
  searhInput.value = "";

  fetch(`https://restcountries.com/v3.1/region/${region}`)
    .then((res) => res.json())
    .then((data) => data.forEach((el) => displayCountry(el)));
});

const displayCountry = function (data) {
  console.log(data);
  const countriesContainer = document.querySelector(".countries-list");

  const countryHtml = `<div class="country">
    <img
      src="${data.flags.png}"
      alt="flag"
      class="flag"
    />
    <div class="country__info">
      <p class="country__info-name">${data.name.official}</p>
      <p class="country__info-popultion">
        <span class="attr">Population:</span>
        <span class="value">${data.population}</span>
      </p>
      <p class="country__info-region">
        <span class="attr">Region:</span>
        <span class="value">${data.region}</span>
      </p>
      <p class="country__info-capital">
        <span class="attr">Capital:</span>
        <span class="value">${data.capital}</span>
      </p>
    </div>
  </div>`;

  countriesContainer.innerHTML += countryHtml;
};
