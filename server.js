require('dotenv').config();

var express = require('express'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    router = express.Router();
    userAppRoutes = require('./app/routes/user-api')(router),           //User-api routes
    locationAppRoutes = require('./app/routes/location-api')(router);   //location-api routes
    photoAppRoutes = require('./app/routes/photo-api')(router);         //Photo-api routes
    path = require('path');

var app = express();
var port = process.env.PORT || 8080;

app.use(morgan('dev')); //To log http requests to console (helpful for debugging)
app.use(bodyParser.json({limit: '50mb'})); //To parse application/json form requests
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb'})); //To parse application/x-www-urlencoded form requests

app.use('/user-api', userAppRoutes); //Back-end routes user http://<url>/user-api
app.use('/location-api', locationAppRoutes); //Back-end routes for location http://<url>/location-api
app.use('/photo-api', photoAppRoutes); //Back-end routes for photos http://<url>/photo-api

app.use(express.static(__dirname + '/public')); //Giving the front-end access to this folder

//Connecting to database
//Using environment variables to access database can be set on heroku when deploying
//To work locally create a .env and there store login credentials to database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true}, function(err){
  if(err){
    console.log('Databse connection error:\n' + err);
  }
  else{
    console.log('Successfully connected to database');
  }
});

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//Instantiating a server at port of the process environment (heroku) or at 8080 (default).
app.listen(port, function() {
  console.log("Server is listening on port: " + port);
});
