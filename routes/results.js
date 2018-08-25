"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:url", (req, res) => {
    knex
      .select("poll.question", "option.id", "option.name", "preference.rank")
      .from("poll")
      .join("option", "poll.id", "=", "option.poll_id")
      .join("preference", "option.id", "=", "preference.option_id")
      .where(knex.raw("results_url = ?", req.params.url))
      .then((results) => {
        if (!results.length) {
          console.log("error: preference query was empty")
          res.redirect("/error");
        } else {
          let templateVars = {
            question: results[0].question,
            options: [],
          };

          // first collect the scores into an object; we'll later turn that into templateVars.options
          let optionsObj = {};

          // use Nauru system: see, for example, https://en.wikipedia.org/wiki/Borda_count#Dowdall_system_(Nauru)
          for (let entry of results) {
            if (!optionsObj[entry.id]) {
              optionsObj[entry.id] = {
                name: entry.name,
                score: 1 / entry.rank,
              };
            } else {
              optionsObj[entry.id].score += 1 / entry.rank;
            }
          }

          for (let id in optionsObj) {
            templateVars.options.push(optionsObj[id]);
          }
          templateVars.options.sort( (a, b) => b.score - a.score );

          console.log("okay, ready to render results");
          res.render("results", templateVars);
        }
      });
  });

  router.get(/.*/, (req, res) => {
    res.redirect("/error");
  });

  return router;
};
