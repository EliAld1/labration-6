"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Elina Aldevärn
 */

// Hämta element från DOM, fomulär
const form = document.querySelector("#searchform");
const inputEl = document.querySelector("#search");
const submitBtn = document.querySelector("#searchbutton");

const messageEl = document.querySelector("#message");
const recipeEl = document.querySelector("#recipe");

const errorList = document.querySelector("#error");

// AJAX för att hämta från API
async function getRecipe(searchText) {
  try {
    console.log("Sökord som skickas med;", searchText); // Svar från data
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${searchText}`,
    );
    if (!response.ok) {
      // Kontrollera svar
      throw new Error("Något gick fel!"); // Felmeddelande
    }
    const data = await response.json(); // Omvandla data JSON till JS-objekt
    return data;
  } catch (error) {
    console.error("Något gick fel!");
  }
}

// Eventlyssnare för formulär
form.addEventListener("submit", showRecipe);
// submitBtn.addEventListener("click", send);

// Funktion för recept
async function showRecipe(event) {
  event.preventDefault(); // Förhindra att sidan laddas om

  // Läs in värde från obligatoriskt fält
  const search = inputEl.value.trim();

  // Rensa tidigare meddelanden/recept
  messageEl.innerHTML = "";

  // Anropa valideringsfunktion
  if (validate(search)) {
    // Anropa API
    const data = await getRecipe(search);
    console.log(data);

    // Kontrollera om sökning gav resultat
    if (data.recipes.length === 0) {
      displayMessage(
        "Inget resultat... Vänligen testa sök på ett annat recept!",
      );
      return;
    }
    // Om allt ok, visa första receptet
    const firstRecipe = data.recipes[0];
    displayRecipe(firstRecipe);
  }
}

function displayRecipe(recipe) {
  // Rensa tidigare resultat
  recipeEl.innerHTML = "";

  // Skapar article behållare till recept
  const articleEl = document.createElement("article");

  // Skapar element för recept
  const titleEl = document.createElement("h3");
  titleEl.textContent = recipe.name;

  const imgEl = document.createElement("img");
  imgEl.src = recipe.image;
  imgEl.alt = recipe.name;

  // Skapar div för p-element
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("recipe-info"); // Lägger till class-namnet

  // Skapar element för kolummn under bild
  const servingsEl = document.createElement("p");
  servingsEl.textContent = `Servings: ${recipe.servings}`;

  const prepTimeMinutesEl = document.createElement("p");
  prepTimeMinutesEl.textContent = `Prep time: ${recipe.prepTimeMinutes} minutes`;

  const cookTimeMinutesEl = document.createElement("p");
  cookTimeMinutesEl.textContent = `Cooking time: ${recipe.cookTimeMinutes} minutes`;

  const difficultyEl = document.createElement("p");
  difficultyEl.textContent = `Difficulty: ${recipe.difficulty}`;

  // Lägger in i div-sektion
  infoDiv.appendChild(servingsEl);
  infoDiv.appendChild(prepTimeMinutesEl);
  infoDiv.appendChild(cookTimeMinutesEl);
  infoDiv.appendChild(difficultyEl);

  // Ingridienser i en punktlista
  const ingredientsTitle = document.createElement("h4"); // Rubrik
  ingredientsTitle.textContent = "Ingredients";

  const ulEl = document.createElement("ul"); // Skapar ul-lista
  recipe.ingredients.forEach((ingredientText) => {
    // Loopar lista
    const liEl = document.createElement("li"); // Skapar li-element
    liEl.textContent = ingredientText;

    ulEl.appendChild(liEl); // Lägger till li-elemnt i ul-listan
  });

  // Instuktioner i en numrerad lista
  const instructionsTitle = document.createElement("h4"); // Rubrik
  instructionsTitle.textContent = "Instructions";

  const olEl = document.createElement("ol"); // Skapar ol-lista
  recipe.instructions.forEach((instructionText) => {
    const liEl = document.createElement("li"); // Skapar li-element
    liEl.textContent = instructionText;

    olEl.appendChild(liEl); // Lägger till li-elemnt i ol-listan
  });

  // Kopplar ihop elementen
  articleEl.appendChild(titleEl);
  articleEl.appendChild(imgEl);
  articleEl.appendChild(infoDiv);
  // Lägger till ingridienser och ul till recept sektion
  articleEl.appendChild(ingredientsTitle);
  articleEl.appendChild(ulEl);
  // Lägger till instuktioner och ol till recept sektion
  articleEl.appendChild(instructionsTitle);
  articleEl.appendChild(olEl);

  recipeEl.appendChild(articleEl);
}

function displayMessage(message) {
  messageEl.textContent = message;
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
