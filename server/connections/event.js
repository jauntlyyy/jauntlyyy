var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var knex = require('../database').knex;
var Users = require('../collections/userCollection');
var Event = require('../models/eventModel');
var Events = require('../collections/eventCollection');
var db = require('../database').Events

var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());

module.exports = {
  events: {
    get: function (req, res) {
      //want to get one user
      console.log(req);
      knex('users').where({Email: req.body.Username}).select('id').then(function (data) {
        knex('events').where({'userId': data[0].id}).select('EventName').then(function (data) {
          res.send(data);
        });
      });
    },
    post: function (req, res) {
      console.log('inside api post', req);
      knex('events').insert({
          inputTitle: req.body.inputTitle,
          userId: knex('users').where({Email: req.body.Email}).select('id'),
          datetimeValue: req.body.datetimeValue,
          duration: req.body.duration,
          address: req.body.address
        })
        .then(function () {
          db.eventID(req.body.inputTitle, req.body.Email, req.body.datetimeValue, req.body.duration, req.body.address)
            .then(function (data) {
              return data;
            }).then(function (data) {
            console.log('data inside eventid: ', data);
            knex('users_events').insert({
              EventID: data,
              UserId: knex('users').where({Email: req.body.Email}).select('id')
            })
          }).then(function () {
            res.send('event added');
          });

          // res.send('Event added.');
        });
    }
  }
}
