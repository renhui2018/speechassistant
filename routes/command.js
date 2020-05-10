'use strict';

const appcf = require('../lib/appcf');
const parseCommand = require('../lib/parseCommand');
var express = require('express');
var router = express.Router();
const request = require('request'); 
const querystring = require("querystring");

router.get('/', function(req, res, next) {
    var cf = appcf.getCfSync('dbitem');
    res.send({ok: true, data: cf});
});
router.get('/parseCommandByDb', function(req, res, next) {
    var cmd = req.query.command;
    parseCommand.getData(cmd).then(function(ret){
        res.send({ok: true, data: ret});
    });
  
});
router.get('/parseCommand', function(req, res, next) {
    var cmd = req.query.command,
        url, userId, key, postData, cf;
    
    cf = appcf.getCfSync('speechAPI');
    if(!cf){
        res.send({ok: false, data: "Error occurs when get speechAPI configuration."});
    }
    url = cf.url;
    userId = cf.userid;
    key = cf.key;
    postData = querystring.stringify({
        key: key,
        info: cmd,
        userid: userId
    });
    request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
        },
        body: postData
    }, function(error, response, body) {
        if (!error || response.statusCode == 200) {
            var resText = response.body.text;
            res.send({ok: true, data: resText});
        }else{
            res.send({ok: false, data: "Unkown errors."});
        }
    });
});

module.exports = router;
