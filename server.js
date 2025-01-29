var express = require('express');
var bodyParser = require('body-parser');

// create express app
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
  })
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.error("MongoDB connection error:", err));




// define a simple route
app.get('/', function(req, res){
    res.json({"message": "Welcome to User management application. Create users quickly. Organize and keep track of all your users."});
});

require('./app/routes/user.routes.js')(app);

// listen for requests
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});
