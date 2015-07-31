var oembed = require('../lib/connect-oembed').connect;

exports.setUp = function(callback) {
  var that = this;
  
  that.req = {};
  that.res = {};
  that.res.mock = {};
  
  that.res.writeHead = function(code, headers) {
    that.res.mock.code = code;
    that.res.mock.headers = headers;
    that.res.mock.writeHeadCallback();
  }
  
  that.res.end = function(data) {
    that.res.mock.data = data;
    that.res.mock.endCallback();
  }
  
  that.res.mock.writeHeadCallback = function() {};
  that.res.mock.endCallback = function() {};
  callback();
}

exports.tearDown = function(callback) {
  var that = this;
  that.req = {};
  that.res = {};
  callback();
}

exports.noUrl = function(test) {
  test.expect(1);
  
  var ware = oembed(function(req, res, next) {});
  
  
  this.req.url = "http://example.com/oembed";
  var next = function() {
    test.ok(true);
    test.done();
  };
  
  ware(this.req, this.res, next);
};

exports.goodUrlNoHandle = function(test) {
  test.expect(2);
  
  var ware = oembed(function(req, res, next) {
    test.ok(true);
    next(); // purposefully skip this
  });
  
  this.req.url = "http://example.com/oembed?url=http:%3A//example.com/images/1234";
  var next = function() {
    test.ok(true);
    test.done();
  };
  
  ware(this.req, this.res, next);
};

exports.photoJson = function(test) {
  var that = this;
  test.expect(2);
  
  var ware = oembed(function(req, res, next) {
    res.oembed.photo("http://static.example.com/images/blah", 256, 256);
  });
  
  that.res.mock.writeHeadCallback = function() {
    test.equal(that.res.mock.code, 200);
    test.equal(that.res.mock.headers["Content-type"], "application/json");
    // TODO: test all headers
  }
  
  that.res.mock.endCallback = function() {
    // TODO: compare data
    test.done();
  }
  
  this.req.url = "http://example.com/oembed?url=http:%3A//example.com/images/1234";
  ware(this.req, this.res, function(){});
};

exports.photoJsonOptions = function(test) {
  var that = this;
  test.expect(2);
  
  var ware = oembed(function(req, res, next) {
    res.oembed.photo("http://static.example.com/images/blah", 256, 256, 
      {'my_custom_option':'true',
       'my_other_option':'foobar'});
  });
  
  that.res.mock.writeHeadCallback = function() {
    test.equal(that.res.mock.code, 200);
    test.equal(that.res.mock.headers["Content-type"], "application/json");
    // TODO: test all headers
  }
  
  that.res.mock.endCallback = function() {
    // TODO: compare data
    test.done();
  }
  
  this.req.url = "http://example.com/oembed?url=http:%3A//example.com/images/1234";
  ware(this.req, this.res, function(){});
};

exports.photoJsonp = function(test) {
  var that = this;
  test.expect(2);
  
  var ware = oembed(function(req, res, next) {
    res.oembed.photo("http://static.example.com/images/blah", 256, 256);
  });
  
  that.res.mock.writeHeadCallback = function() {
    test.equal(that.res.mock.code, 200);
    test.equal(that.res.mock.headers["Content-type"], "application/javascript");
    // TODO: test all headers
  }
  
  that.res.mock.endCallback = function() {
    // TODO: compare data
    test.done();
  }
  
  this.req.url = "http://example.com/oembed?url=http:%3A//example.com/images/1234&callback=blah";
  ware(this.req, this.res, function(){});
};

exports.photoXml = function(test) {
  var that = this;
  test.expect(2);
  
  var ware = oembed(function(req, res, next) {
    res.oembed.photo("http://static.example.com/images/blah", 256, 256);
  });
  
  that.res.mock.writeHeadCallback = function() {
    test.equal(that.res.mock.code, 200);
    test.equal(that.res.mock.headers["Content-type"], "text/xml");
    // TODO: test all headers
  }
  
  that.res.mock.endCallback = function() {
    // TODO: compare data
    test.done();
  }
  
  this.req.url = "http://example.com/oembed?url=http:%3A//example.com/images/1234&format=xml";
  ware(this.req, this.res, function(){});
};

exports.videoJson = function(test) {
  var that = this;
  test.expect(2);
  
  var ware = oembed(function(req, res, next) {
    res.oembed.video("<html></html>", 256, 256);
  });
  
  that.res.mock.writeHeadCallback = function() {
    test.equal(that.res.mock.code, 200);
    test.equal(that.res.mock.headers["Content-type"], "application/json");
    // TODO: test all headers
  }
  
  that.res.mock.endCallback = function() {
    // TODO: compare data
    test.done();
  }
  
  this.req.url = "http://example.com/oembed?url=http:%3A//example.com/video/1234";
  ware(this.req, this.res, function(){});
};

exports.linkJson = function(test) {
  var that = this;
  test.expect(2);
  
  var ware = oembed(function(req, res, next) {
    res.oembed.link();
  });
  
  that.res.mock.writeHeadCallback = function() {
    test.equal(that.res.mock.code, 200);
    test.equal(that.res.mock.headers["Content-type"], "application/json");
    // TODO: test all headers
  }
  
  that.res.mock.endCallback = function() {
    // TODO: compare data
    test.done();
  }
  
  this.req.url = "http://example.com/oembed?url=http:%3A//example.com/link/1234";
  ware(this.req, this.res, function(){});
};

exports.richJson = function(test) {
  var that = this;
  test.expect(2);
  
  var ware = oembed(function(req, res, next) {
    res.oembed.rich("<html></html>", 500, 500);
  });
  
  that.res.mock.writeHeadCallback = function() {
    test.equal(that.res.mock.code, 200);
    test.equal(that.res.mock.headers["Content-type"], "application/json");
    // TODO: test all headers
  }
  
  that.res.mock.endCallback = function() {
    // TODO: compare data
    test.done();
  }
  
  this.req.url = "http://example.com/oembed?url=http:%3A//example.com/link/1234";
  ware(this.req, this.res, function(){});
};
