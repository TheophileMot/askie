"use strict";

const express = require('express');
const router  = express.Router();
const generateRandomString = () => Math.floor(Math.random() * 1e12).toString(36);

module.exports = (knex) => {

  router.get("/", (req, res) => {
    let templateVars = {
      question: 'What should we eat for supper?',
      option1: 'Porridge',
      option2: 'Squash',
      option3: 'Cruciferous veggies',
    };
    res.render("create", templateVars);
  });

  router.post("/", (req, res) => {
    const question = req.body.question;
    if (!question) {
      res.redirect("/error");
    } else {
      const voting_url = generateRandomString();
      const results_url = generateRandomString();

      // INSERT INTO poll
      knex('poll').insert({
        question: question,
        voting_url: voting_url,
        results_url: results_url
      })
        .returning('id')
        .then(function(response) {
          // INSERT INTO option (for each option provided)
          for (let i = 1; ; i++) {
            let option = req.body['option' + i];
            if (option) {
              knex('option')
                .insert({
                  name: option,
                  poll_id: response[0]
                })
                .then();
            } else {
              // break loop when we've run through the options
              break;
            }
          }
        });

      // set up cookie with URL info, then redirect
      req.session.question = question;
      req.session.voting_url = voting_url;
      req.session.results_url = results_url;
      res.redirect("/done");
    }
  });

  router.get("/error1", (req, res) => {
    let templateVars = {
      question: 'Why am I here?',
      option1: 'Why not?',
      option2: 'The Internet broke',
      option3: 'Is this really an error page?',
    };
    res.render("create", templateVars);
  });

  router.get("/error2", (req, res) => {
    let templateVars = {
      question: 'Is the site broken?',
      option1: 'Nope.',
      option2: 'No way.',
      option3: 'Maybe?!',
    };
    res.render("create", templateVars);
  });

  router.get("/error3", (req, res) => {
    let templateVars = {
      question: 'Who\'s the fluffiest cat?',
      option1: 'Meowy',
      option2: 'Fluffers',
      option3: 'Miss Whiskers',
    };
    res.render("create", templateVars);
  });

  router.get(/.*/, (req, res) => {
    res.redirect("/error");
  });

  return router;
}

