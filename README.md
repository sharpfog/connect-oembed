connect-oembed
==============

oEmbed provider middleware for Node.js Connect and Express. Adds support to Connect/Express for creating an [oEmbed](http://www.oembed.com/) provider API (ie `http://example.com/oembed`).

[![Build Status](https://secure.travis-ci.org/sharpfog/connect-oembed.png)](http://travis-ci.org/sharpfog/connect-oembed)

## Installation
connect-oembed is available via npm:

```
npm install connect-oembed
```

## Usage

``` js
var connect = require('connect');
var oembed = require('connect-oembed');

var app = connect();

app.use('/oembed', oembed(function(req, res, next) {
  // determine your embed details here based on query params in req.oembed

  // say we're oembedding images from http://example.com/images/<image id>
  var urlRegEx = /^http:\/\/example\.com\/images\/([0-9]+)/;
  var matched = urlRegEx.exec(req.oembed.url);
  if (matched != null) {
    var imageId = matched[1];
    
    // here you could look up some meta from a database, for now we can just
    // return some made up values using the res.oembed.photo() helper
    res.oembed.photo(
      "http://static.example.com/resources/images/" + imageId, // url
      256,  // width
      256); // height
      
    // the helper automatically builds and sends the response for you
    // so there's nothing left to do here
  }
  else
    next();
}));

app.listen(8080);
````