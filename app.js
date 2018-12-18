
//Import
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const Assignement = require('./Resources/assignement.js');

//Init
const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

							//taskId, assignementId, workerId, assignementResult
let exam = new Assignement('bananaTask', 'bananaAssignement', 'bananaWorker', 'bananaResult');
let exams = [];
let resource = {nextId: 0, exams}

exams.push(exam);



//API CALLS

app.get('/', function(req, res) {
	res.json({body: "Hello there!"});
});

app.get('/assignements', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({status:"200", body:resource.exams}, null, 3));
});

app.post('/assignements', function(req, res) {
	//Automatic Id assignement
	let newAssigId = "assignement" + resource.nextId;
	resource.nextId++;
	
	//Assignement properties
	let taskId = req.body.taskId;
	let workerId = req.body.workerId;
	let assignementResult = req.body.assignementResult;

	let assignementToPost = new Assignement(taskId, newAssigId, workerId, assignementResult);

	console.log(assignementToPost);
	exams.push(assignementToPost);
	res.json({status:"201", body: resource.exams.filter(obj => obj.assignementId == newAssigId)});
});

app.get('/assignements/:id', function(req, res) {
	let asId = req.params.id;
	console.log(asId);

	res.setHeader('Content-Type', 'application/json');

	let data = resource.exams.filter(obj => obj.assignementId == asId);
	if (data.length > 0) {
		res.send(JSON.stringify({status:"200", body:data}, null, 3));
	} else {
		res.json({status:"404"});
	}
});

app.put('/assignements/:id', function(req, res) {
	let asId = req.params.id;
	let taskId = req.body.taskId;
	let assigRes = req.body.assignementResult;

	let found = false;
	for (let i = 0; i < resource.exams.length; i++) {
		if (resource.exams[i].assignementId === asId) {
			resource.exams[i].update(taskId, assigRes);
			found = true;
		}
	}
	if (found) {
		res.json({status:"204"});
	} else {
		res.json({status:"404"});
	}

	/*
	let index = resource.exams.indexOf(resource.exams.find(obj => obj.assignementId == asId));
	console.log(index);
	if (index > -1) {
		resource.exams[index].update(taskId, assigRes);
		res.json({status:"204"});
	} else {
		//index research got -1 as asId invalid
		res.json({status:"404"});		
	}
	*/
});

app.delete('/assignements/:id', function(req, res) {
	let asId = req.params.id;

	let found = false;
	for (let i = 0; i < resource.exams.length; i++) {
		if (resource.exams[i].assignementId === asId) {
			resource.exams.splice(i, 1);
			found = true;
		}
	}
	if (found) {
		res.json({status:"204"});
	} else {
		res.json({status:"404"});
	}
	
	/*
	let index = resource.exams.indexOf(resource.exams.filter(obj => obj.assignementId == asId));
	if (index > -1) {
		resource.exams.splice(index, 1);
		res.json({status:"204"});
	} else {
		//index research got -1 as asId invalid
		res.json({status:"404"});
	}
	*/
});


let server = app.listen(port, () => {
	console.log('App listening on port: ' + port);
});

module.exports = app;
module.exports.server = server;