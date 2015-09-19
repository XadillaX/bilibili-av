/**
 * XadillaX created at 2015-09-20 00:11:25 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
var zlib = require("zlib");

/**
 * gunzipResponse
 * @param {Buffer} buff the response buffer
 * @param {Function} callback the callback function
 */
exports.gunzipResponse = function(buff, callback) {
    zlib.gunzip(buff, function(err, res) {
        if(err) return callback(err);
        callback(undefined, res.toString("utf8"));
    });
};
