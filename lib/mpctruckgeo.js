
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require ('request');
var Promise = require('bluebird');
var parseXML = require('xml2js').parseString;
var dateFormat = require ('dateformat');

var stops = [];
var landmarks = {};

// START COMPARE
function compare (a, b) {
    if (a.time > b.time) {
        return 1;
    } else {
        return -1;
    }
}
// END COMPARE

// START SIMPLIFY
function simplifyJSON (data){
    var gls = data.skybitz.gls;
    gls.forEach(element => {
        if (element.landmark){
            var location = {
                name: element.landmark.geoname,
                city: element.landmark.city, 
                latitude: element.latitude, 
                longitude: element.longitude, 
                time: new Date (element.time)
            };

            stops.push(location);
            // if (!landmarks[location.city]){
            //     stops.push(location);
            //     landmarks[location.city] = location.city;
            // }
        }
    });
    stops.sort(compare);
}
// END SIMPLIFY

function mpctruckgeoRoute() {
    var mpctruckgeo = new express.Router();
    mpctruckgeo.use(cors());
    mpctruckgeo.use(bodyParser());

    // add geo record to db
    mpctruckgeo.put('/', function (req, res){
        console.log(new Date(), 'In mpctruckgeo route POST / req.body=', req.body);

        var options = {
            'act' : 'create',
            'type': 'geopoints',
            'fields' : {
                'name' : req.body.name,
                'city' : req.body.city,
                'latitude' : req.body.latitude,
                'longitude' : req.body.longitude,
                'time' : req.body.time
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

    mpctruckgeo.get('/', function(req, res) {
        stops = [];
        landmarks = {};
        
        var now = new Date();
        var todate = dateFormat(now, "dd/mmm/yyyy-hh:MM:ss");

        var urlbase = 'https://xml.skybitz.com:9443/QueryPositions?';
        var acctinfo = 'mtsn=GTP1BGDL220500322&customer=RedHatMPC&password=RHmpc32!&';
        var fromdate = 'from=31/may/2018-00:00:00&';
        var todate = 'to=' + todate + '&';

        var stuff = 'version=2.65&sortby=1';
        const opts = {
            ignoreAttrs: true,
            explicitArray: false
            // tagNameProcessors: [(name) => {
            //     return name.replace(tagRgx1, '').replace(tagRgx2, '');
            // }]
        }
        var skybitzURL = urlbase + acctinfo + fromdate + todate + stuff;
        console.log (skybitzURL);

        request.get({
            url : skybitzURL
        }, function (error, response, body){
            if (error){
                console.log('ERROR: ' + error);
                res.json({error: error});
            } else {
                console.log ('BODY:\n' + body.length);
                console.log('OPTS: \n' + opts);
                parseXML (body, opts, function (error, json){
                    simplifyJSON(json);
                    console.log('STOP COUNT: ' + stops.length)
                    res.json(stops);
                })
            }
        })

        // see http://expressjs.com/4x/api.html#res.json
        //res.json({msg: 'Hello ' + world});
    });


    return mpctruckgeo;
}

module.exports = mpctruckgeoRoute;
