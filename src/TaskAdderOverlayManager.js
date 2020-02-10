import { grabFrom } from "./grab";
import Listener from "./Listener";
import Task from "./Task";
import _toDate from "./toDateString";

function TaskAdderOverlayManager() {
  this.overlay = document.querySelector("body>#taskAdderOverlay");
  this.overlay.addEventListener("click", event => {
    if (event.target == this.overlay) {
      this.toggleOverlay();
    }
  });
}

TaskAdderOverlayManager.prototype.setValues = function setValues(
  name,
  desc,
  dateS,
  dateExpected,
  dateC,
  completionStatus
) {
  let newButton = document.createElement("button");
  this.overlay
    .querySelector("button")
    .parentNode.replaceChild(newButton, this.overlay.querySelector("button"));

  if (!name) {
    name = new Task("", "", "", "", "", false);
  }
  if (!!name.name || name.name == "") {
    //if name is actually a task
    desc = name.desc;
    dateS = !isNaN(Date.parse(name.dateS)) ? _toDate(name.dateS) : "Not Set";
    dateExpected = !isNaN(Date.parse(name.dateExpected))
      ? _toDate(name.dateExpected)
      : "Not Set";
    dateC = !isNaN(Date.parse(name.dateC)) ? _toDate(name.dateC) : "Not Set";
    completionStatus = name.completionStatus;
    name = name.name;
  } else {
    dateS = !isNaN(Date.parse(dateS)) ? _toDate(dateS) : "Not Set";
    dateExpected = !isNaN(Date.parse(dateExpected))
      ? _toDate(dateExpected)
      : "Not Set";
    dateC = !isNaN(Date.parse(dateC)) ? _toDate(dateC) : "Not Set";
  }
  grabFrom(this.overlay, "#name input").value = name;
  grabFrom(this.overlay, "#desc input").value = desc;
  grabFrom(this.overlay, "#dateS input").value = dateS;
  grabFrom(this.overlay, "#dateC input").value = dateC;
  grabFrom(this.overlay, "#dateExpected input").value = dateExpected;
  grabFrom(this.overlay, "#completionStatus input").checked = completionStatus;
};

TaskAdderOverlayManager.prototype.toggleOverlay = function toggleOverlay(
  value = this.overlay.style.display
) {
  this.overlay.style.display = value == "block" ? "none" : "block";
  Listener.trigger("center");
};

TaskAdderOverlayManager.prototype.editButtonText = function editButtonText(
  newValue
) {
  this.overlay.querySelector("button").textContent = newValue;
};

TaskAdderOverlayManager.prototype.editTask = function editTask(task) {
  this.setValues(task);
  this.editButtonText("Edit");
  this.toggleOverlay();
  this.overlay.querySelector("button").addEventListener(
    "click",
    function(task) {
      this.toggleOverlay();
      Listener.trigger("submitEdit", task);
    }.bind(this, task)
  );
};

TaskAdderOverlayManager.prototype.addNewTaskOverlay = function addNewTaskOverlay() {
  this.setValues();
  this.editButtonText("Add");
  this.toggleOverlay();
  this.overlay.querySelector("button").addEventListener(
    "click",
    function() {
      this.toggleOverlay();
      Listener.trigger("submitNewTask");
    }.bind(this)
  );
};

export default TaskAdderOverlayManager;
