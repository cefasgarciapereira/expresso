const axios = require("axios").default;
const whatsAppToken = process.env.WHATSAPP_TOKEN;

module.exports = {
    async send(from, to, msg_body){
        try {
            to = to.substring(0, 4) + "9" + to.substring(4);

            var data = JSON.stringify({
                messaging_product: "whatsapp",
                to: to,
                type: "text",
                text: {
                    preview_url: false,
                    body: msg_body,
                },
            });

            var config = {
                method: "post",
                url: "https://graph.facebook.com/v15.0/" + from + "/messages",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${whatsAppToken}`,
                },
                data: data,
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.error("Error while Axios POST to facebook: ", error);
                });
        } catch (err) {
            console.error("Unexpected error while sending message: ", err);
        }
    }
}