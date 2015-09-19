/**
 * XadillaX created at 2015-09-19 23:40:49 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
var qs = require("querystring");
var spidex = require("spidex");

var helper = require("./helper");

var GET_PAGE_LIST_URL = "http://www.bilibili.com/widget/getPageList";

/**
 * AV
 * @param {Number} aid aid of bilibili av
 * @param {Number} page the page number of AV
 * @param {Object} options the parse options
 * @constructor
 */
var AV = function(aid, page, options) {
    if(typeof page === "object" || page === undefined) {
        options = page;
        page = 1;
    }

    this.aid = aid;
    this.page = page;
    this.options = options || {};
    this.cid = undefined;
    this.pageName = undefined;

    // 10 seconds timeout
    if(this.options.timeout === undefined) {
        this.options.timeout = 10000;
    }
};

/**
 * fetchCidAndName
 * @param {Function} callback the callback function
 */
AV.prototype.fetchCidAndName = function(callback) {
    if(undefined !== this.cid && undefined !== this.pageName) {
        return process.nextTick(callback);
    }

    var self = this;
    var querystring = qs.stringify({ aid: this.aid });
    spidex.get(GET_PAGE_LIST_URL + "?" + querystring, {
        charset: "binary",
        timeout: this.options.timeout
    }, function(html, status) {
        if(status === 404) {
            return callback(new Error("No such aid " + self.aid));
        }

        if(status !== 200) {
            return callback(new Error("Server returns status code " + status));
        }

        helper.gunzipResponse(html, function(err, html) {
            if(err) {
                return callback(new Error("Can't parse response buffer"));
            }

            try {
                var json = JSON.parse(html);
                for(var i = 0; i < json.length; i++) {
                    if(json[i].page === self.page) {
                        self.cid = parseInt(json[i].cid);
                        self.pageName = json[i].pagename;
                        return callback();
                    }
                }

                callback(new Error("No such page in " + self.aid));
            } catch(e) {
                return callback(new Error("Can't parse cid or page name of " + self.aid + "-" + self.page));
            }
        });
    }).on("error", function(err) {
        callback(err);
    });
};

/**
 * getCid
 * @param {Function} callback the callback function
 */
AV.prototype.getCid = function(callback) {
    if(undefined !== this.cid) {
        var self = this;
        return process.nextTick(function() {
            callback(undefined, self.cid);
        });
    }

    var self = this;
    this.fetchCidAndName(function(err) {
        if(err) return callback(err);
        if(undefined === self.cid) return callback(new Error("Unknown error occurred while fetching cid"));
        callback(undefined, self.cid);
    });
};

/**
 * getPageName
 * @param {Function} callback the callback function
 */
AV.prototype.getPageName = function(callback) {
    if(undefined !== this.pageName) {
        var self = this;
        return process.nextTick(function() {
            callback(undefined, self.pageName);
        });
    }

    var self = this;
    this.fetchCidAndName(function(err) {
        if(err) return callback(err);
        if(undefined === self.pageName) {
            return callback(
                new Error("Unknown error occurred while fetching page name"));
        }

        callback(undefined, self.pageName);
    });
};


module.exports = AV;
