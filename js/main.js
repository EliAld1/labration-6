"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Elina Aldevärn
 */

// Hämta element från DOM, fomulär
const form = document.querySelector("#searchform");
const inputEl = document.querySelector("#search");
const submitBtn = document.querySelector("#searchbutton");

const errorList = document.querySelector("#error");

// Eventlyssnare för formulär
form.addEventListener("submit", onSubmit);
// submitBtn.addEventListener("click", send);

// Förhindra att sidan laddas om
function onSubmit(event) {
  event.preventDefault();

  // Läs in värde från obligatoriskt fält
  const search = inputEl.value.trim();

  // Anropa valideringsfunktion
  if (validate(search)) {
    // Lägger in API
  }
}

// Validera fältet imatning
function validate(search) {
  if (search === "") {
    errorList.textContent = "Vänligen fyll i sökfältet";
    return false;
  }
  // Rensa tidigare felmeddelande
  errorList.textContent = "";
  return true;
}
