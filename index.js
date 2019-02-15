require('dotenv').config();
const server = require('./server');

const port = process.env.PORT || 5000;

server.listen(port, () => {
	console.log(`\n* Server running on httpp://localhost:${port} *\n`);
});
