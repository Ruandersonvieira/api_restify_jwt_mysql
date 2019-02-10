
// importação Restify
const restify = require('restify');
// Criação do Servidor Restify
const server = restify.createServer();
// importação Rotas
const routes = require('../http/routes');
// importação Cros
const cors = require('./cors'); 
// Das configurações do JWT
const jwtMiddleware = require('./jwtMiddleware');

// Das configurações do JWT

const exclusions = ['/authorize'];

// Configurçoes iniciais
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());
server.use(jwtMiddleware({ exclusions }));

routes(server);

module.exports = server;
