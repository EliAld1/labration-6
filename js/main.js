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
    // Anropa API
    getRecipe(search);
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

// AJAX för att hämta från API
async function getRecipe(searchText) {
  try {
    const response = await fetch(
      "https://dummyjson.com/recipes/search?q=${searchText}",
    );
    if (!response.ok) { // Kontrollera svar
      throw new Error("Inget internet!"); // Felmeddelande
    }
    const data = await response.json(); // Omvandla data
    return data;
  } 
  catch (error) {
    console.error("Något gick fel!");
  }
}



