import Ambitions from "./Ambitions";
import Ambition from './Ambition';
import SimplifiedViewGenerator from './SimplifiedViewGenerator';
import BlockViewGenerator from "./BlockViewGenerator";
import TableViewGenerator from "./TableViewGenerator";
import Goal from './Goal'
import Task from './Task';
import Listener from './Listener';
import { grab } from "./grab";

const GoalTrackerManager = function() {
    let ambitions = new Ambitions();
    let a = new Goal('Reach Gold in Mythic League on Faceit', 'a', new Date(2019,11,20), new Date(2020,0,1), null, false);
    a.addTask(new Task('Reach lvl 8 on Faceit', new Date(2019,11,20), new Date(2020, 0, 15), null, false, [new Task(('Reach lvl 6 on Faceit'), new Date(2019,11,20), new Date(2020, 0, 15), null, false), new Task(('Reach lvl 7 on Faceit'), new Date(2019,11,20), new Date(2020, 0, 15), null, false)]))
    let b = new Ambition('Go Pro in CS:GO', '', new Date(2019,6,4), new Date(2020,5,4), false, [a]);
    let b2 = new Ambition('Go Pro in LoL', '', new Date(2019,6,4), new Date(2020,5,4), false, [new Goal('','',new Date(), new Date(), new Date(), true)]);
    ambitions.push(b);
    ambitions.push(b2);
    let simpViewGen = new SimplifiedViewGenerator(Listener);
    let blockViewGen = new BlockViewGenerator(Listener);

    _addListeners();

    function _addListeners() {
        Listener.addListener('addAmbition', _addAmbition);
        Listener.addListener('deleteAmbition', _delAmbition);
        Listener.addListener('editAmbition', _editAmbition);
        Listener.addListener('generateSimplifiedView', _generateSimplifiedView);
        Listener.addListener('generateBlockView', _generateBlockView);
        Listener.addListener('generateTableView', _generateTableView);
    }

    function _addAmbition([name, desc, dateS, dateC, completionStatus, goals = []]) {
        ambitions.push(new Ambition(name, desc, dateS, dateC, completionStatus, goals));
    }

    function _delAmbition (name) {
        ambitions.removeByName(name);
    }

    function _editAmbition ([oldAmbition, name, desc, dateS, dateC, completionStatus, goals = []]) {
        console.log(ambitions.getData());
        let a = oldAmbition.origAmbition.edit(name, desc, dateS, dateC, completionStatus, goals);
        console.log(ambitions.getData())
        return a;
    }

    function _generateSimplifiedView() {
        simpViewGen.generateSimplifiedView(ambitions);
    }

    function _generateBlockView(ambition) {
        return blockViewGen.generateAmbitionViewer(ambition);
    }

    function _generateTableView(ambition) {
        console.log(ambition);
    }
}();

export default GoalTrackerManager;