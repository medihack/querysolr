/*
 *	QuerySolr, version 0.1 (2011-03-14)
 *	
 *  Copyright(c) 2011 Kai Schlamp
 *  
 *  Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
*/
(function($) {
	$.querysolr = function(o) {
		// Options
		var options = $.extend({
			host : "127.0.0.1",
            port : "8983",
            component: "select",
            params : { q: "*:*" },
			callback : function(data) { },
            encodeURI: true
		}, o);

        function buildQueryString() {
          var queryString = "";
          var params = options.params;
          for (var key in params) {
            if (queryString != "") {
              queryString += "&";
            }
            
            var value = params[key];
            if (options.encodeURI) {
              value = encodeURIComponent(value);
            }
            queryString += key + "=" + value;
          }

          return queryString;
        }

        return {
          query: function() {
            var solrUrl = options.host + ":" + options.port + "/solr/" + options.component + "/?";
            var requiredParams = "&wt=json&json.wrf=?";
            var solrRequest = solrUrl + buildQueryString(options.params) + requiredParams;
            $.getJSON(solrRequest, {}, options.callback);
          },
          createDismax: function(query, field) {
            var qf = '';
            if (field) {
              qf = " qf='" + field + "'";
            }
            return '_query_:"{!dismax' + qf + '}' + query.replace('"', '\\"') + '"';
          },
          escapeLucene: function(value) {
            var specials = ['+', '-', '&', '!', '(', ')', '{', '}', '[', ']', '^', '"', '~', '*', '?', ':', '\\'];
            var regexp = new RegExp("(\\" + specials.join("|\\") + ")", "g");
            return value.replace(regexp, "\\$1");
          }
        }
	};
})(jQuery);
