const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const output = document.getElementById("output-section");
const status = document.getElementById("status");

function setStatus(text) {
    status.textContent = text;
}

function clearOutput() {
    output.innerHTML = "";
}

function renderPosts(posts) {
    clearOutput();

    posts.forEach(post => {
        const div = document.createElement("div");
        div.className = "post";
        div.textContent = post.title;
        output.appendChild(div);
    });
}

async function fetchReddit(keyword) {
    const res = await fetch(`/api/search?keyword=${encodeURIComponent(keyword)}`);

    if (!res.ok) {
        throw new Error("API failed");
    }

    return await res.json();
}

searchBtn.addEventListener("click", async () => {
    const keyword = input.value.trim();

    if (!keyword) {
        setStatus("Empty input");
        return;
    }

    try {
        setStatus("Searching...");

        const data = await fetchReddit(keyword);

        if (!data.posts || data.posts.length === 0) {
            setStatus("No results");
            clearOutput();
            return;
        }

        setStatus(`Found ${data.posts.length} posts`);
        renderPosts(data.posts);

    } catch (err) {
        console.error(err);
        setStatus("Error fetching data");
        clearOutput();
    }
});