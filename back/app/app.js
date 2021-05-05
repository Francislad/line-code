const cors = require('cors');
const restify = require('restify');

const {messageSender, messageReceiver, getMessages} = require('./services/request.service');

const server = restify.createServer({
  name: 'line-code-be',
  version: '1.0.0'
});

server.use(cors());
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.opts('/*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization");
  return next();
}, (req, res) => {
  res.send(200);
});

server.get('/messages', getMessages);
server.post('/send', messageSender);
server.post('/receive', messageReceiver);

module.exports = server;
