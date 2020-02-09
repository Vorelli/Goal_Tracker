//  The goal for this file is to provide framework for what a task is.
//  What is a task?
//  Something that can be completed without much thought as to 'how?'
//  For example: For a larger goal such as 'get a better job',
//  A task could be: 'Update resume' or 'apply to job'
//  Something pretty basic without much need for guidance.

function Task(name, desc, dateS, dateExpected, dateC, completionStatus, subTasks = []) {
    this.edit(name, desc, dateS, dateExpected, dateC, completionStatus, subTasks);

}

//sets all accessor fields
Task.prototype.edit = function edit(name, desc, dateS, dateExpected, dateC, completionStatus, subTasks) {
    this.name = name;
    this.desc = desc;
    this.dateS = dateS;
    this.dateExpected = dateExpected;
    this.dateC = dateC;
    this.completionStatus = completionStatus;
    this.subTasks = subTasks;
    return this;
}

//small helper function to easily generate data for all subTasks
Task.prototype._getAllSubTasksData = function _getAllSubTasksData() {
    let temp = [];
    this.subTasks.forEach(subTask => {
        temp.push(subTask.getData());
    })
    return temp;
}

//returns a JSON.stringify-able data object which can easily
//be turned right back into a 'real' Task object.
Task.prototype.getData = function getData() {
    return {name:this.name, desc:this.desc, dateS:this.dateS, dateExpected:this.dateExpected,
    dateC:this.dateC, completionStatus:this.completionStatus, subTasks: this._getAllSubTasksData()};
}

//returns a value between 0 and 1 depending on the percent of
//time passing from dateS to dateExpected
Task.prototype.progress= function progress() {
    if(new Date().getTime() < new Date(this.dateS).getTime()) return 0;
    let timeSinceAdded = new Date().getTime()-new Date(this.dateS).getTime();
    let totalTimeNeeded = new Date(this.dateExpected).getTime()-new Date(this.dateS).getTime();
    return this._withinTimeFrame() ? timeSinceAdded/totalTimeNeeded : 1;
}

//if right now is before dateExpected, return true;
Task.prototype._withinTimeFrame = function _withinTimeFrame() {
    return ((new Date()).getTime()) < new Date(this.dateExpected).getTime();
}

//Returns true or false depending if the task is 'on track' for completion 
//linearly. I'm not quite sure if this is the best way to do it. Maybe use
//some sort of weighting later on because all subtasks are not created
//equally
//TODO: Task weighting for how much time it takes
//Add up all the weights, then based on that number, calculate the
//expected weighting to be completed
Task.prototype.onTrack = function onTrack() {
    let numTasks = this.subTasks.length;
    let expectedCompletedTasks = Math.floor((this.progress() * numTasks));
    let numCompleted = 0;
    this.subTasks.forEach(subTask => {if(subTask.getCompletionStatus()) numCompleted++;});
    return numCompleted >= expectedCompletedTasks;
}

//toggles completion status through setCompletionStatus
//which ends up setting this task and all subTasks to
//the new completion status
Task.prototype.toggleCompletion = function toggleCompletion() {
    this.setCompletionStatus(!this.completionStatus);
}

//sets this task and all subtasks' completion statuses to a newValue
Task.prototype.setCompletionStatus = function setCompletionStatus(newValue) {
    this.completionStatus = newValue;
    this.dateC = newValue ? new Date() : null;
    this.subTasks.forEach(subTask => {if(subTask.completionStatus!=newValue) { subTask.completionStatus = newValue; subTask.dateC = newValue ? new Date() : null; } } );
}

Task.prototype.getCompletionStatus = function getCompletionStatus() {
    let compStatus = true;
    this.subTasks.forEach(subTask => {
        if(!subTask.getCompletionStatus())
            compStatus = false;
    })
    if(!this.completionStatus)
        compStatus = false;
    return compStatus;
}

Task.prototype.hasSubTasks = function hasSubTasks() {
    return this.subTasks.length>0;
}

//returns value 1-4 based on how broad this task's depth is
Task.prototype.level = function level() {
    //level 1:subTask
    //level 2:task
    //level 3:goal
    //level 4:ambition
    let level = 1;
    if(this.hasSubTasks())
        level++;
    this.subTasks.forEach(subTask => { if(subTask.hasSubTasks()) { if(level==2)level++; } } );
    this.subTasks.forEach(subTask => { subTask.subTasks.forEach(lowestTask => { if(lowestTask.hasSubTasks()) { if(level==3)level++; } } ) } );
    return level;
}

//returns true if there's a subtask with the same name already under this task
Task.prototype._subTaskExists = function _subTaskExists(name) {
    this.subTasks.forEach(subTask => {if(subTask.name == name) return true;})
    return false;
}

//adds subtask but only if there's not one with the same name
Task.prototype.addSubTask = function addSubTask(subTask) {
    if(!this._subTaskExists(subTask.name)) {
        this.subTasks.push(subTask);
        return true;
    }
    return false;
}

//returns found subTask's index
Task.prototype.findSubTask = function findSubTask(name) {
    for(let i = 0; i < this.subTasks.length; i++) {
        if(name == this.subTasks[i].name) return i;
    }
    return -1;
}

//looks for subtask by name (can only be one of each) and if it exists, removes and returns it
Task.prototype.removeSubTask = function removeSubTask(name) {
    let index = this.findSubTask(name);
    if(index >= 0)
        return this.subTasks.splice(index, 1);
    return null;
}

export default Task;