"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

    router.get("/", (req, res) => {
        res.render("create");
      });

  router.post("/", (req, res) => {
      
    // knex
    //   .select("poll.question", "option.name")
    //   .from("poll")
    //   .join("option", "poll.id", "=", "option.poll_id")
    //   .where(knex.raw("voting_url = ?", req.params.url))
    //   .then((results) => {
    //     if (!results.length) {
    //       res.redirect("/done");
    //     } else {
    //       res.render(results);
    //     }
    // });
  });

  return router;
}

