var HTTP = require("http");
var APP = require("express")();
var BODY_PARSER = require('body-parser');

<% for (var i = 0; i < connections.length; ++i) { %>
<%   var conn = connections[i]; %>
app.<%= conn.method %>("<%= conn.path %>", function(req, res) {
  var sanitized = {};
<%   for (var j = 0; conn.params && j < conn.params.length; ++j) { %> 
       var <%= conn.params.name %> = req.body.<%= conn.params.name %>;
       if (!<%= conn.params.name %>.match(conn.params.regex)) {
         console.log('bad input');
         return;
       } else {
         sanitized.<%= conn.params.name %> = <%= conn.params.name %>;
       }
<%   } %>
  <%= conn.call %>(sanitized); 
});
<% } %>
