const express = require("express");
const app = express();

app.get("/", (req, resp) => {
    resp.send("hello");
});
app.listen(5000);