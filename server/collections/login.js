var express = require('express');
var User = require('../helpers/users');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());

module.exports = {
  'user': {
    post: function(req, res) {
      User.findUser(req.body.Email).then(function(data) {
        if (data.length > 0) {
          console.log('find user')
          res.redirect('/#/app/myevents');
        } else {
          User.addUser(req.body).then(function() {
            res.send('user added');
          })
        }
      })

    }
  }
};

