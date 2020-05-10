'use strict';
const Promise = require('bluebird');
const Chat = require('../lib/chat_domain');
const speech = require('../lib/speechdb');
const querystring = require("querystring");
const http = require('http'); 
const request = require('request');  
var createChatTest = function() {
    var rr = new Chat({
        keyWords: "你是谁",
        answer: "李明"
    });
    rr.save().then(function() {
            console.log('done');
            speech.close();
        })
}

createChatTest();



/*var post_data = querystring.stringify({
  key: 'ffacf70aa1a34af693f150df5259ed74',
  info: "武汉",
  userid: 0
});
var options = {
  host: 'www.tuling123.com',
  port: 80,
  path: '/openapi/api',
  method: 'POST',
  rejectUnauthorized: false,
  headers: {
    "Content-Type": 'application/x-www-form-urlencoded', //这个一定要有
  }
};
var req = http.request(options, function (res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});
req.write(post_data);
req.end();*/



/*request({
    url: "http://www.tuling123.com/openapi/api",
    method: "POST",
    json: true,
    headers: {
        "Content-Type": 'application/x-www-form-urlencoded', 
    },
    body: post_data
}, function(error, response, body) {
    console.log("SSSS"+JSON.stringify(response));
    if (!error && response.statusCode == 200) {
    }
});*/