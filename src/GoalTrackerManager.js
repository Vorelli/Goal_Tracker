import Task from './Task';
import Listener from './Listener';
import taskStorage from './taskStorage';

const GoalTrackerManager = function() {
    let a = new Task('Reach Gold in Mythic League on Faceit', 'a', new Date(2019,11,20), new Date(2020,0,1), null, false);
    a.addSubTask(new Task('Reach lvl 8 on Faceit', new Date(2019,11,20), new Date(2020, 0, 15), null, false, [new Task(('Reach lvl 6 on Faceit'), new Date(2019,11,20), new Date(2020, 0, 15), null, false), new Task(('Reach lvl 7 on Faceit'), new Date(2019,11,20), new Date(2020, 0, 15), null, false)]))
    let b = new Task('Go Pro in CS:GO', '', new Date(2019,6,4), null, new Date(2020,5,4), false, [a]);
    let b2 = new Task('Go Pro in LoL', '', new Date(2019,6,4), null, new Date(2020,5,4), false, [new Task('','',new Date(), new Date(), new Date(), true)]);
    let tStorage = new taskStorage();
    tStorage.addTask(b);
    tStorage.addTask(b2);

    _addListeners();

    function _addListeners() {
        Listener.addListener(undefined, 'addTask', _addTask);
        Listener.addListener(undefined, 'deleteTask', _delTask);
        Listener.addListener(undefined, 'editTask', _editTask);
        Listener.addListener(tStorage, 'getTasks', _getTasks);
    }

    function _getTasks() { return tStorage.getTasks(); };
    function _addTask([name, desc, dateS, dateC, dateExpected, completionStatus, subTasks = []]) { tStorage.addTask(new Task(name, desc, dateS, dateC, dateExpected, completionStatus, subTasks)); return tStorage.getTask(tStorage.findTask(name)); }
    function _delTask (name) { tStorage.removeTask(name); }
    function _editTask ([oldTask, name, desc, dateS, dateExpected, dateC, completionStatus, goals = []]) { return tStorage.getTask(tStorage.findTask(oldTask.name)).edit(name, desc, dateS, dateC, dateExpected, completionStatus, goals); }
    function _generateSimplifiedView() { simpViewGen.generateSimplifiedView(); };
    function _generateBlockView(ambition) { return blockViewGen.generateAmbitionViewer(tStorage.getTasks()); }
    function _generateTableView(ambition) { console.log(ambition); }
}();

export default GoalTrackerManager;