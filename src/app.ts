import express from "express";

const app = express();

app.get("/", (req, res) => {
    return res.send("hello\n");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Backend started at http://localhost:${port}`);
});
