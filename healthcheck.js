const http = require("http");

const options = {
	hostname : "0.0.0.0",
	port : "80",
	timeout : 3000,
	path: '/healthcheck',
	method: 'GET'
};

const request = http.request(options, (res) => {
	if (res.statusCode == 200) {
		process.exit(0);
	}
	else {
		process.exit(1);
	}
});

request.on('error', function(err) {
	process.exit(1);
});

request.end();
