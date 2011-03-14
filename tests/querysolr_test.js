(function($) {

window.originalJSON = $.getJSON;
module("QuerySolr", {
	setup: function() {
      $.getJSON = function(url, data, callback, format) {
          callback(url, data, callback, format);
      };
    },
    teardown: function() {
      $.getJSON = window.originalJSON;
    }
});

test("query without additional options", function() {
  expect(2);

  $.querysolr({
    callback: function(url, data) {
      equal(url, "127.0.0.1:8982/solr/select/?q=*%3A*&wt=json&json.wrf=?");
      equal(data.toSource(), "({})");
    }
  }).query();
});

test("query without additional options", function() {
  expect(2);

  $.querysolr({
    host: "99.99.99.99",
    port: "77",
    params: {
      q: "mer",
      fq: "type:car"
    },
    callback: function(url, data) {
      equal(url, "99.99.99.99:77/solr/select/?q=mer&fq=type%3Acar&wt=json&json.wrf=?");
      equal(data.toSource(), "({})");
    }
  }).query();
});

test("query without encoding URI", function() {
  expect(2);

  $.querysolr({
    host: "99.99.99.99",
    port: "77",
    params: {
      q: "mer",
      fq: "type:car"
    },
    callback: function(url, data) {
      equal(url, "99.99.99.99:77/solr/select/?q=mer&fq=type:car&wt=json&json.wrf=?");
      equal(data.toSource(), "({})");
    },
    encodeURI: false
  }).query();
});

test("create dismax expression without field", function() {
  expect(1);
  var dismax = $.querysolr().createDismax("mer");
  equal(dismax, '_query_:"{!dismax}mer"');
});

test("create dismax expression with field", function() {
  expect(1);
  var dismax = $.querysolr().createDismax("mer", "name");
  equal(dismax, '_query_:"{!dismax qf=\'name\'}mer"');
});

test("create dismax expression with value to be escaped", function() {
  expect(1);
  var dismax = $.querysolr().createDismax('me"r');
  equal(dismax, '_query_:"{!dismax}me\\"r"');
});

test("escape lucene string", function() {
  expect(1);
  var lucene = $.querysolr().escapeLucene('+-&!(){}[]^"~*?:\\');
  equal(lucene, '\\+\\-\\&\\!\\(\\)\\{\\}\\[\\]\\^\\\"\\~\\*\\?\\:\\\\');
});

})(jQuery);
