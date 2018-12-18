
const express = require('express');
//const http = require('http');
const port = process.env.PORT || 3000;

const app = express();

app.get('/', function(req, res) {
	res.json({body: "Hello, world!"});
});





app.listen(port, () => {
	console.log('App listening on port: ' + port);
});