import Goal from './Goal';
import Task from './Task';
import Ambition from './Ambition';
import InterfaceLoad from './InterfaceLoad';
import Ambitions from './Ambitions';
import Listener from './Listener';
import  GoalTrackerManager from './GoalTrackerManager';
import GUIManager from './GUIManager';



let a = new Goal('Reach Gold in Mythic League on Faceit', 'a', new Date(2019,11,20), new Date(2020,0,1), null, false);
a.addTask(new Task('Reach lvl 8 on Faceit', new Date(2019,11,20), new Date(2020, 0, 15), null, false, [new Task(('Reach lvl 6 on Faceit'), new Date(2019,11,20), new Date(2020, 0, 15), null, false), new Task(('Reach lvl 7 on Faceit'), new Date(2019,11,20), new Date(2020, 0, 15), null, false)]))
let b = new Ambition('Go Pro in CS:GO', '', new Date(2019,6,4), new Date(2020,5,4), false, [a]);

let b2 = new Ambition('Go Pro in LoL', '', new Date(2019,6,4), new Date(2020,5,4), false, [new Goal('','',new Date(), new Date(), new Date(), true)]);
//let tableViewGenerator = new TableViewGenerator();


//document.querySelector('#content').appendChild(tableViewGenerator.generateOldTable(100));

let globalListenerObject = Listener;

let d = new Ambitions([b, b2]);
let i = new InterfaceLoad(globalListenerObject, d);
i.onStartup();




window.onresize = globalListenerObject.trigger('center');