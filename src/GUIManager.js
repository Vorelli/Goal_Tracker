import Listener from './Listener';
import {grab, grabAll} from './grab';
import CenterElement from './CenterElement';
import { formatISO8601, isFuture } from 'date-fns';
import ViewGenerator from "./ViewGenerator";
import BlockViewGenerator from "./BlockViewGenerator";
import TableViewGenerator from "./TableViewGenerator";


//manages user input and then triggers outside events for the underlying logic
const GUIManager = function() {
    let sidebarOff = true;
    const defaultTopbarLeftMargin = 75;
    let center = new CenterElement(['#content', '#taskAdderOverlay>div']);
    let simpViewGen = new ViewGenerator();
    let blockViewGen = new BlockViewGenerator(Listener);
    addListeners()

    function addListeners() {
        Listener.addListener(undefined, 'clearContent', _clearContent);
        Listener.addListener(undefined, 'toggleSidebar', _toggleSidebar);
        Listener.addListener(undefined, 'loadAmbitionTable', _loadAmbitionTable);
        Listener.addListener(undefined, 'addAmbitionGUI', _addAmbition)
        Listener.addListener(undefined, 'center', center.center);
        Listener.addListener(undefined, 'generateSimplifiedView', _generateSimplifiedView);
        Listener.addListener(undefined, 'generateBlockView', _generateBlockView);
        Listener.addListener(undefined, 'generateTableView', _generateTableView);
    }

    function _toggleSidebar() {
        grab('#hamburgerIcon img').src = sidebarOff ? 'menuClose.png' : 'menuOpen.png';
        grab('#sidebar').style.width = sidebarOff ? 250+'px' : 60+'px'
        grab('#ambitionTableIcon a').textContent = sidebarOff ? "Ambitions" : "A";
        grab('#habitTrackerIcon a').textContent = sidebarOff ? "Habits" : "H";
        grab('#dailyScheduleIcon a').textContent = sidebarOff ? "Schedule" : "S";
        grabAll('#sidebar div').forEach(element => { element.style.width = sidebarOff ? '250px' : '60px' })
        grab('#topbar div').style.marginLeft = sidebarOff ? defaultTopbarLeftMargin+190+'px' : defaultTopbarLeftMargin +'px';
        sidebarOff = !sidebarOff;
    }

    function _loadAmbitionTable(){
        _clearContent();
        let tasks = Listener.trigger('getTasks');
        simpViewGen.generateSimplifiedView(tasks);
        Listener.trigger('center');
    }

    function _clearContent() { grab('#content').innerHTML = ''; };

    function _generateBlockView(ambition) {
        console.log(ambition);
    }

    function _generateTableView(ambition) {
        console.log(ambition);
    }

    function _generateSimplifiedView(ambition) {
        console.log(ambition);
    }

    function _addAmbition() {
        let ambition = document.querySelector('#ambitionAdderOverlay').ambition;
        let editingBlockView = document.querySelector('#ambitionAdderOverlay').editingBlockView;
        _toggleAddAmbitionOverlay();

        let name = grab('#ambitionAdderOverlay #name input').value;
        let desc = grab('#ambitionAdderOverlay #desc input').value;
        let dateS = new Date(grab('#ambitionAdderOverlay #dateS input').value);
        let dateC = new Date(grab('#ambitionAdderOverlay #dateC input').value);
        let completionStatus = grab('#ambitionAdderOverlay #completionStatus input').checked;

        if(!!ambition) {
            ambition = Listener.trigger('editAmbition', ambition, name, desc, dateS, dateC, completionStatus, ambition.goals)
            editingBlockView.innerHTML = '';
            editingBlockView.appendChild(Listener.trigger('generateBlockView', ambition))
        }
        else
            Listener.trigger('addAmbition', name, desc, dateS, dateC, completionStatus)
    }    

    function _toggleAddAmbitionOverlay(args) {
        let ambition = !!args ? args[0]: undefined;
        let isEditing = ambition && ambition.path && ambition.path[0].textContent == 'E';
        let isAmbition = ambition && !!ambition.name && !!ambition.desc;
        if(!isAmbition && ambition && ambition.path && ambition.path[0].ambition) {
            grab('#ambitionAdderOverlay').editingBlockView = isEditing ? ambition.path[0].parentNode.parentNode.parentNode.parentNode : undefined;
            ambition = ambition.path[0].ambition;
            isAmbition = true;
        }

        grab('#ambitionAdderOverlay button').textContent = isEditing ? "Edit" : "Add";

        grab('#ambitionAdderOverlay').ambition = isAmbition ? ambition : undefined;
        let goingToBeVisible = grab('#ambitionAdderOverlay').style.display=='none';
            if(goingToBeVisible) {
            grab('#ambitionAdderOverlay #name input').value = isAmbition ? ambition.name : '';
            grab('#ambitionAdderOverlay #desc input').value = isAmbition ? ambition.desc : '';
            grab('#ambitionAdderOverlay #dateS input').value = isAmbition ? ambition.dateS.toISOString().substr(0,10) : '';
            grab('#ambitionAdderOverlay #dateC input').value = isAmbition ? ambition.dateC.toISOString().substr(0,10) : '';
            grab('#ambitionAdderOverlay #completionStatus input').checked = isAmbition ? ambition.completionStatus : false;
        }

        grab('#ambitionAdderOverlay').style.display = goingToBeVisible ? 'block' : 'none';
        Listener.trigger('center');
    }
}()
export default GUIManager;