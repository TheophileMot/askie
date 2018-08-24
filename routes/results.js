"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:url", (req, res) => {
    knex
      .select("poll.question", "option.id", "option.name", "preference.option_id", "preference.rank")
      .from("poll")
      .join("option", "poll.id", "=", "option.poll_id")
      .join("preference", "option.id", "=", "preference.option_id")
      .where(knex.raw("results_url = ?", req.params.url))
      .then((results) => {
        if (!results.length) {
          res.redirect("/error");
        } else {
          let templateVars = {
            question: results[0].question,
            options: []
           }

          for (let entry of results) {
            templateVars.options.push(entry.name); 
          }

          res.render("poll", templateVars);
        }
    });
  });

  return router;
}

//taking info from a cookie ( don't want to do this )
