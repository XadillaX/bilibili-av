/**
 * Created by XadillaX on 2014/10/2.
 */
require("sugar");
var spidex = require("spidex");
spidex.setDefaultUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/45.0.2454.93 Safari/537.36");

exports.AV = require("./lib/av");

// require("sugar");
// var async = require("async");
// var spidex = require("spidex");
// var zlib = require("zlib");
// var parseString = require('xml2js').parseString;
// 
// const modeText = [ "unknown", "roll", "roll", "roll", "bottom", "top", "reverse", "location", "advanced" ];
// const poolText = [ "normal", "zimu", "special" ];
// 
// /**
//  * get subtitles
//  * @param av
//  * @param page
//  * @param callback
//  */
// exports.get = function(av, page, callback) {
//     if(typeof page === "function") {
//         callback = page;
//         page = undefined;
//     }
// 
//     async.waterfall([
//         /**
//          * step 1.
//          *   get av page
//          * @param callback
//          */
//         function(callback) {
//             var url = "http://www.bilibili.com/video/av" + av + "/";
//             if(page !== undefined) {
//                 url += "index_" + page + ".html";
//             }
// 
//             var header = {
//                 accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
//                 "accept-encoding": "gzip,deflate,sdch",
//                 "accept-language": "zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4,sv;q=0.2,zh-TW;q=0.2",
//                 "cache-control": "max-age=0",
//                 connection: "keep-alive",
//                 host: "www.bilibili.com",
//                 referer: "http://www.bilibili.com/",
//                 "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36"
//             };
// 
//             spidex.get(url, function(html, status) {
//                 if(status !== 200) return callback(new Error("Server returned a wrong status."));
//                 callback(undefined, html);
//             }, header, "binary").on("error", callback);
//         },
// 
//         /**
//          * step 2.
//          *   parse `cid`
//          * @param html
//          * @param callback
//          */
//         function(html, callback) {
//             zlib.gunzip(new Buffer(html, "binary"), function(err, buff) {
//                 if(err) return callback(err);
//                 html = buff.toString("utf8");
// 
//                 var regex = /".*bili.*cid=(\d+)&?.*"/;
//                 var result = regex.exec(html);
//                 if(!result || result.length < 2) {
//                     return callback(new Error("Can't parse `cid`."));
//                 }
// 
//                 var cid = result[1];
//                 callback(undefined, cid);
//             });
//         },
// 
//         /**
//          * step 3.
//          *   get subtitles
//          * @param cid
//          * @param callback
//          */
//         function(cid, callback) {
//             var url = "http://comment.bilibili.com/" + cid + ".xml";
//             spidex.get(url, function(html, status) {
//                 zlib.inflateRaw(new Buffer(html, "binary"), function(err, buff) {
//                     if(err) return callback(err);
//                     html = buff.toString("utf8");
// 
//                     callback(undefined, html);
//                 });
//             }, {
//                 accept              : "*/*",
//                 "accept-encoding"   : "gzip,deflate,sdch",
//                 "accept-language"   : "zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4,sv;q=0.2,zh-TW;q=0.2",
//                 connection          : "keep-alive",
//                 host                : "comment.bilibili.com",
//                 "user-agent"        : "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36"
//             }, "binary").on("error", callback);
//         },
// 
//         /**
//          * step 4.
//          *   convert xml to json object
//          * @param xml
//          * @param callback
//          */
//         function(xml, callback) {
//             parseString(xml, function(err, result) {
//                 if(err) return callback(err);
//                 if(!result.i || !result.i.d) {
//                     return callback(new Error("Broken subtitles file."));
//                 }
// 
//                 var json = result.i.d;
//                 callback(undefined, json.map(function(v) {
//                     var obj = {};
//                     obj.text = v._;
// 
//                     var properties = v.$.p.split(',');
//                     for(var i = 0; i < properties.length; i++) {
//                         if(i === 0) {
//                             obj.seconds = parseFloat(properties[i]);
//                         } else if(i === 1) {
//                             obj.mode = parseInt(properties[i]);
//                             if(obj.mode >= 1 && obj.mode <= 8) {
//                                 obj.modeText = modeText[obj.mode];
//                             } else obj.modeText = "unknown";
//                         } else if(i === 2) {
//                             obj.fontSize = parseInt(properties[i]);
//                         } else if(i === 3) {
//                             obj.color = parseInt(properties[i]).toString(16);
//                         } else if(i === 4) {
//                             obj.timestamp = parseInt(properties[i]);
//                         } else if(i === 5) {
//                             obj.pool = parseInt(properties[i]);
//                             if(obj.pool >= 0 && obj.pool <= 2) {
//                                 obj.poolText = poolText[obj.pool];
//                             } else obj.poolText = "unknown";
//                         } else if(i === 6) {
//                             obj.senderId = properties[i];
//                         } else if(i === 7) {
//                             obj.subtitlesId = parseInt(properties[i]);
//                         }
//                     }
// 
//                     return obj;
//                 }).sort(function(a, b) {
//                     return a.seconds - b.seconds;
//                 }));
//             });
//         }
//     ], function(err, result) {
//         callback(err, result);
//     });
// };
