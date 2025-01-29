var express = require('express');
var bodyParser = require('body-parser');

// create express app
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())


const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://venkat:Ihate123@cluster1.eranp.mongodb.net/";

async function connectDB() {
  try {
    await mongoose.createConnection(mongoURI, {
     
      dbName:"userManagement",
      
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

connectDB();

// define a simple route
app.get('/', function(req, res){
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

require('./app/routes/user.routes.js')(app);

// listen for requests
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});
