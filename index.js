"use-strict";

const filterBtn = document.querySelector(".filter-field__btn");
const filterDropdown = document.querySelector(".filter-field__dropdown");
const searhInput = document.querySelector("input");
const searchIcon = document.querySelector(".icon-search");
const filterOptions = document.querySelectorAll(".filter-field__option");

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
    this.closest("form").requestSubmit();
    filterDropdown.classList.remove("active");
    filterBtn.innerHTML = `${this.textContent} <span class="arrow"> &gt</span>`;
    console.log(this.textContent);
  });
});

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
});
