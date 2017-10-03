const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(function(req, res, next) {
  console.log('Request URL:', req.url);
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.get('/whoami', function(req, res) {
  // console.log(req);
  res.json({
    ipaddress: req.ip.substr(0, 7) === '::ffff:' ? req.ip.substr(7) : req.ip,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  });
});

module.exports = app;
