"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  const sortByScore = (a, b) => b.score - a.score;

  router.get("/:url", (req, res) => {
    knex
      .select("poll.question", "option.id", "option.name")
      .from("poll")
      .join("option", "poll.id", "=", "option.poll_id")
      .where(knex.raw("results_url = ?", req.params.url))
      .then(results => {
        if (!results.length) {
          res.redirect("/error");
        } else {
          let templateVars = {
            question: results[0].question,
            options: [],
          };
          
          let optionsObj = {};
          for (let entry of results) {
            optionsObj[entry.id] = {
              name: entry.name,
              score: 0,
            };
          }

          knex
            .select("poll.question", "option.id", "option.name", "preference.rank")
            .from("poll")
            .join("option", "poll.id", "=", "option.poll_id")
            .join("preference", "option.id", "=", "preference.option_id")
            .where(knex.raw("results_url = ?", req.params.url))
            .then(results => {
              // use Nauru system: see, for example, https://en.wikipedia.org/wiki/Borda_count#Dowdall_system_(Nauru)
              for (let entry of results) {
                optionsObj[entry.id].score += 1 / entry.rank;
              }

              // convert object to sorted array so that results get displayed according to scores
              for (let id in optionsObj) {
                templateVars.options.push(optionsObj[id]);
              }
              templateVars.options.sort(sortByScore);

              res.render("results", templateVars);
            });
        }
      });
  });

  router.get(/.*/, (req, res) => {
    res.redirect("/error");
  });

  return router;
};
