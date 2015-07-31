var common = require('./common'),
    he = require('he'),
    url = require('url');

module.exports = function() {
  return function(req, res, next) {
    var oembedQuery = url.parse(req.url, true /*parse query*/).query;
    oembedQuery.format = oembedQuery.format || "json";

    if (oembedQuery.format != "json" && oembedQuery.format != "xml") {
      res.writeHead(501);
      res.end();
      return;
    }

    if (!oembedQuery.url) {
      next(); // trickle down to 404
      return;
    }

    req.oembed = oembedQuery;
    res.oembed = {};

    // make helpers
    res.oembed.photo = function(url, width, height, options) {
      options = options || {};
      options.type = "photo";
      options.url = url;
      options.width = width;
      options.height = height;
      common.respond(req, res, next, options);
    }

    res.oembed.video = function(html, width, height, options) {
      options = options || {};
      options.type = "video";
      options.html = html;
      options.width = width;
      options.height = height;
      common.respond(req, res, next, options);
    }

    res.oembed.link = function(options) {
      options = options || {};
      options.type = "link";
      common.respond(req, res, next, options);
    }

    res.oembed.rich = function(html, width, height, options) {
      options = options || {};
      options.type = "rich";
      options.html = html;
      options.width = width;
      options.height = height;
      common.respond(req, res, next, options);
    }

    next();
  };
};

module.exports.version = "0.0.1";

