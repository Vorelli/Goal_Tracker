import {grab, grabAll} from './grab';
import SimplifiedViewGenerator from './SimplifiedViewGenerator';

const InterfaceLoad = function(centeringObject, ambitionsArray) {
    const that = this;
    let off = true;
    const defaultTopbarLeftMargin = 75;
    const sViewGen = new SimplifiedViewGenerator();
    that.aArray = ambitionsArray;
    that.center = centeringObject;

    function onStartup() {
        grab('#sidebar #hamburgerIcon img').src = 'menuOpen.png'
        grab('#sidebar #hamburgerIcon').addEventListener('click', _toggleSidebar);
        //grab('#ambitionTableIcon img').src = 'ambitionTable.png';
        grab('#ambitionTableIcon').addEventListener('click', _loadAmbitionTable);
        //grab('#habitTrackerIcon img').src = 'habitTracker.png'
        grab('#topbar div').style.marginLeft = defaultTopbarLeftMargin + 'px';
    }

    function _clear() {
        grab('#content').innerHTML = '';
    }

    function _loadAmbitionTable(){
        _clear();
        sViewGen.generateSimplifiedView(that.aArray);
        that.center.center();
    }

    function _toggleSidebar (event) {
        grab('#hamburgerIcon img').src = off ? 'menuClose.png' : 'menuOpen.png';
        grab('#sidebar').style.width = off ? 250+'px' : 60+'px'
        grab('#ambitionTableIcon a').textContent = off ? "Ambitions" : "A";
        grab('#habitTrackerIcon a').textContent = off ? "Habits" : "H";
        grab('#dailyScheduleIcon a').textContent = off ? "Schedule" : "S";
        grabAll('#sidebar div').forEach(element => { element.style.width = off ? '250px' : '60px' })
        grab('#topbar div').style.marginLeft = off ? defaultTopbarLeftMargin+190+'px' : defaultTopbarLeftMargin +'px';
        off = off ? false : true;
    }
    return {onStartup};
}
export default InterfaceLoad;