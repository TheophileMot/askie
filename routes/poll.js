"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/:url", (req, res) => {
    console.log(req.body);
    //now insert into options table

  })

  router.get("/:url", (req, res) => {
    knex
      .select("poll.question", "option.name", "poll_id")
      .from("poll")
      .join("option", "poll.id", "=", "option.poll_id")
      .where(knex.raw("voting_url = ?", req.params.url))
      .then((results) => {
        if (!results.length) {
          res.redirect("/error");
        } else {
          let templateVars = {
            question: results[0].question,
            options: [],
            url: req.params.url,
            poll_id: results[0].poll_id
           }

          for (let entry of results) {
            templateVars.options.push(entry.name); 
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
