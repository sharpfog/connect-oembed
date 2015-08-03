var common = require('./common');

module.exports = function(config, cb) {
  if (typeof config == "function") {
    cb = config;
    config = {};
  }

  config = config || {};

  return function(req, res, next) {
    common.hanlder(req, res, next);

    cb(req, res, next);
  };

};

module.exports.version = "0.0.1";