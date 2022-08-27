"use-strict";

const filterBtn = document.querySelector(".filter-field__btn");
const filterDropdown = document.querySelector(".filter-field__dropdown");

console.log(document.querySelector(".filter-field__btn"));

filterBtn.addEventListener("click", function () {
  filterDropdown.classList.add("active");
});
