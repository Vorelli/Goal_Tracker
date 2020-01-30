import Task from './Task';
import InterfaceLoad from './InterfaceLoad';
import Listener from './Listener';
import GoalTrackerManager from './GoalTrackerManager';

let iL = new InterfaceLoad(Listener);



let t = new Task('Reach Gold in Mythic League on Faceit', 'a', new Date(2019,11,20), new Date(2020,0,1), undefined, false);
console.log(t.getData());
console.log(JSON.stringify(t.getData()));
console.log(t.onTrack());
t.toggleCompletion();
console.log(t.onTrack());
console.log(t.progress());
console.log(t.level());
t.addSubTask(new Task('hello', 'benis', new Date(), new Date(2020, 1, 3)));
console.log(t);
console.log(t.getData());
console.log(t.level())



let a = new Task('Reach Gold in Mythic League on Faceit', 'a', new Date(2019,11,20), new Date(2020,0,1), null, false);
a.addSubTask(new Task('Reach lvl 8 on Faceit', '', new Date(2019,11,20), new Date(2020, 0, 15), null, false, [new Task(('Reach lvl 6 on Faceit'), new Date(2019,11,20), new Date(2020, 0, 15), null, false), new Task(('Reach lvl 7 on Faceit'), new Date(2019,11,20), new Date(2020, 0, 15), null, false)]))
let b = new Task('Go Pro in CS:GO', '', new Date(2019,6,4), null, new Date(2020,5,4), false, [a]);

let b2 = new Task('Go Pro in LoL', '', new Date(2019,6,4), null, new Date(2020,5,4), false, [new Task('','',new Date(), new Date(), new Date(), true)]);
console.log(b);
console.log(b.level());
//let tableViewGenerator = new TableViewGenerator();


//document.querySelector('#content').appendChild(tableViewGenerator.generateOldTable(100));

//let d = new Ambitions([b, b2]);
//let i = new InterfaceLoad(globalListenerObject, d);
//i.onStartup();




window.onresize = Listener.trigger.bind(this, 'center');