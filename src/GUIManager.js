import Listener from './Listener';
import {grab, grabAll} from './grab';
import CenterElement from './CenterElement';
import { formatISO8601, isFuture } from 'date-fns';
import ViewGenerator from "./ViewGenerator";


//manages user input and then triggers outside events for the underlying logic
const GUIManager = function() {
    this.sidebarOff = false;
    this.defaultTopbarLeftMargin = 75;
    this.center = new CenterElement(['#content', '#taskAdderOverlay>div']);
    this.viewGenerator = new ViewGenerator();
    this.addListeners();
    this.content = grab('#content');
    this.toggleSidebarSettings = [
        {option: '#hamburgerIcon img', value:'src', offValue:'menuClose.png', onValue:'menuOpen.png'},
        {option: '#sidebar', value:'width', offValue:250+'px', onValue:60+'px'},
        {option: '#ambitionTableIcon a', value:'textContent', offValue: 'Ambitions', onValue: 'A'},
        {option: '#habitTrackerIcon a', value:'textContent', offValue: 'Habits', onValue: 'H'},
        {option: '#dailyScheduleIcon a', value:'textContent', offValue: 'Schedule', onValue: 'S'},
        {option: '#topbar div', value:'marginLeft', offValue: this.defaultTopbarLeftMargin+190+'px', onValue: this.defaultTopbarLeftMargin +'px'}
    ]
};

    GUIManager.prototype.addListeners = function addListeners() {
        Listener.addListener(this, 'clearContent', this._clearContent);
        Listener.addListener(this, 'toggleSidebar', this._toggleSidebar);
        Listener.addListener(this, 'loadAmbitionTable', this._loadAmbitionTable);
        Listener.addListener(this, 'center', this.center.center);
    }

    GUIManager.prototype._toggleSidebar = function _toggleSidebar() {
        /*if(this.sidebarOff=!this.sidebarOff){ //changed from a bunch of ternary statements for efficiency
            grabAll('#sidebar div').forEach(element => { element.style.width = '250px'; });
            this.toggleSidebarSettings.forEach(setting => { grab(setting.option)[setting.value]=setting.offValue })
        }else {
            this.toggleSidebarSettings.forEach(setting => { grab(setting.option)[setting.value]=setting.onValue })
            grabAll('#sidebar div').forEach(element => { element.style.width = '60px'; });
        }*/
        if(this.sidebarOff=!this.sidebarOff){ //changed from a bunch of ternary statements for efficiency
            grabAll('#sidebar div').forEach(element => { element.style.width = '250px'; });
            this.toggleSidebarSettings.forEach(setting => {
                if(!grab(setting.option)[setting.value])
                    grab(setting.option)['style'][setting.value] = setting.offValue;
                else
                    grab(setting.option)[setting.value]=setting.offValue
            })
        }else {
            this.toggleSidebarSettings.forEach(setting => { 
                if(!grab(setting.option)[setting.value])
                    grab(setting.option)['style'][setting.value] = setting.onValue;
                else
                    grab(setting.option)[setting.value]=setting.onValue;
            })
            grabAll('#sidebar div').forEach(element => { element.style.width = '60px'; });
        }
    }

    GUIManager.prototype._loadAmbitionTable = function _loadAmbitionTable(){
        this._clearContent();
        this.viewGenerator.generateSimplifiedView(Listener.trigger('getTasks'));
        this.center.center();
    }

    GUIManager.prototype._clearContent = function _clearContent() { this.content.innerHTML = ''; };

export default GUIManager;