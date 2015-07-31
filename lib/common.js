module.exports.respond = function(req, res, next, options) {
  var format = req.oembed.format;

  if (format == "json")
    respondJson(req, res, next, options);
  else if (format == "xml")
    respondXml(req, res, next, options);
  else
    next(); // format is invalid (should never get here)
};

var respondJson = function(req, res, next, options) {
  var output = JSON.stringify(options);
  var callback = req.oembed.callback || req.oembed.jsonp;
  if (callback) {
    output = callback + "(" + output + ");";
    var headers = {
      'Content-type': 'application/javascript',
      'Content-length': output.length
    };
    res.writeHead(200, headers);
    res.end(output);
  }
  else {
    var headers = {
      'Content-type': 'application/json',
      'Content-length': output.length
    };
    res.writeHead(200, headers);
    res.end(output);
  }
};

var respondXml = function(req, res, next, options) {
  if (options.html)
    options.html = he.escape(html);

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
};