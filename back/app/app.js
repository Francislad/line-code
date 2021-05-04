let restify = require('restify');

const {messageReceiver} = require('./services/request.service');

const server = restify.createServer({
  name: 'line-code-be',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.post('/message', messageReceiver);

module.exports = server;
