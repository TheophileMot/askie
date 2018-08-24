"use strict";

const express = require('express');
const router  = express.Router();
const generateRandomString = () => Math.floor(Math.random() * 1e12).toString(36);

module.exports = (knex) => {

  router.get("/", (req, res) => {
    console.log('GET create');
    
    res.render("create");
  });

  router.post("/", (req, res) => {
    console.log('POST create');

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
              // break for loop when we've run through the options
              break;
            }
          }
        });


      req.session.question = question;
      req.session.voting_url = voting_url;
      req.session.results_url = results_url;
      res.redirect("/done");
    }
  });

  return router;
}

