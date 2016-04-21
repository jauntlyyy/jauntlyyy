var express = require('express');
var Event = require('../helpers/event');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());

module.exports = {
  ':event_id': {
    get: function(req, res) {
      Event.get(req.params.event_id)
        .then(function(data) {
          res.send('get successful', data);
        })
    },

    delete: function(req, res) {
      console.log('req.params in myEvents', req.params)
      Event.delete(req.params.event_id)
        .then(function(deleted) {
          if (deleted) {
            res.send('delete successful');
          }
        })
    }
  }
};
