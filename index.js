const express = require("express");
const app = express();
// const session = require("cookie-session");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const dotenv = require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}.`);
});

app.get("/home", (req, res) => {
  res.send("Connected to /home");
});
