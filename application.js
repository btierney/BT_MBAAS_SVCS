var express = require('express');
var cors = require('cors');

var app = express();

// Enable CORS for all requests
app.use(cors());

// allow serving of static files from the public directory
app.use(express.static(__dirname + '/public'));

app.use('/hello', require('./lib/hello.js')());
app.use('/mpctruckgeo', require ('./lib/mpctruckgeo.js')());
app.use('/products', require ('./lib/sapodata.js')())
app.use('/contacts', require ('./lib/contacts.js')());
app.use('/plaformdata', require ('./lib/platformdata.js')());
app.use('/accounts', require('./lib/accounts.js')());
app.use('/workorders', require('./lib/workorders.js')());
// app.use('/truckstats', require ('./lib/truckstats.js')());

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.listen(port, host, function() {
  console.log("App started at: " + new Date() + " on port: " + port); 
});
