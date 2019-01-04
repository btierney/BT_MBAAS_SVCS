var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var $fh = require("fh-mbaas-api");


function truckstatsRoute(){
  var truckstats = new express.Router();
  truckstats.use(cors());
  truckstats.use(bodyParser());


  // GET REST endpoint - query params may or may not be populated
  truckstats.get('/', function(req, res) {
    console.log(new Date(), 'In truckstats route GET / req.query=', req.query);

    var options = {
        'act' : 'list',
        'type': 'videoviews'
    }

    $fh.db (options, function (err, data){
        if (err){
            console.log (err);
            res.json ({ error : 'Error - ' + err});
        } else {

            data.list.sort ( function (a, b){
                let comparison = 0;

                if (a.fields.datetime > b.fields.datetime){
                    comparison = 1;
                }else if (a.fields.datetime , b.fields.datetime){
                    comparison = -1;
                }
                return comparison;
            })

            res.json (data);
        }
    })
  });

    // GET REST endpoint - query params may or may not be populated
  truckstats.get('/csv', function(req, res) {
    console.log(new Date(), 'In truckstats route GET / req.query=', req.query);

    var options = {
        'act' : 'list',
        'type': 'videoviews'
    }

    $fh.db (options, function (err, data){
        if (err){
            console.log (err);
            res.json ({ error : 'Error - ' + err});
        } else {
            // yyyy-MM-dd HH:mm:ss
            var csvOutput = 'DATETIME, TOPIC, VIDEO\r\n';
            
            data.list.sort ( function (a, b){
                console.log ('sorting');
                let comparison = 0;

                if (a.fields.datetime > b.fields.datetime){
                    comparison = 1;
                }else if (a.fields.datetime , b.fields.datetime){
                    comparison = -1;
                }

                return comparison;
            })

            data.list.forEach ( function (item, index, array){
                var ts = new Date (item.fields.datetime);
                var yr = ts.getUTCFullYear() + '';
                var mo = ts.getUTCMonth() < 10 ? '0' + (ts.getUTCMonth() + 1): ts.getUTCMonth() + 1;
                var da = ts.getUTCDate() < 10 ? '0' + ts.getUTCDate() : ts.getUTCDate() + '';
                var hr = ts.getUTCHours() < 10 ? '0' + ts.getUTCHours() : ts.getUTCHours() + '';
                var mn = ts.getUTCMinutes() < 10 ? '0' + ts.getUTCMinutes() : ts.getUTCMinutes() + '';
                var se = ts.getUTCSeconds() < 10 ? '0' + ts.getUTCSeconds() : ts.getUTCSeconds() + '';

                var dt = yr + '-' + mo + '-' + da + ' ' + hr + ':' + mn + ':' + se;
                csvOutput += dt + ', ' + item.fields.topic + ', ' + item.fields.video +'\r\n';
            })
            res.set ({'Content-Type' : 'text/plain'});
            res.send (csvOutput);
        }
    })
  });


  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  truckstats.post('/', function(req, res) {
    console.log(new Date(), 'In truckstats route POST / req.body=', req.body);

    var options = {
        'act' : 'create',
        'type': 'videoviews',
        'fields' : {
            'datetime' : req.body.datetime,
            'topic' : req.body.topic,
            'video' : req.body.video
        }        
    }

    $fh.db (options, function (err, data){
        if (err){
            console.log (err);
            res.json ({ error : 'Error - ' + err});
        } else {
            res.json (data);
        }
    })

  });

  return truckstats;
}

module.exports = truckstatsRoute;