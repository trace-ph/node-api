const http = require('http');

const { API_PORT } = process.env;

const options = {
	hostname: '0.0.0.0',
	port: API_PORT,
	timeout: 3000,
	path: '/healthcheck',
	method: 'GET'
};

const request = http.request(options, res => {
	if (res.statusCode == 200) {
		process.exit(0);
	} else {
		process.exit(1);
	}
});

request.on('error', function (err) {
	process.exit(1);
});

request.end();
