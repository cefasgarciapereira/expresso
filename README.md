<p align="center">
  <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
    <img width="150" src="./public/expresso.webp" alt="Expresso logo" style="border-radius:100%"/>
  </a>
</p>
<br/>

# Expresso Chatbot

>Expresso is a Node.Js starter project for those who wants to use the [Cloud API](https://developers.facebook.com/docs/whatsapp/) and [Dialogflow](https://cloud.google.com/dialogflow/docs/) to develop WhatsApp chatbots or automations and wants to avoid some boilerplate.

## Third Party Tools

A little bit about the tools that this project relies on. Remember that for this project to work you must have an application configured in [Meta's](https://developers.facebook.com/?no_redirect=1) api and an agent configured in [Dialogflow](https://cloud.google.com/dialogflow/es/docs).

### Cloud Api

The [Meta](https://developers.facebook.com/?no_redirect=1)  provided an api capable of establishing communication via whatsapp, the [Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api/). Now, it is possible to intercept the communication with a third user through a webhook. In this project, the webhook is already implemented, so you just need to have a Meta developer account and create a new application to receive your token.

Once your project is live with a valid domain, you must paste `<your domain>/webhook` in the **Callback URL** field in your application settings on the Cloud Api platform. The verification token is defined by you and can contain any value you wish, it works like a password.

### Dialogflow

[Dialogflow](https://cloud.google.com/dialogflow/docs/), by [Google](https://developers.google.com/),  is a natural language processing platform that makes it easy to design and integrate a conversational UI with mobile apps, web, bots, interactive voice response systems, etc. Using Dialogflow, you can provide new and compelling ways for users to interact with your product.

To develop more customized solutions within the Dialogflow platform, you must pay, or develop your own webhook that responds to dialogflow requests. And that's what we do here: the bridge between dialogflow and your code. When the user sends a message like: `"I want to buy a red t-shirt size S"` the dialog flow will handle the received message from the user and tell us that the user wants to make a **purchase** and that the variables are: `product = shirt , size = p, color = red`. And then we can execute actions on top of this request, like retrieve the price or do the purchase itself.

## Running

Create the `.env` following the example file and then run one of these:

### Watch mode
```
npm i && npm run dev
```

### Run mode
```
npm i && npm run start
```

## Contribution

You're very welcome to contribute.
See [Contributing Guide](CONTRIBUTING.md).

## License

[MIT](LICENSE.md)