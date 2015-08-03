var oembed = require('./connect-oembed'),
    he = require('he'),
    url = require('url');

module.exports = function() {
  return function(req, res, next) {
    oembed.handler(req, res, next);

    next();
  };
};

module.exports.version = "0.0.1";

