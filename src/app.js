const express = require("express");
const app = express();
const sqlite = require("sqlite3")

const PORT = 8000;

app.use(express.static(__dirname + "/public"));
app.use(express.json());

const db = new sqlite.Database("data.db")
db.run("CREATE TABLE IF NOT EXISTS entries(title text, body text, date text)")

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/", (req, res) => {
    db.run("INSERT INTO entries(title, body, date) VALUES (?, ?, ?)", req.body.title, req.body.body, req.body.date)
    res.end()
});

app.get("/entries", (req, res) => {
    db.all("SELECT * FROM entries", (err, rows) => {
        if (!err) {
            res.json(rows)
        } else console.error(err.message)
    })
})

app.listen(8000, () => {
    console.log(`App listening on port ${PORT}`);
});