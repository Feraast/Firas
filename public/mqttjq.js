var wsbroker = "localhost";  //mqtt websocket enabled broker
var wsport = 9003; // port for above
//var wsbroker = "broker.hivemq.com";  //mqtt websocket enabled broker
// var wsport = 8000 // port for above
// create client using the Paho library


var client = new Paho.MQTT.Client(wsbroker, wsport,
    "myclientid_" + parseInt(Math.random() * 100, 10));
client.onConnectionLost = function (responseObject) {
    console.log("connection lost: " + responseObject.errorMessage);
};
client.onMessageArrived = function (message) {

    if (message.destinationName == "sensor/value"){

    $(".sensorValue").append('<p style = "color: blue;">' + message.payloadString + '</p>');
    }

    else{
    $(".messages").empty();
    $(".messages").append('<p style="color:green;font-family: Arial, Helvetica, sans-serif;">'+
            message.payloadString + '</p>');
        
    }

    console.log(message.destinationName, ' -- ', message.payloadString);
};
var options = {
    timeout: 3,
    onSuccess: function () {
        console.log("mqtt connected");
        // Connection succeeded; subscribe to our topic, you can add multile lines of these
        // client.subscribe("coe457/hello", { qos: 1 });
        client.subscribe("Sensor/Values", { qos: 1 });


        // Every 2 seconds, publish a new sensor value to be displayed.
        setInterval(function(){

            function roundToTwo(num) {    
                return +(Math.round(num + "e+2")  + "e-2");
            }

        let randomNumber = roundToTwo(Math.random()).toString();
        sensorMessage = new Paho.MQTT.Message(randomNumber);

        sensorMessage.payloadString = randomNumber;
        sensorMessage.destinationName = "Sensor/Values";

        client.send(sensorMessage);

        }, 2000);


        //use the below if you want to publish to a topic on connect
        // message = new Paho.MQTT.Message("Hello from the browser");

        // message.destinationName = "coe457/hello";
        // client.send(message);

    },
    onFailure: function (message) {
        console.log("Connection failed: " + message.errorMessage);
    }
};


let initialIndex = 0;

// When you press the save button, get the value in the div using jquery and save it to the db
// with an index set to 0 initially.
function saveValue(){

var currentSensorReading = parseFloat ( $(".messages").text() );

    // I need to save the contents of the div to my DB. 
    $.post("http://localhost:7777/saveValue",
      {
        sensorValue: currentSensorReading,
      },
      function (data, status) {
        alert("Data: " + data + "\nStatus: " + status);
      });

}

function init() {
    client.connect(options);
}