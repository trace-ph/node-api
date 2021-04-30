/*
	Variables used for generating dummy data

	Notes:
	> Type of users:
		> node_id = A; Direct contact (dist < 2m)
		> node_id = B; Proximal (2m < dist < 3m && time > 15 min)
		> node_id = C; Neither
		> node_id = D; Confirmed positive
	> Attenuation interval chosen is as follows:
		2m: attenuation <= 27
		3m:	51 >= attenuation < 27
*/

// Time limit of contacts
const min15tosec = 60 * 15;
const timelimit = Math.floor((Math.random() * min15tosec));

// Attenuation interval
const atten_2m = 27;
const atten_3m = 14;

// Device models per node type
const deviceModelA = 'SM-A705MN';
const deviceModelB = 'SM-A705MN';
const deviceModelC = 'SM-A705MN';
const deviceModelD = 'SM-A705MN';

// When we want to use an actual node_id for testing
const node_A = 'A';
const node_B = 'B';
const node_C = 'C';
const node_D = 'D';

// Date to start off to
var date = new Date();
date.setDate(date.getDate() - 40);



module.exports = {
	min15tosec,
	timelimit,
	atten_2m,
	atten_3m,
	deviceModelA,
	deviceModelB,
	deviceModelC,
	deviceModelD,
	node_A,
	node_B,
	node_C,
	node_D,
	date,
};

/*
References:
> Exporting variables in NodeJS
	https://stackoverflow.com/questions/7612011/how-to-get-a-variable-from-a-file-to-another-file-in-node-js
*/
