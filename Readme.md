# QuerySolr

QuerySolr is small jQuery library to make Ajax **Solr** requests more easy.

## Sending Solr requests

The Solr request can be easily configured by using options parameters:

    $.querysolr({
      host: "127.0.0.1", // the IP or domain where the Solr server runs (default '127.0.0.1')
      port: "8983", // the port the Solr server listens (default '8983')
      component: "select" // the query component to use (default 'select')
      params: { // the Solr query params to use (default 'q: *:*"')
        q: "*:*",
        fq: "type:car"
      }
      callback: function(data) { // a callback called after Solr results are received
        // do something with the returned Solr results (in JSON format)
      },
      encodeURI: true // automatically encode the URI (default 'true')
    }).query(); // send request.

The above code would send the following request to Solr:
`http://127.0.0.1:8983/solr/select/?q=*%3A*&fq=type:car&wt=json&json.wrf=?`

## Solr helper functions

Additionally there are two helper functions:

* `createDismax` to create a dismax expression for nested queries:

   $.querysolr.createDismax("john", "name") // results in _query_:"{!dismax qf='name'}john"

The first parameter is the query string itself, the second (optional) parameter is one or more (space separated) fields.

* `escapeLucene` to escape special characters in a lucene query string:

    $.querysolr.escapeLucene("string+to-escape") // results in "string\\+to\\-escape"

## Dependencies

Just jQuery (tested with jQuery 1.4.4)

## Testing

QuerySolr is tested by using qUnit.

## License

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html

Copyright(c) 2011 Kai Schlamp
