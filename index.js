import express from "express";

const port = 8000;
const app = express();


app.get("/hello", (req, res) => {
    res.download(".gitignore");
});

app.listen(port, () => {
});


