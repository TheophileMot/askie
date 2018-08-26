"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // assign judgement for CSS
  function judge(score) {
    if (score >= 99) {
      return "judgement-excellent";
    } else if (score >= 60) {
      return "judgement-good";
    } else if (score >= 20) {
      return "judgement-bad";
    } else {
      return "judgement-terrible";
    }
  }

  // write message according to number of votes
  function writeVoteMessage(numVotes) {
    if (numVotes == 0) {
      return 'No votes yet! Remember to tell your friends to weigh in on this pressing matter.';
    } else if (numVotes == 1) {
      return 'Based on a single vote.';
    } else if (numVotes <= 20) {
      return `Based on ${numVotes} votes.`;
    } else {
      return `Based on ${numVotes} votes. This is a hot issue!`;
    }
  }

  router.get("/:url", (req, res) => {
    // parse '-json' suffix
    const isJSONrequest = (req.params.url.slice(-5) === '-json');
    const parsedUrl = isJSONrequest ? req.params.url.slice(0, -5) : req.params.url;

    knex
      .select("poll.question", "option.id", "option.name")
      .from("poll")
      .join("option", "poll.id", "=", "option.poll_id")
      .where(knex.raw("results_url = ?", parsedUrl))
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
              id: entry.id,
              name: entry.name,
              score: 0,
              judgement: '',
              voteMessage: '',
            };
          }

          knex
            .select("poll.question", "option.id", "option.name", "preference.rank")
            .from("poll")
            .join("option", "poll.id", "=", "option.poll_id")
            .join("preference", "option.id", "=", "preference.option_id")
            .where(knex.raw("results_url = ?", parsedUrl))
            .then(results => {
              // use Nauru system: see, for example, https://en.wikipedia.org/wiki/Borda_count#Dowdall_system_(Nauru)
              for (let entry of results) {
                optionsObj[entry.id].score += 1 / entry.rank;
              }

              // convert object to sorted array so that results get displayed according to scores
              for (let id in optionsObj) {
                templateVars.options.push(optionsObj[id]);
              }
              templateVars.options.sort((a, b) => b.score - a.score);

              // finally, convert each option to percentage and judge how good it is
              const maxScore = templateVars.options[0].score || 1;
              for (let i = 0; i < templateVars.options.length; i++) {
                templateVars.options[i].score = Math.round(100 * templateVars.options[i].score / maxScore);
                templateVars.options[i].judgement = judge(templateVars.options[i].score);
              }

              // # votes = # ranked choices from all votes / # choices per vote
              templateVars.numVotes = results.length / templateVars.options.length;
              templateVars.voteMessage = writeVoteMessage(templateVars.numVotes);

              if (isJSONrequest) {
                res.json(templateVars);
              } else {
                res.render("results", templateVars);
              }
            });
        }
      });
      
  });

  router.get(/.*/, (req, res) => {
    res.redirect("/error");
  });

  return router;
};
