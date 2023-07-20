const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const dotenv = require("dotenv").config();
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;
const configuration = new Configuration({
  organization: process.env.OPENAI_API_ORG,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}.`);
});

app.get("/home", (req, res) => {
  console.log("Someone connected to /home");
  res.send("Connected to /home");
});

app.post("/gpt", async (req, res) => {
  const { message } = req.body;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 150,
    temperature: 1.4,
    frequency_penalty: 1,
    presence_penalty: 1,
    messages: [
      {
        role: "system",
        content: `${
          process.env.GAME_DETAILS
        } The player desires the location to be ${"abandoned zoo"}.`,
      },
    ],
  });
  const text = completion?.data.choices[0].message;
  // console.log(text);
  res.send(text);
});
