"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/:url", (req, res) => {
    console.log(req.body);
    //now insert into options table
    knex('vote').insert({
      poll_id: req.body.pollId,
    })
      .returning('id')
      .then(function(response) {
        // INSERT INTO option (for each option provided)
        for (let i = 0; i < options.length; i++) {
          knex('preference')
            .insert({
              vote_id: response[0],
              option_id: options[i].id,
              rank: i + 1
            })
            .then();
        }
      });
      res.redirect('results');
  })

  router.get("/:url", (req, res) => {
    knex
      .select("poll.question", "option.poll_id", "option.name", "option.id")
      .from("poll")
      .join("option", "poll.id", "=", "option.poll_id")
      .where(knex.raw("voting_url = ?", req.params.url))
      .then((results) => {
        if (!results.length) {
          res.redirect("/error");
        } else {
          console.log("hereEEEEEEEEEE:", results)
          let templateVars = {
            question: results[0].question,
            options: [],
            url: req.params.url,
            poll_id: results[0].poll_id
           }

          for (let entry of results) {
            templateVars.options.push( { 
              name: entry.name,
              id: entry.id  
            } ); 
          }

          res.render("poll", templateVars);
        }
    });
  });

  router.get(/.*/, (req, res) => {
    res.redirect("/error");
  });

  return router;
}
