/*
 * @file chat_domain.js
 */

'use strict';

const mongoose = require('mongoose');
const conn = require('./speechdb');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    keyWords:     { type: String, index: true },
    answer:       { type: String }
});

const Chat = conn.model('Chat', ChatSchema);

module.exports = Chat;