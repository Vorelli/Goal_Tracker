import {grab} from './grab';
import TaskAdderOverlayManager from './TaskAdderOverlayManager';
import Listener from './Listener';

function InterfaceLoad(globalListenerObject) {
    let tAOM = new TaskAdderOverlayManager();
    grab('#sidebar #hamburgerIcon').addEventListener('click', globalListenerObject.trigger.bind(this, 'toggleSidebar'));
    grab('#ambitionTableIcon').addEventListener('click', globalListenerObject.trigger.bind(this, 'loadAmbitionTable'));
    grab('#topbar div').style.marginLeft = '75px';
    grab('#sidebar #habitTrackerIcon').addEventListener('click', Listener.trigger.bind(this,'test', 'dafas'))
    /*grab('#ambitionAdderOverlay').addEventListener('click', (event) => {
        if(event.path[0] == document.querySelector('#ambitionAdderOverlay')) {
            globalListenerObject.trigger('toggleAddAmbitionOverlay');
        }
    })
    grab('#ambitionAdderOverlay button').addEventListener('click', globalListenerObject.trigger.bind(this, 'ambitionAdderAdd'));
*/
}

export default InterfaceLoad;