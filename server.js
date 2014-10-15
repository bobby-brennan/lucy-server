var HTTP = require("http");
var APP = require("express")();
var BODY_PARSER = require('body-parser');

<% for (var i = 0; i < connections.length; ++i) {
     var conn = connections[i]; %>
app.<%= conn.method %>("<%= conn.path %>", function(req, res) {
  var sanitized = {};
<%   for (var j = 0; conn.params && j < conn.params.length; ++j) { 
       var name = conn.params[j].name;
       var regex = conn.params[j].regex; %>
  var <%= name %> = req.body.<%= name %><%= regex ? '' : ' // Unsanitized' %>;
<%     if (regex) { %>
  if (!<%= name %>.match("<%= regex %>")) {
    console.log('bad input');
    return;
  } else {
    sanitized.<%= name %> = <%= name %>;
  }
<%     } else { %>
  sanitized.<%= name %> = <%= name %>;
<%     } %>
<%   } %>
  <%= conn.call %>(sanitized); 
});
<% } %>
app.listen(<%= port %>);
