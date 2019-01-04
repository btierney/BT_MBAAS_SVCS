var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var platformList = require ('./platformList.json');

function platformdataRoute() {
  var platformdata = new express.Router();
  platformdata.use(cors());
  platformdata.use(bodyParser());

  // GET REST endpoint - query params may or may not be populated
  platformdata.get('/', function(req, res) {
    console.log(new Date(), 'In platformdata route GET / req.query=', req.query);
    res.json(platformList);
  });

  console.log ('platformdataRoute is defined');
  return platformdata;
}

module.exports = platformdataRoute;
