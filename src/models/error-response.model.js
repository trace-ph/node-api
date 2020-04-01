'use strict';

module.exports = (statusCode, message) => {
	return {
		status: statusCode,
		message
	};
};
