
class Assignement {
	constructor(taskId, assignementId, workerId, assignementResult) {
		this.taskId = taskId;
		this.assignementId = assignementId;
		this. workerId = workerId;
		this. assignementResult = assignementResult;
	}
	update(taskId, assignementResult) {
		if(taskId !== "" && taskId !== undefined)  this.taskId = taskId;
		if(assignementResult !== "" && assignementResult !== undefined)  this.assignementResult = assignementResult;
	}
}

module.exports = Assignement