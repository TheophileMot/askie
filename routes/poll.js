"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/:url", (req, res) => {
    // first make sure that this url actually corresponds to a poll in database
    knex
      .select("results_url")
      .from("poll")
      .where(knex.raw("voting_url = ?", req.params.url))
      .then(results => {
        if (!results.length) {
          res.redirect("/error");
        } else {
          knex('vote').insert({
            poll_id: req.body.pollId,
          })
            .returning('id')
            .then(function(response) {
              // INSERT INTO preference table, assigning each option a rank according to its index in array
              for (let i = 0; i < req.body.options.length; i++) {
                knex('preference')
                  .insert({
                    vote_id: response[0],
                    option_id: req.body.options[i].id,
                    rank: i + 1,
                  })
                  .then();
              }
              // we can't just redirect here, since this will be part of an ajax call:
              let servResp = {};
              servResp.success = true;
              servResp.redirect = true;
              servResp.redirectURL = `/results/${results[0].results_url}`;
              res.send(servResp);
            });
        }
      });
  });

  router.get("/:url", (req, res) => {
    knex
      .select("poll.question", "option.poll_id", "option.name", "option.id")
      .from("poll")
      .join("option", "poll.id", "=", "option.poll_id")
      .where(knex.raw("voting_url = ?", req.params.url))
      .then(results => {
        if (!results.length) {
          res.redirect("/error");
        } else {
          let templateVars = {
            question: results[0].question,
            options: [],
            url: req.params.url,
            poll_id: results[0].poll_id,
          };

          for (let entry of results) {
            templateVars.options.push( {
              name: entry.name,
              id: entry.id,
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
};