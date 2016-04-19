# join.me

Find other travellers to explore with abroad!

![join.me logo](./www/img/joinme.png "joinme")

# About
  Travel often? Looking to meet people? join.me to the rescue. join.me   
  is an app that brings people and experiences together. Login, find an event, create an event, meet new people. It's that simple. At join.me, it's not just about the places you visit, it's also about the people you meet.

# Getting Started
* Fork a copy of the repo. Clone it to your local machine. 
  
* Next, you'll need to install our dependencies on your terminal:

```
$ npm install
```
```
$ bower install
```

* Also, you'll need to add a file for API keys:
```
 	www/js/apiKey.js

 	var expKey = "insert expedia key";
	var expSec = "insert expedia secret";
	var googleMapsApiKey = "insert google key";
	var fbAppKey = "insert fb app key";
	var firebaseKey = "insert firebase key";
```
* Also, add a .env file in the root directory:
```
	host = ******
	user = ******
	password = ******
	database = ******
```
* And a MySQL database account: 
```
	https://www.mysql.com/
```
* To start the server and view the app on localhost:8100:

```
$ node server/server.js 
```
* To start the server and view your app on different platforms:

```
$ ionic serve --lab
```
* You should now be able to view the app. 
  
# Milestones
* Set up system for users to login (Oauth)
* Setup database (MySQL) to store user info and events
* Integrated Expedia API, GoogleMaps, GoogleGeocode 
* Datetime Picker

# Backlog
* Geolocation
* Event notifications
* Deletion of passed events
* Custom events
* Chat system
* User profiles
* Datetime formatting
* Join/unjoin details

# Technology & Links

* AngularJS <https://angularjs.org>
* Cordova Plug-ins <https://github.com/apache/cordova-js>
* Expedia API <http://developer.ean.com>
* ExpressJS <http://expressjs.com>
* Facebook Oauth <https://developers.facebook.com/docs/facebook-login/web>
* Gulp <http://gulpjs.com>
* Ionic <http://ionicframework.com>
* Knex <http://knexjs.org>
* MySQL <https://www.mysql.com>
* NodeJS <https://nodejs.org/en/>
* GoogleMaps <https://developers.google.com/maps/>
* Moment.JS <https://github.com/urish/angular-moment>


## Team Members ##

- Product Owner, Frontend: Jeong Min Lee
- Scrum Master, Frontend: Tiffany Wu
- Backend, Frontend: Jane Fong, Jonathan Lee
