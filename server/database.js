var knex = require('knex') ({
  client: 'mysql',
  connection: {
    host: 'mysqlcluster16.registeredsite.com',
    user: 'joinme',
    password: '!Qaz2wsx',
    database: 'joinme'
  },
  pool: {
    min: 0,
    max: 7
  }
});

var bookshelf = require('bookshelf')(knex);

knex.schema.createTableIfNotExists('users', function (user) {
  user.increments('id').primary();
  // user.string('FirstName');
  // user.string('LastName');
  // user.string('Username');
  user.string('Email');
}).then(function() {
  console.log('users table created');
});

knex.schema.createTableIfNotExists('events', function (event) {
  event.increments('id').primary();
  event.string('inputTitle');
  // event.integer('Owner_id').references('User_id');
  event.integer('userId').unsigned();
  event.foreign('userId').references('id').inTable('users');
  event.dateTime('datetimeValue');
  event.string('duration');
  event.string('address');
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

var db = bookshelf;

var User = {};
User.findUser = function (email) {
  console.log('inside findUser');
  return new Promise (function (resolve) {
    if (resolve) {
      resolve(knex('users').select('*').where({Email: email}));
    }
  })
}

User.addUser = function (email) {
  return new Promise (function(resolve) {
    if (resolve) {
      knex('users').insert({ Email: email }).then(function() {
        resolve(true);
      });
    }
  });
};

Events = {};

Events.eventID = function (inputTitle, Email, datetimeValue, duration, address) {
  console.log('inside eventID')
  return new Promise (function (resolve) {
    if (resolve) {
      knex('events').where({
        inputTitle: inputTitle,
        userId: knex('users').where({Email: Email}).select('id'),
        datetimeValue: datetimeValue,
        duration: duration,
        address: address
      }).select('id').then(function(data) {
        console.log('dataid', data[0].id);
        resolve(data[0].id);
      });
    }
  });
};

module.exports = {
  db: db,
  knex: knex,
  User: User,
  Events: Events
};
