module.exports = (req, res) => {
  req.ip = req.headers['x-forwarded-for'] || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);

  res.end(JSON.stringify({
    ipaddress: req.ip.substr(0, 7) === '::ffff:' ? req.ip.substr(7) : req.ip,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  }));
};