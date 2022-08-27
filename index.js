"use-strict";

const filterBtn = document.querySelector(".filter-field__btn");
const filterDropdown = document.querySelector(".filter-field__dropdown");

filterBtn.addEventListener("click", function () {
  filterDropdown.classList.toggle("active");
});
