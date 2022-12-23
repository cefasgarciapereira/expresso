const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (_, res) => {
    res.send("The server is up 🤖");
});

require('./webhooks/whatsapp')(app);
require('./webhooks/dialogflow')(app);

app.listen(process.env.PORT || 3000, function () {
    console.log("The server is listening on port %d ✨", this.address().port);
});