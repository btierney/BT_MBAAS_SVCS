'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require ('request');

var username = "[YOUR SAP ID]";
var password = "[YOUR PASSWORD]";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
/*
ProductID": "680375263",
"TypeCode": "PR",
"Category": "Notebooks",
"Name": "Notebooks",
"NameLanguage": "EN",
"Description": "",
*/
function simplify (data) {
    var productlist = [];
    data.d.results.forEach(element => {
        var product = {
            'ProductID' : element.ProductID,
            'Category' : element.Category,
            'Name': element.Name,
            'Description' : element.Description,
        }

        productlist.push (product);
    });

    return productlist;

}

function sapodataRoute(){
    var sapodata = new express.Router();
    sapodata.use(cors());
    sapodata.use(bodyParser());

    sapodata.get('/', function(req, res) {
        console.log(new Date(), 'In sapodata route GET / req.query=', req.query);
        // res.json ({'msg': 'Worked'})
        // CREATE SAP  URL
        var url = 'https://sapes5.sapdevcenter.com/sap/opu/odata/iwbep/GWSAMPLE_BASIC/ProductSet?$format=json'

        request.get ({
            url: url,
            headers : {
                "Authorization" : auth
            }
            }, function (error, response, body){
                return res.json (JSON.parse(body));
        });
    });
    sapodata.get('/simple', function(req, res) {
        console.log(new Date(), 'In sapodata route GET / req.query=', req.query);
        // res.json ({'msg': 'Worked'})
        // CREATE SAP  URL
        var url = 'https://sapes5.sapdevcenter.com/sap/opu/odata/iwbep/GWSAMPLE_BASIC/ProductSet?$format=json'

        request.get ({
        url: url,
        headers : {
            "Authorization" : auth
        }
        }, function (error, response, body){
        
        var pList = simplify(JSON.parse(body));
        return res.json (pList);   
        });
    });    

    return sapodata;
}

module.exports = sapodataRoute;