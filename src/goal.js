//  What is a goal?
//  Something with a clear set of tasks to be able to accomplish.
//  Something broad like an ambition can be condensed into a single
//  or several goals in order to accomplish it.
//
//  Can a goal be completed without tasks?
import Task from './Task';
import {compareAsc} from 'date-fns';

const Goal = function(name, desc, dateA, dateToBeC, dateC, completionStatus, tasks = []) {
    const that = this;
    edit(name,desc,dateA,dateToBeC,dateC,completionStatus,tasks)
    //private 'helper' methods
    function _allTasksComplete() { if(!that.completionStatus)return false;tasks.forEach(task => {if(!task.getData().completionStatus) return false;});return true; }
    function _getAllTasksData() { let temp = []; that.tasks.forEach(task => { temp.push(task.getData()); }); return temp; };
    function _onTrack() { return compareAsc(new Date(), that.dateToBeC) == 1 ? false : true };


    //public methods
    function findTaskByName(name) { for(let i = 0; i < that.tasks.length; i++) { if(that.tasks[i].getData().name == name) return i; } return -1; };
    function addTask(task) { if(findTaskByName(task.name) == -1) that.tasks.push(task); };
    function remTask(index) { return that.tasks.splice(index,1); };
    
    function expectedProgress() {
        if(new Date().getTime() < that.dateA.getTime()) return 0;
        let timeSinceAdded = new Date().getTime()-that.dateA.getTime();
        let totalTimeNeeded = that.dateToBeC.getTime()-that.dateA.getTime();
        return _onTrack() ? timeSinceAdded/totalTimeNeeded : 1;
    }
    
    function getData() {
        return {name: that.name, desc: that.desc, dateA: that.dateA, 
            dateToBeC: that.dateToBeC, 
            dateC: that.dateC, completionStatus: that.completionStatus, tasks: _getAllTasksData()}
    }

    function toggleCompletion() {
        if(_allTasksComplete()) setAllTasksCompletion(false);
        else setAllTasksCompletion(true);
    }

    function setAllTasksCompletion(newValue) {
        that.completionStatus = newValue;
        tasks.forEach(task => {task.setCompletionStatus(newValue)})
    }


    function edit (name, desc, dateA, dateToBeC, dateC, completionStatus, tasks = []) {
        that.name = name;
        that.desc = desc;
        that.dateA = dateA;
        that.dateToBeC = dateToBeC;
        that.dateC = dateC;
        that.completionStatus = completionStatus;
        that.tasks = tasks;
    }
    return {getData, edit, expectedProgress, addTask, toggleCompletion, setAllTasksCompletion, findTaskByName, remTask};
}

export default Goal;