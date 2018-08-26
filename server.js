"use strict";

require('dotenv').config(); 
 
const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const cookieSession = require("cookie-session");
const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY, 
  domain: process.env.MAILGUN_DOMAIN
});

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const createRoutes = require("./routes/create");
const doneRoutes = require("./routes/done");
const pollRoutes = require("./routes/poll");
const resultsRoutes = require("./routes/results");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded',
}));
app.use(express.static("public"));

app.use(cookieSession({
  name: 'session',
  keys: ['very secret key'],

  // Cookie Options
  maxAge: 60 * 60 * 1000,
}));

// Mount all resource routes
app.use("/poll", pollRoutes(knex));
app.use("/done", doneRoutes(knex));
app.use("/create", createRoutes(knex));
app.use("/results", resultsRoutes(knex));

// Home page
app.get(["/", "/index"], (req, res) => {
  var data = {
    from: 'Hallo <hallo@eigenpunch.com>',
    to: process.env.MAILGUN_ADDRESSEE_TEST,
    subject: 'Hallo',
    text: 'Testing some Mailgun awesomeness!'
  };
   
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
  res.render("index");
});

// Error
app.get("/error", (req, res) => {
  res.render("error");
});

app.get(/.*/, (req, res) => {
  res.redirect("error");
});

app.listen(PORT, () => {
  console.log(`Askie listening on port ${PORT}! :D`);
});