"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:url", (req, res) => {
    console.log('GET poll');

    knex
      .select("poll.question", "option.name")
      .from("poll")
      .join("option", "poll.id", "=", "option.poll_id")
      .where(knex.raw("voting_url = ?", req.params.url))
      .then((results) => {
        if (!results.length) {
          res.redirect("/");
        } else {
          res.render("/poll");
        }
    });
  });

  return router;
}

