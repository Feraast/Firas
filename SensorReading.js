// HERE I'M CREATING MY USER SCHEMA
// need the mongoose module
const mongoose = require('mongoose');
const fs = require('fs');
var bodyParser = require('body-parser');

// localhost:27017 is where mongo service is running 
// Connect to the database
mongoose.connect('mongodb://localhost:27017/sensors', {useNewUrlParser: true, useUnifiedTopology: true});

// we create a schema first 
// Define our schema
const sensorReading = new mongoose.Schema({
    index: String,
    value: String,
  })


// we create a collection called userModel with the userSchema
module.exports = new mongoose.model('readingModel', sensorReading); 
