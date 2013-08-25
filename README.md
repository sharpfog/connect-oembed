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
```

## API

After adding the connect-oembed middleware to your app, most interactions will be through the objects attached to the req and res objects. oEmbed request parameters (url, format, etc...) will be available via the req.oembed object (ie. req.oembed.url). To respond to an oEmbed request, use the helpers provided by the res.oembed object. The module will automatically respond in the correct format (JSON or XML) based on the request, choosing JSON if no format is specified. Any custom options passed to the helper will also be encoded into the json or xml response.

``` js
var oembed = require('connect-oembed');

/**
 * attach the connect-oembed middleware at the specified path
 */
app.use("/path/to/api/oembed", oembed(function(req, res, next) { 
  ...

  /**
   * responds to an oEmbed request with a photo.
   * all options will be encoded into the response.
   */
  res.oembed.photo(url, width, height, <options>);
  
  /**
   * responds to an oEmbed request with a video.
   * all options will be encoded into the response.
   */
  res.oembed.video(html, width, height, <options>);
  
  /**
   * responds to an oEmbed request with a link (only takes options).
   * all options will be encoded into the response.
   */
  res.oembed.link(<options>);
  
  /**
   * responds to an oEmbed request with rich content.
   * all options will be encoded into the response.
   */
  res.oembed.rich(html, width, height, <options>);
};
```

## Note on JSONP

Even though it's not specified by oembed.com, connect-oembed supports wrapping a JSON response as a JSONP response. Just append a callback or jsonp parameter to the GET query and connect-oembed will respond accordingly. For example the following request would return a JSONP response:

``` js
http://example.com/oembed?url=http%3A//example.com/images/1234?format=json?callback=mycallback
```
