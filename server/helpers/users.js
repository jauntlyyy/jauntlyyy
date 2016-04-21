var knex = require('../database').knex;
var User = {};

User.findUser = function (email) {
  return new Promise (function (resolve) {
    if (resolve) {
      resolve(knex('users').select('*').where({Email: email}));
    }
  })
};

User.addUser = function (data) {
  return new Promise (function(resolve) {
    if (resolve) {
      console.log('data in promise', data.fbid, data.name,data.Email)
      knex('users').insert({fbid: data.fbid, name: data.name, Email: data.Email }).then(function() {
        resolve(true);
      });
    }
  });
};

module.exports = User;
