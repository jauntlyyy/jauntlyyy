require('dotenv').config();


// Database connection
var knex = require('knex') ({
  client: 'mysql',
  connection: {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
  },
  pool: {
    min: 0,
    max: 7
  }
});


// Schema
knex.schema.createTableIfNotExists('users', function (user) {
  user.increments('id').primary();
  user.string('Email').unique();
}).then(function() {
  console.log('users table created');
});

knex.schema.createTableIfNotExists('events', function (event) {
  event.increments('id').primary();
  event.string('inputTitle');
  event.integer('userId').unsigned();
  event.foreign('userId').references('id').inTable('users');
  event.dateTime('datetimeValue');
  event.string('duration');
  event.string('address');
  event.string('latlng');
  event.string('imageUrl');
}).then(function() {
  console.log('events table created');
});

knex.schema.createTableIfNotExists('users_events', function(join) {
  join.integer('EventID').unsigned();
  join.integer('UserId').unsigned();
  join.foreign('EventID').references('id').inTable('events');
  join.foreign('UserId').references('id').inTable('users');
}).then(function() {
  console.log('users_events join table created');
});


module.exports = {
  knex: knex
};
