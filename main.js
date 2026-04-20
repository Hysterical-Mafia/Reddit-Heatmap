const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const output = document.getElementById("output-section");
const status = document.getElementById("status");

function getInput(){
    status.textContent = input;
    console.log(check)
}

function validate(){
    if (input == "")
        status.textContent = "Invalid Input";
}

function getData(){
    const apiUrl = api/search.js
}

function renderUI(){

}
