import Goal from './goal';
import Task from './task';
import Ambition from './ambition';
import DetailedViewGenerator from './detailedViewGenerator';
import CenterElement from './centerElement';
import AmbitionViewerGenerator from './ambitionViewerGenerator';

let a = new Goal('Reach Gold in Mythic League on Faceit', 'a', new Date(2019,11,20), new Date(2020,0,1), null, false);
console.log(a.getGoalData())
console.log(a.expectedProgress());
a.addTask(new Task('Reach lvl 8 on Faceit', new Date(2019,11,20), new Date(2020, 0, 15), null, false, [new Task(('Reach lvl 6 on Faceit'), new Date(2019,11,20), new Date(2020, 0, 15), null, false), new Task(('Reach lvl 7 on Faceit'), new Date(2019,11,20), new Date(2020, 0, 15), null, false)]))
console.log(a.getGoalData());
console.log(a.getGoalData().tasks)
let b = new Ambition('Go Pro in CS:GO', '', new Date(2019,6,4), new Date(2020,5,4), null, false, [a]);
console.log(b.getAmbitionData());
let detailedviewGenerator = new DetailedViewGenerator();

document.querySelector('body').appendChild(detailedviewGenerator.generateTable(100));
let center = new CenterElement(['.ambitionViewer', '.detailedView']);

let c = new AmbitionViewerGenerator();
document.querySelector('body').appendChild(c.generateAmbitionViewer('lol'));

center.center();
window.onresize = center.center;