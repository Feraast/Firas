var express = require("express");
var mongoose = require("mongoose");

// localhost:27017 is where mongo service is running 
// Connect to the database
mongoose.connect('mongodb://localhost:27017/sensorReadings', {useNewUrlParser: true, useUnifiedTopology: true});

// we create a schema first 
// Define our schema
const reading = new mongoose.Schema({
    sensorValue: Number,
  })


// we create a collection called userModel with the userSchema
Reading = new mongoose.model('reading', reading); 

var bodyParser = require('body-parser');

// create an app 
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res){


res.redirect("./mqttclientjq.html");

});

app.post('/saveValue', function(req,res){


    console.log(req.body.sensorValue);

    let readingToSave = new Reading({

        sensorValue: req.body.sensorValue

    });

    readingToSave.save().then(console.log("successfully saved reading!"));

});


app.get('/about', function(req, res) {
    res.type('text/plain');
    res.send('This is the response to about');
});

// custom 404 page 
app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - I do not understand what you mean');
});

// custom 500 page 
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

// speficy the port to listen to. 
app.set('port', process.env.PORT || 7777);


// launch 

app.listen(app.get('port'), function() {

    Reading.deleteMany({},
        function (err) {
            if (err) {
                console.log("error  reading readings");
            } else {
                console.log("deleted successfully");
            }
        }
    )


    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});


