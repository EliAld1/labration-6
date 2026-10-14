"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Elina Aldevärn
 */

// Hämta element från DOM, fomulär
const form = document.querySelector("#searchform");
const inputEl = document.querySelector("#search");
const submitBtn = document.querySelector("#searchbutton");

const errorList = document.querySelector("#error")

// Eventlyssnare för formulär
form.addEventListener("submit", onSubmit);
submitBtn.addEventListener("click", search);

// Förhindra att sidan laddas om
function onSubmit(event) {
    event.preventDefault();
}