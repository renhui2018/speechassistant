/*
 * @file parseCommand.js
 */

'use strict';

const Chat = require('./chat_domain');

function getData(item) {
    var queryObj = {
        keyWords: item
    };
    return Chat.findOne(queryObj, {
            answer: 1
        })
        .then((data => {
            return data.answer;
        }));
}

var lib = {
    getData: getData
};
module.exports = lib;