const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("log");
const submitBtn = document.getElementById("send");

const entriesDiv = document.getElementById("entries");

submitBtn.addEventListener("click", () => {
    if (titleInput.value && bodyInput.value)
        fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            body: JSON.stringify({
                title: titleInput.value,
                body: bodyInput.value,
                date: new Date().toUTCString()
            })
        }).then(() => { getEntries(); });
});

function getEntries() {
    fetch("/entries", {
        method: "GET"
    })
        .then(res => res.json())
        .then(data => {
            entriesDiv.innerHTML = "";

            data.forEach(el => {
                console.log(el)
                entriesDiv.innerHTML += `
                    <div class="entry">
                        <h3>${el.title}</h3>
                        <p>${el.body}</p>
                        <h5>${el.date}</h5><br>
                    </div>
                `;
            });
        });
}

getEntries();