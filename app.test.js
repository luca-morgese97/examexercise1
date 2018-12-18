
const app = require('./app.js');
const fetch = require('node-fetch');
const baseUrl = 'http://localhost:3000';

test('dummy test', ()=> {
	expect(2).toBe(2);
});

test('GET base path call', () => {
	return fetch(baseUrl + '/')
		.then(response => {
			expect(response.status).toBe(200);
			return response.json()
		})
		.then(rjson => {
			expect(rjson.body).toBe('Hello there!');
		})
});


afterAll(() => {
	app.server.close();
});