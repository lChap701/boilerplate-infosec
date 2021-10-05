const helmet = require("helmet");
const express = require("express");
const app = express();

// Removes X-Powered-By header
app.use(helmet.hidePoweredBy());

// Prevents the page from being put in an <iframe> 
// or <frame>
app.use(helmet.frameguard({ action: "deny" }));

// Prevents Cross Site Scripting (XSS) Attacks
app.use(helmet.xssFilter());

// Sets the X-Content-Type-Options header to nosniff
app.use(helmet.noSniff());

// Prevents IE from opening untrusted HTML files
app.use(helmet.ieNoOpen());

// Allows the app to be accessed using HTTPS for 90 days
var ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({
  maxAge: ninetyDaysInSeconds,
  force: true
}));

// Disables DNS Prefetching
// Note: Will impact performance 
app.use(helmet.dnsPrefetchControl());

// Disables caching on the client-side
app.use(helmet.noCache());

// Sets a Content Security Policy
app.use(helmet.contentSecurityPolicy({ 
  directives: {
     defaultSrc: ["'self'"], 
     scriptSrc: ["'self'", "trusted-cdn.com"] 
  }
}));

// Configuring using parent helmet example
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: {         
    action: "deny"
  },
  contentSecurityPolicy: {   
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "trusted-cdn.com"],
    }
  }
}));




















module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
