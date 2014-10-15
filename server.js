var HTTP = require("http");
var APP = require("express")();
var BODY_PARSER = require('body-parser');

<% for (var i = 0; i < connections.length; ++i) { %>
<%   var conn = connections[i]; %>

app.<%= conn.method %>("<%= conn.path %>", function(req, res) {
  var sanitized = {};

<%   for (var j = 0; conn.params && j < conn.params.length; ++j) { %> 
<%     var name = conn.params[j].name; %>
  var <%= name %> = req.body.<%= name %>;
  if (!<%= name %>.match(conn.params[j].regex)) {
    console.log('bad input');
    return;
  } else {
    sanitized.<%= name %> = <%= name %>;
  }

<%   } %>

  <%= conn.call %>(sanitized); 
});
app.listen(<%= port %>);

<% } %>
