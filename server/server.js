var express = require('express');
var app = express();
var port = process.env.PORT || 8100;
var bodyParser = require('body-parser');
var eventRoute = require('./routes/eventRoute.js');
var filterRoute = require('./routes/filterEventsRoute.js');
var userRoute = require('./routes/userRoute.js');
var unjoinRoute = require('./routes/unjoinEventsRoute.js');
var loginRoute = require('./routes/loginRoute.js');
var myEventsRoute = require('./routes/myEventsRoute.js');
var joinRoute = require('./routes/joinEventsRoute.js');
var singleEventRoute = require('./routes/singleEventRoute.js');
// Require .env
require('dotenv').config();


// Serve client files
app.use(express.static('./www'));

// Use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Routes
app.use('/api/events/',eventRoute);
app.use('/api/users/', userRoute);
app.use('/api/unjoinevent', unjoinRoute);
app.use('/api/myevents/', myEventsRoute);
app.use('/api/filter/', filterRoute);
app.use('/api/login', loginRoute);
app.use('/api/join/', joinRoute);
app.use('/api/event',singleEventRoute);


app.listen(port, function(){
  console.log('Listening on port ' + port + '...');
});
