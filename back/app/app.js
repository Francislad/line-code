const cors = require('cors');
const restify = require('restify');

const {messageReceiver} = require('./services/request.service');

const server = restify.createServer({
  name: 'line-code-be',
  version: '1.0.0'
});

server.use(cors());
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.opts('/message', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization");
  return next();
}, (req, res) => {
  res.send(200);
});
server.post('/message', messageReceiver);

module.exports = server;
