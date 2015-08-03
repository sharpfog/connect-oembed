var common = require('./common');

module.exports = function() {
  return function(req, res, next) {
    common.handler(req, res, next);

    next();
  };
};

module.exports.version = "0.0.1";

