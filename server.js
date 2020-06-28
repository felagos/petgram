const express = require("express");

const app = express();

app.use(express.static("./www"));

app.get("/*", (req, res) =>
    res.sendFile("index.html", { root: "www/" }),
);

app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
        next();
    }
});

app.listen(process.env.PORT || 8080, () => {
    console.log("server up !");
});