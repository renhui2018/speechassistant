/*
 * @file appcf.js
 */
'use strict';
const fs = require('fs');
const lodash = require('lodash');

function nameToPath(name) {
    var filePath = process.cwd() + '/config/' + name + '.json';
    return filePath;
}

function doGetCf(root, path) {
    var ps = path.split('.');
    for (let i = 0; i < ps.length; i++) {
        if (root === null || root === undefined) return root; 
        root = root[ps[i]];
    }
    return root;
}

function getCfSync(path) {
    if (lodash.isNil(path) || path === '')
        return undefined;
    var cf = JSON.parse(fs.readFileSync(nameToPath('appcf'), 'utf8'));
    return doGetCf(cf, path);
}


var lib = {
    getCfSync: getCfSync
};

module.exports = lib;