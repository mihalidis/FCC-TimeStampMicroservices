
// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/", function (req, res) {
  res.json({unix: Date.now(), utc: Date()});
});

app.get("/api/timestamp/:date_stamp", function(req,res){
  // Unix Formatında verilirse
  const dateStamp= req.params.date_stamp;
  if(dateStamp.toString().length >= 5){
    const dateNum = parseInt(dateStamp);
    res.json({unix: dateStamp, utc: new Date(dateNum).toUTCString()});
  }
  // geçerli date formatında gelirse
  const dateObj = new Date(dateStamp);
  if(dateObj.toString() === "Invalid Date"){
    res.json({error: "Invalid Date"});
  }else{
    res.json({unix: dateObj.valueOf(), utc: dateObj.toUTCString()})
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
