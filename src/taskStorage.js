import UserStorage from './UserStorage';
import Listener from './Listener';

function taskStorage() {
    this.tasks = [];
    console.log(this);
    this.load();
    Listener.addListener(undefined, 'save', this.save);
    Listener.addListener(undefined, 'load', this.load);
}

//helper function to generate all of the Task objects from the JSON
taskStorage.prototype._makeTask = function _makeTask(task) {
    let subTasks = [];
    task.subTasks.forEach(subTask => subTasks.push(this._makeTask(subTask)));
    return new Task(task.name, task.desc, task.dateS, task.dateExpected, task.dateC, task.completionStatus, subTasks);
}

//Takes the json (data) and creates a task array from it and returns it
taskStorage.prototype._parseJSON = function _parseJSON(data) {
    let tasks = [];
    if(data!=null) {
        let parsedJSON = JSON.parse(data);
        console.log(data);
        parsedJSON.tasks.forEach(task => {
            tasks.push(this._makeTask(task));
        })
    }
    return tasks;
}

//'loads' the tasks from within UserStorage
taskStorage.prototype.load = function load() {
    let data = UserStorage.load('tasks');
    let taskList = this._parseJSON(data);
    if(taskList.length > 0)
        this.tasks = taskList;
}

//generates the JSON going to be saved to UserStorage
taskStorage.prototype._generateJSON = function _generateJSON(tasks) {
    let data = {tasks:[]};
    tasks.forEach(task => {
        data.tasks.push(task.getData());
    })
    return JSON.stringify(data);
}

//Saves all task (and subTask) data to UserStorage
taskStorage.prototype.save = function save() {
    UserStorage.save('tasks', this._generateJSON(this.tasks));
}

taskStorage.prototype.addTask = function addTask(task) { this.tasks.push(task); }
taskStorage.prototype.findTask = function findTask(name) { for(let i = 0; i < this.tasks.length; i++) { if(this.tasks[i].name == name) return i; } return -1; }
taskStorage.prototype.getTask = function getTask(index) { if(index>=0) return this.tasks[index]; }
taskStorage.prototype.removeTask = function (name) { if(this.findTask(name)!=-1) return this.tasks.splice(this.findTask(name), 1); return null; }
taskStorage.prototype.getTasks = function() { return this.tasks };

export default taskStorage;