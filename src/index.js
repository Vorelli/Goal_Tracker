import Goal from './Goal';
import Task from './Task';
import Ambition from './Ambition';
import TableViewGenerator from './TableViewGenerator';
import CenterElement from './CenterElement';
import BlockViewGenerator from './BlockViewGenerator';
import InterfaceLoad from './InterfaceLoad';
import Ambitions from './Ambitions';



let a = new Goal('Reach Gold in Mythic League on Faceit', 'a', new Date(2019,11,20), new Date(2020,0,1), null, false);
console.log(a.getGoalData())
console.log(a.expectedProgress());
a.addTask(new Task('Reach lvl 8 on Faceit', new Date(2019,11,20), new Date(2020, 0, 15), null, false, [new Task(('Reach lvl 6 on Faceit'), new Date(2019,11,20), new Date(2020, 0, 15), null, false), new Task(('Reach lvl 7 on Faceit'), new Date(2019,11,20), new Date(2020, 0, 15), null, false)]))
console.log(a.getGoalData());
console.log(a.getGoalData().tasks)
let b = new Ambition('Go Pro in CS:GO', '', new Date(2019,6,4), new Date(2020,5,4), false, [a]);

let b2 = new Ambition('Go Pro in LoL', '', new Date(2019,6,4), new Date(2020,5,4), false, [new Goal('','',new Date(), new Date(), new Date(), true)]);
console.log(b.getAmbitionData());
let tableViewGenerator = new TableViewGenerator();

console.log(JSON.stringify(b.getAmbitionData()));
console.log(JSON.parse(JSON.stringify(b.getAmbitionData())))
console.log(new Date(JSON.parse(JSON.stringify(b.getAmbitionData())).dateA))

//document.querySelector('#content').appendChild(tableViewGenerator.generateTable(100));
let center = new CenterElement(['#content']);

let c = new BlockViewGenerator();
//document.querySelector('body').insertBefore(c.generateAmbitionViewer('lol'), document.querySelector('script'));

let d = new Ambitions([b, b2]);
console.log(d.getData());
console.log(JSON.stringify(d.getData()))
console.log(JSON.parse(JSON.stringify(d.getData())))
let i = new InterfaceLoad(center, d);
i.onStartup();



center.center();
window.onresize = center.center;