import { grab } from "./grab";
import GUIManager from "./GUIManager";
import Listener from "./Listener";

function InterfaceLoad(listener) {
  this.listener = listener;
  GUIManager.start();
}

InterfaceLoad.prototype.basicLoad = function basicLoad() {
  grab("#sidebar #hamburgerIcon").addEventListener(
    "click",
    Listener.trigger.bind(this, "toggleSidebar")
  );
  grab("#ambitionTableIcon").addEventListener("click", this.loadAmbitionTable);
  grab("#topbar div").style.marginLeft = "75px";
  grab("#sidebar #habitTrackerIcon").addEventListener(
    "click",
    Listener.trigger.bind(this, "test", "dafas")
  );
};

InterfaceLoad.prototype.loadAmbitionTable = function loadAmbitionTable() {
  Listener.trigger("loadAmbitionTable");
};

export default InterfaceLoad;
