import Goal from './Goal';
import Task from './Task';
import Ambition from './Ambition';
import TableViewGenerator from './TableViewGenerator';
import CenterElement from './CenterElement';
import BlockViewGenerator from './BlockViewGenerator';

let a = new Goal('Reach Gold in Mythic League on Faceit', 'a', new Date(2019,11,20), new Date(2020,0,1), null, false);
console.log(a.getGoalData())
console.log(a.expectedProgress());
a.addTask(new Task('Reach lvl 8 on Faceit', new Date(2019,11,20), new Date(2020, 0, 15), null, false, [new Task(('Reach lvl 6 on Faceit'), new Date(2019,11,20), new Date(2020, 0, 15), null, false), new Task(('Reach lvl 7 on Faceit'), new Date(2019,11,20), new Date(2020, 0, 15), null, false)]))
console.log(a.getGoalData());
console.log(a.getGoalData().tasks)
let b = new Ambition('Go Pro in CS:GO', '', new Date(2019,6,4), new Date(2020,5,4), null, false, [a]);
console.log(b.getAmbitionData());
let tableViewGenerator = new TableViewGenerator();

document.querySelector('body').appendChild(tableViewGenerator.generateTable(100));
let center = new CenterElement(['.ambitionViewer', '.detailedView']);

let c = new BlockViewGenerator();
document.querySelector('body').appendChild(c.generateAmbitionViewer('lol'));

center.center();
window.onresize = center.center;