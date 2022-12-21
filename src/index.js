const express = require("express");
const bodyParser = require("body-parser");
const dialogflow = require("dialogflow");
const app = express();
const port = 3000;
const whatsapp = require("./utils/whatsapp");

app.use(bodyParser.json());

// Variables
const projectId = process.env.PROJECT_ID;

app.get("/", (_, res) => {
    res.send("The server is up 🤖");
});

app.listen(port, () => {
    console.log(`The server is listening on port ${port} ✨`);
});

app.get("/webhook", async (req, res) => {
    /**
     * UPDATE YOUR VERIFY TOKEN
     *This will be the Verify Token value when you set up webhook
     **/
    const verify_token = process.env.VERIFY_TOKEN;

    // Parse params from the webhook verification request
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode were sent
    if (mode && token) {
        // Check the mode and token sent are correct
        if (mode === "subscribe" && token === verify_token) {
            // Respond with 200 OK and challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});

// Accepts POST requests at /webhook endpoint
app.post("/webhook", async (req, res) => {
    if (req.body.object) {
        if (
            req.body.entry &&
            req.body.entry[0].changes &&
            req.body.entry[0].changes[0] &&
            req.body.entry[0].changes[0].value.messages &&
            req.body.entry[0].changes[0].value.messages[0]
        ) {
            // Get Variables
            let to = req.body.entry[0].changes[0].value.metadata.phone_number_id;
            let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
            let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload

            // Define Dialogflow Session
            const sessionClient = new dialogflow.SessionsClient({
                keyFilename: require("path").join("dialog-flow-credentials.json"),
            });
            const sessionPath = sessionClient.sessionPath(projectId, from);
            const request = {
                session: sessionPath,
                queryInput: {
                    text: {
                        text: msg_body,
                        languageCode: "pt-BR",
                    },
                },
            };

            // Get Dialogflow Responses
            try {
                const fulfillmentMessages = (
                    await sessionClient.detectIntent(request)
                )[0].queryResult.fulfillmentMessages;
                for (const response of fulfillmentMessages) {
                    let responseMsg = "";
                    if (response.text) {
                        for (const text of response.text.text) {
                            responseMsg = `${responseMsg}${text}\n`;
                        }
                    }
                    await whatsapp.send(to, from, responseMsg);
                }
            } catch (e) {
                console.error("Error while getting dialog flow responses", e);
                res.sendStatus(403);
            }
            res.sendStatus(200);
        }
    } else {
        // Return a '404 Not Found' if event is not from a WhatsApp API
        res.sendStatus(404);
    }
});