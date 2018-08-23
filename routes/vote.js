"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:url", (req, res) => {
    knex
      .select("*")
      .from("poll")
      .where(knex.raw("voting_url = ?", req.params.id))
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
