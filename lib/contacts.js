var contactList = [{"id":1,"first_name":"Evvie","last_name":"Savil","phone":"501-934-5176","rating":"Cold","company":"Zoombeat"},
{"id":2,"first_name":"Dominga","last_name":"Saddleton","phone":"305-212-2679","rating":"Cold","company":"Tazz"},
{"id":3,"first_name":"Heywood","last_name":"Pollock","phone":"519-851-6332","rating":"Hot","company":"Oyope"},
{"id":4,"first_name":"Abrahan","last_name":"Batchelor","phone":"786-845-4140","rating":"Cold","company":"Thoughtstorm"},
{"id":5,"first_name":"Roma","last_name":"Faulkner","phone":"729-831-8034","rating":"Hot","company":"Brightbean"},
{"id":6,"first_name":"Mara","last_name":"Nathon","phone":"884-209-8277","rating":"Warm","company":"Topicstorm"},
{"id":7,"first_name":"Noelani","last_name":"Davisson","phone":"850-966-7789","rating":"Warm","company":"Wikizz"},
{"id":8,"first_name":"Riordan","last_name":"Glyde","phone":"719-364-2523","rating":"Warm","company":"Fivechat"},
{"id":9,"first_name":"Feodora","last_name":"McMickan","phone":"370-140-9642","rating":"Hot","company":"Twitterbridge"},
{"id":10,"first_name":"Paulie","last_name":"Ivetts","phone":"857-170-5092","rating":"Hot","company":"Jatri"},
{"id":11,"first_name":"Maurine","last_name":"Heaselgrave","phone":"346-930-5780","rating":"Hot","company":"Quinu"},
{"id":12,"first_name":"Niko","last_name":"Lemonby","phone":"132-678-4999","rating":"Cold","company":"Livepath"},
{"id":13,"first_name":"Jaymee","last_name":"Ludlam","phone":"862-588-0217","rating":"Hot","company":"Meevee"},
{"id":14,"first_name":"Aprilette","last_name":"Arnow","phone":"629-792-8401","rating":"Cold","company":"Brainbox"},
{"id":15,"first_name":"Bevon","last_name":"Venny","phone":"802-139-7480","rating":"Cold","company":"Gabtype"},
{"id":16,"first_name":"Mitch","last_name":"Kenninghan","phone":"815-452-6564","rating":"Warm","company":"Zooveo"},
{"id":17,"first_name":"Vicky","last_name":"Fallen","phone":"769-441-5689","rating":"Hot","company":"Photobean"},
{"id":18,"first_name":"Nowell","last_name":"Purvey","phone":"731-299-3672","rating":"Warm","company":"Meemm"},
{"id":19,"first_name":"Valentino","last_name":"Follis","phone":"946-199-3140","rating":"Cold","company":"Muxo"},
{"id":20,"first_name":"Rori","last_name":"Kennard","phone":"733-565-0199","rating":"Cold","company":"Zoomcast"}];

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

function contactsRoute() {
  var contacts = new express.Router();
  contacts.use(cors());
  contacts.use(bodyParser());


  // GET REST endpoint - query params may or may not be populated
  contacts.get('/', function(req, res) {
    console.log(new Date(), 'In hello route GET / req.query=', req.query);
    var world = req.query && req.query.hello ? req.query.hello : 'World';

    // see http://expressjs.com/4x/api.html#res.json
    res.json(contactList);
  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  contacts.post('/', function(req, res) {
    console.log(new Date(), 'In hello route POST / req.body=', req.body);
    var world = req.body && req.body.hello ? req.body.hello : 'World';

    // see http://expressjs.com/4x/api.html#res.json
    res.json({msg: 'Hello ' + world});
  });

  return contacts;
}

module.exports = contactsRoute;
