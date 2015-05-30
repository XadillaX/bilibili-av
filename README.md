# BILIBILI SUBTITLES

This module is for getting [bilibili](http://www.bilibili.com/) subtitles via a certain av number and its page number.

【这是一个根据 av 号和分页来获取 [bilibili](http://www.bilibili.com/) 弹幕的包】

## INSTALLATION

```sh
$ npm install bilibili-subtitles
```

## USAGE

Using function `bilibili.get(av, [page], [callback])`.

```javascript
var bilibili = require("bilibili-subtitles");

bilibili.get(12999, function(err, subtitles) {
    console.log(err);
    console.log(subtitles);
});
```

If subtitles fetched successfully, `subtitiles` will be an array which contains elements that each is like:

```javascript
{ text: '现在还有3人',
  seconds: 1426.1600341797,
  mode: 1,
  modeText: 'roll',
  fontSize: 25,
  color: 'ffffff',
  timestamp: 1398596421,
  pool: 0,
  poolText: 'normal',
  senderId: '8df339d5',
  subtitlesId: 446706589 }
```

> `text` stands for subtitles text; `seconds` is its seconds which it appears; `mode` is subtitles mode which explained
> in `modeText`; `fontSize` is its size; `color` is its color; `timestamp` is the time when it submitted; `pool` is the
> subtitles pool which explained in `poolText`; `senderId` is the user who send this subtitles; `subtitlesId` is this
> subtitles id.

## CONTRIBUTE

You're welcome to make pull requests!

「雖然我覺得不怎麼可能有人會關注我」
