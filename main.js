const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const output = document.getElementById("output-section");
const status = document.getElementById("status");

input.addEventListener("keydown", function(enter) {
    if (enter.key === "Enter") {
        searchBtn.click();
    }
});

searchBtn.addEventListener("click", async function() {
    const keyword = input.value.trim().toLowerCase();
    // to make sure validate checks for words instead of letters, loop through each word in post.title seperate them and store them
    // then loop through them and store the ones that contain a word or rather the letters in which were types
    
    if (!validate(keyword)) {
        status.textContent = "Invalid Input";
        return;
    }
    await getData(keyword)

})

function validate(keyword){
    if (keyword.length >= 30 || keyword.trim() === "" ) {
        console.log("Error! " + keyword);
        //add later different error messages

        return false;
    }
    return true;
}

async function getData(keyword){
    
    try {
        const res = await fetch(`/api/search?keyword=${keyword}`);
        if (!res.ok) {
            throw new Error("API Error: " + res.status);
        }

        const data = await res.json();
        if (!data.posts) {
            throw new Error("Wrong Response")
        }

        renderUI(data.posts, keyword);
    } 
    catch (err) {
        console.error(err);
        status.textContent = "Error fetching results"
    }
}

function renderUI(posts, keyword){
    output.innerHTML = "";
    status.textContent = ("Searching for: " + keyword);

    if (!posts || posts.length === 0) {
        status.textContent = "No results found";
        return;
    }
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        const newDiv = document.createElement("div");
        newDiv.className = "post";
        newDiv.textContent = post.title || "No Title";
        output.appendChild(newDiv);
    }

    }
