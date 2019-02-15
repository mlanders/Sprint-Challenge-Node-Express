const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

//Route Requires
const projects = require('./data/routes/projectsRoute');
const actions = require('./data/routes/actionsRoute');

//Routes
server.use('/api/projects', projects);
server.use('/api/actions', actions);

//Default GET
server.get('/', async (req, res) => {
	res.send(`<h2>Sanity Check</h2>`);
});

//catches all non endpoints and sends a 404
server.use((req, res) => {
	res.status(404).send('Not an endpoint');
});

module.exports = server;
