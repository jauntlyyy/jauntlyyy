var express = require('express');
var knex = require('../database').knex;
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());

module.exports = {
  ":event_id": {
    get: function (req, res) {
      knex('users_events').where('eventID', req.params.event_id).join('users', 'users.id', '=', 'users_events.userId').then(function (data) {
        res.send(data);
      });
    },
    post: function (req, res) {
      knex('events').where({ id: req.params.event_id}).select('userId')
        .then(function (data) {
          res.send(data);
        })
    }
  }
};
