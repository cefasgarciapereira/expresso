const express = require("express");
const dialogflow = require("dialogflow");

const router = express.Router();
const projectId = process.env.PROJECT_ID;

router.get('/', async (req, res) => {
    console.log("A get reached this endpoint", req);
});

router.post("/", async (req, res) => {
    console.log("A post reached this endpoint", req);
});

module.exports = app => app.use('/dialogflow', router);