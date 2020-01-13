//  The goal for this file is to provide framework for what a task is.
//  What is a task?
//  Something that can be completed without much thought as to 'how?'
//  For example: For a larger goal such as 'get a better job',
//  A task could be: 'Update resume' or 'apply to job'
//  Something pretty basic without much need for guidance.
import {compareAsc} from 'date-fns';

const Task = function(name, dateA, dateToBeC, dateC, completionStatus, subTasks = []) {
    const that = this;
    edit(name,dateA,dateToBeC,dateC,completionStatus,subTasks)

    const setCompletionStatus = (newValue) => {that.completionStatus = newValue;that.subTasks.foreach(subTask => subTask.setCompletionStatus(true));};
    const toggleCompletion = function() { that.completionStatus = !completionStatus; };
    const onTrack = () => { compareAsc(new Date(), that.dateToBeC) == 1 ? false : true };
    function addSubTask(task) { subTasks.push(task); };
    const hasSubTasks = () => that.subTasks.isEmpty();
    function _getAllSubTasksData() {
        let temp = [];
        that.subTasks.forEach(subTask => {
            temp.push(subTask.getData());
        });
        return temp;
    }
    const getData = function() {
        return {name: that.name, dateA: that.dateA,
                dateToBeC: that.dateToBeC, 
                dateC: that.dateC, completionStatus: that.completionStatus, subTasks: _getAllSubTasksData()} 
    };
    function edit(name, dateA, dateToBeC, dateC, completionStatus, subTasks) {
        that.name = name;
        that.dateA = dateA;
        that.dateToBeC = dateToBeC;
        that.dateC = dateC;
        that.completionStatus = completionStatus;
        that.subTasks = subTasks;
    }
    return {toggleCompletion, onTrack, edit, getData, addSubTask, hasSubTasks, getSubTasks: () => that.subTasks, setCompletionStatus};
}

export default Task;