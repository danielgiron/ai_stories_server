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
  console.log(`Listening on Port ${PORT}. aIrina up.`);
});

app.get("/home", (req, res) => {
  console.log("Someone connected to /home");
  res.send("Connected to /home");
});

app.post("/story", async (req, res) => {
  let { messages } = req.body;

  messages[messages.length - 1].content +=
    ". Tell me four more sentences of story.";

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 250,
    temperature: 1.2,
    messages: messages,
  });

  if (completion?.data?.error?.code === "context_length_exceeded") {
    res.send({ error: "context_length_exceeded" });
  } else if (completion?.data?.error?.code === "internal_error") {
    res.send({ error: "internal_error" });
  }
  const text = completion.data;
  // console.log({ text });
  res.send(text);
});
