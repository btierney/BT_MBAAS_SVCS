var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var originaldata = require ('./acctdata.json');
var alertdata = require ('./alertdata.json');

function accountsRoute() {
  // COPY THE ORIGINAL SO THAT WE CAN REFRESH IF WE WANT
  var acctdata = originaldata;
  
  var accounts = new express.Router();
  accounts.use(cors());
  accounts.use(bodyParser());


  // LIST ALL ACCOUNTS
  accounts.get('/', function(req, res) {
    console.log(new Date(), 'In account route GET / req.query=', req.query);
    if (req.query.refresh){
        console.log ('REFRESH DATA');
        acctdata = originaldata;
    }
    res.json(acctdata);
  });

  accounts.get('/:id', function (req, res){
      var foundItem = {};
      acctdata.forEach ( function (item, index, array){
          if (item.id === req.params.id){
              foundItem = item;
          }
      })
      res.json (foundItem);
  });

  // LIST ACCOUNT ALERTS
  accounts.get('/alerts', function (req,res){
      console.log (new Date(), 'In account routet GET ALERTS');
      res.json (alertdata);
  });

  // CREATE A NEW ACCOUNT
  accounts.post('/', function(req, res) {
    console.log(new Date(), 'In account route POST / req.body=', req.body);
    acctdata.push (req.body);
    res.json({msg: req.body.Name + ' created!'});
  });

  // UPDATE AN ACCOUNT
  accounts.put('/:id', function (req, res) {
      console.log (new Date(), 'In account route PUT / req.body=', req.body);
      console.log ('params: ', JSON.stringify(req.params, null, 2));
      var mods = req.body;
      // make changes to the data
      acctdata.forEach ( function (item, index, array){
          if (item.id === req.params.id){
            item.Name = mods.Name;
            item.Type = mods.Type;
            item.TickerSymbol = mods.TickerSymbol;
            item.AccountSource = mods.AccountSource;
            item.AccountNumber = mods.AccountNumber;
            item.AnnualRevenue = mods.AnnualRevenue;
            item.Active__c = mods.Active__c;
          }
      })
      res.json ({msg: 'Updated ' + req.body.Name});
  })

  // DELETE AN ACCOUNT
  accounts.delete ('/:id', function (req, res){
      console.log (new Date(), 'In account route DELETE');
      console.log ('DELETE ITEM: ', req.params.id);
      acctdata.forEach ( function (item, index, array){
          if (item.id === req.params.id){
            console.log ('FOUND IT!!')
            acctdata.splice(index, 1);
          }
      })
      res.json ({msg: 'Deleted ' + req.params.id})
  })

  return accounts;
}

module.exports = accountsRoute;
