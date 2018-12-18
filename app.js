
const express = require('express');
const port = process.env.PORT || 3000;

const app = express();

const Assignement = require('./Resources/assignement.js');
//taskId, assignementId, workerId, assignementResult

let exam = new Assignement('bananaTask', 'bananaExam', 'bananaWorker', 'bananaResult');
let exams = [];

exams.push(exam);

app.get('/', function(req, res) {
	res.json({body: "Hello there!"});
});

app.get('/assignements', function(req, res) {
	res.json({status:"200", body: exams})
});



app.listen(port, () => {
	console.log('App listening on port: ' + port);
});