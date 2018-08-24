"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:url", (req, res) => {
    console.log('GET poll');


    
    // console.log("THIS IS REQ PARAMS URL", req.params.url)

    knex
      .select("poll.question", "option.name")
      .from("poll")
      .join("option", "poll.id", "=", "option.poll_id")
      .where(knex.raw("voting_url = ?", req.params.url))
      .then((results) => {
        if (!results.length) {
          res.redirect("/");
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
