require('dotenv').config();
const DevRant = require('../devrant');

/*
const {
	DEVRANT_USERNAME,
	DEVRANT_PASSWORD,
} = process.env;

const STRING_WITH_SPECIAL_CHARS = "`!@#$%^&*()-_=+[{]}\\|;:'\",<.>/? ✓";

function newClient() {
	return DevRant.withCredentials(DEVRANT_USERNAME, DEVRANT_PASSWORD);
}

// Used when testing rants to avoid duplicates
function randomString() {
	return Math.random().toString(36).substr(2, 11);
}

function htmlEscape(string) {
	return string
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}
*/

describe('core', () => {
	it('should default export to be a function', () => {
		expect(new DevRant()).toBeInstanceOf(DevRant);
	});
});

// TODO