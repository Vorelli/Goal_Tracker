import Listener from "./Listener";
import { grab, grabAll } from "./grab";
import CenterElement from "./CenterElement";
import ViewGenerator from "./ViewGenerator";
import closeMenu from "./menuClose.png";
import openMenu from "./menuOpen.png";

let sidebarOff = false;
let defaultTopbarLeftMargin = 75;
let center = new CenterElement(["#content", "#taskAdderOverlay>div"]);
let viewGenerator = new ViewGenerator();

grab("#hamburgerIcon img").src = openMenu;
let content = grab("#content");
let toggleSidebarSettings = [
  {
    option: "#hamburgerIcon img",
    value: "src",
    offValue: closeMenu,
    onValue: openMenu
  },
  {
    option: "#sidebar",
    value: "width",
    offValue: 250 + "px",
    onValue: 60 + "px"
  },
  {
    option: "#ambitionTableIcon a",
    value: "textContent",
    offValue: "Ambitions",
    onValue: "A"
  },
  {
    option: "#habitTrackerIcon a",
    value: "textContent",
    offValue: "Habits",
    onValue: "H"
  },
  {
    option: "#dailyScheduleIcon a",
    value: "textContent",
    offValue: "Schedule",
    onValue: "S"
  },
  {
    option: "#topbar div",
    value: "marginLeft",
    offValue: defaultTopbarLeftMargin + 190 + "px",
    onValue: defaultTopbarLeftMargin + "px"
  }
];
//manages user input and then triggers outside events for the underlying logic
const GUIManager = (function() {
  function start() {
    addListeners();
  }

  function addListeners() {
    Listener.addListener(this, "clearContent", _clearContent);
    Listener.addListener(this, "toggleSidebar", _toggleSidebar);
    Listener.addListener(this, "loadAmbitionTable", _loadAmbitionTable);
    Listener.addListener(this, "center", center.center);
  }

  function _toggleSidebar() {
    /*if(sidebarOff=!sidebarOff){ //changed from a bunch of ternary statements for efficiency
            grabAll('#sidebar div').forEach(element => { element.style.width = '250px'; });
            toggleSidebarSettings.forEach(setting => { grab(setting.option)[setting.value]=setting.offValue })
        }else {
            toggleSidebarSettings.forEach(setting => { grab(setting.option)[setting.value]=setting.onValue })
            grabAll('#sidebar div').forEach(element => { element.style.width = '60px'; });
        }*/
    if ((sidebarOff = !sidebarOff)) {
      //changed from a bunch of ternary statements for efficiency
      grabAll("#sidebar div").forEach(element => {
        element.style.width = "250px";
      });
      toggleSidebarSettings.forEach(setting => {
        if (!grab(setting.option)[setting.value])
          grab(setting.option)["style"][setting.value] = setting.offValue;
        else grab(setting.option)[setting.value] = setting.offValue;
      });
    } else {
      toggleSidebarSettings.forEach(setting => {
        if (!grab(setting.option)[setting.value])
          grab(setting.option)["style"][setting.value] = setting.onValue;
        else grab(setting.option)[setting.value] = setting.onValue;
      });
      grabAll("#sidebar div").forEach(element => {
        element.style.width = "60px";
      });
    }
  }

  function _loadAmbitionTable() {
    _clearContent();
    viewGenerator.generateSimplifiedView(Listener.trigger("getTasks"));
    center.center();
  }

  function _clearContent() {
    content.innerHTML = "";
  }
  return { start };
})();

export default GUIManager;
