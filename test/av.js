/**
 * Created by XadillaX on 2014/10/2.
 */
var bilibili = require("../");

bilibili.get(1003197, function(err, subtitles) {
    console.log(subtitles.length);
});

bilibili.get(1579205, function(err, subtitles) {
    console.log(subtitles.length);
});

bilibili.get(868094, function(err, subtitles) {
    console.log(subtitles.length);
});

bilibili.get(12999, function(err, subtitles) {
    console.log(subtitles);
});
