const express = require("express");
var enforce = require("express-sslify");
const app = express();

app.use(express.static("./www"));
app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.get("/*", (req, res) =>
    res.sendFile("index.html", { root: "www/" }),
);


app.listen(process.env.PORT || 8080, () => {
    console.log("server up !");
});