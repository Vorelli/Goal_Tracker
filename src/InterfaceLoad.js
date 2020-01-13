import {grab, grabAll} from './grab';

const InterfaceLoad = function(l) {
    const defaultTopbarLeftMargin = 75;
    const that = this;
    that.l = l;

    function onStartup() {
        grab('#sidebar #hamburgerIcon img').src = 'menuOpen.png'
        grab('#sidebar #hamburgerIcon').addEventListener('click', that.l.trigger.bind(that, 'toggleSidebar'));
        grab('#ambitionTableIcon').addEventListener('click', that.l.trigger.bind(that, 'loadAmbitionTable'));
        grab('#topbar div').style.marginLeft = defaultTopbarLeftMargin + 'px';
        grab('#ambitionAdderOverlay').addEventListener('click', (event) => {
            if(event.path[0] == document.querySelector('#ambitionAdderOverlay')) {
                that.l.trigger('toggleAddAmbitionOverlay');
            }
        })
        grab('#ambitionAdderOverlay button').addEventListener('click', that.l.trigger.bind(that, 'addAmbitionGUI'));
        grab('#ambitionAdderOverlay').style.display = 'none';
    }
    return {onStartup};
}
export default InterfaceLoad;