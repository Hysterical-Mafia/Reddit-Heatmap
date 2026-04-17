const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const output = document.getElementById("output-section");

const status = document.getElementById("status");

function updateOutput(text) {
    status.textContent = text;
    console.log("First test")
}
    searchBtn.addEventListener("click", async function() {
    const keyword = input.value; 

    if (keyword.trim() == "") {
        alert("my input has no value");
        return;
    }
    updateOutput("Searching for: " + keyword);
    console.log("Second test")
    
    for (let i = 0; i < posts.length; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("postDiv" + i);
        console.log("Third test")
        newDiv.className = "post";
        newDiv.textContent = title;

        output.appendChild(newDiv);
    }

});



