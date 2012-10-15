var ent = require('ent'),
    url = require('url');
    
module.exports = function(config, cb) {
  if (typeof config == "function") {
    cb = config;
    config = {};
  }
    
  config = config || {};
  
  var respond = function(req, res, next, options) {
    var format = req.oembed.format;
    
    if (format == "json") {
      var output = JSON.stringify(options);
      var headers = {
        'Content-type': 'application/json',
        'Content-length': output.length
      };
      res.writeHead(200, headers);
      res.end(output);
    }
    else if (format == "xml") {
      if (options.html)
        options.html = ent.encode(html);
        
      var output = '<?xml version="1.0" encoding="utf-8" standalone="yes"?>';
      output += '<oembed>';
      for (var key in options) {
        var value = options[key];
        if (value) {
          var startTag = '<' + key + '>';
          var endTag = '</' + key + '>';
          output += '  ' + startTag + value + endTag + '\n';
        }
      }
      output += '</oembed>';
      
      var headers = {
        'Content-type': 'text/xml',
        'Content-length': output.length
      };
      res.writeHead(200, headers);
      res.end(output);
    }
    else {
      // format is invalid (should never get here)
      next();
    }
  }
  
  return function(req, res, next) {
    var oembedQuery = url.parse(req.url, true /*parse query*/).query;
    oembedQuery.format = oembedQuery.format || "json";
    
    if (oembedQuery.url &&
      (oembedQuery.format == "json" || oembedQuery.format == "xml")) {
      req.oembed = oembedQuery;
      res.oembed = {};
      
      // make helpers
      res.oembed.photo = function(url, width, height, options) {
        options = options || {};
        options.type = "photo";
        options.url = url;
        options.width = width;
        options.height = height;
        respond(req, res, next, options);
      }
      
      res.oembed.video = function(html, width, height, options) {
        options = options || {};
        options.type = "video";
        options.html = html;
        options.width = width;
        options.height = height;
        respond(req, res, next, options);
      }
      
      res.oembed.link = function(options) {
        options = options || {};
        options.type = "link";
        respond(req, res, next, options);
      }
      
      res.oembed.rich = function(htlp, width, height, options) {
        options = options || {};
        options.type = "rich";
        options.html = html;
        options.width = width;
        options.height = height;
        respond(req, res, next, options);
      }
      
      cb(req, res, next);
    }
    else {
      // no url in query, fail
      next();
    }
  };
    

};