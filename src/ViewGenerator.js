import { grab, grabAll, grabFrom, grabAllFrom } from "./grab";
import Listener from "./Listener";
import { generateDot, generateFilledDot } from "./dots";
import createElement from "./createElement";
import TaskAdderOverlayManager from "./TaskAdderOverlayManager";
import _toDate from "./toDateString";

function ViewGenerator() {
  const simplifiedViewRowHTML =
    "<tr> <td class='name' valign='center'>Go Hard AFgsfadafasdfsadfsadf</td> <td class='dateStart'>10/20/2019</td> <td class='statusTD'> <div class='statusBar'></div> <div class='statusBarLine'></div> </td> <td class='dateComplete'></td> </tr>";
  const simplifiedViewTableHTML =
    "<div class='noDisplay'><button id='addAmbition'>+</button></div><div class='simplifiedView'> <table> <col width='125px'> <col width='125px'> <col width='125px'> <col width='125px'> <tr> <td colspan=\"4\" class='lineH40' id='tableTitle'>Goals</td> </tr> <tr class='headers'> <td class='lineH40'><div>Name</div></td> <td class='lineH40'>Date Started</td> <td class='statusTD lineH40'>Status</td> <td class='lineH40'>Date Completed</td> </tr> </table> </div> ";
  const blockViewHTML =
    "<div class='ambitionViewer'> <div id='leftHalf'> <button>Back</button> <h1 class='name'>Ambition Name</h1> <div></div> <h4 class='desc'>Ambition Discription/Notes Section</h4> </div> <div id='rightHalf'> <div id='ambitionButtons'> <div class='ambitionButtons completeButton'>U</div> <div class='ambitionButtons editButton'>E</div> <div class='ambitionButtons deleteButton'>D</div> </div> <div class='statusBar ambitionStatus'> </div><div class='statusBarLine'></div> <div id='ambitionDates'> <div>Started:<br></div> <div class='dateStart ambitionDate'>09/25/2019</div> <div>Completed:<br></div> <div class='dateComplete ambitionDate'>10/12/2019</div><div style='font-size:8pt;'>Expected Completion:</div><div class='ambitionDate dateExpected'>10/20/2019</div> </div> </div> </div>";
  const tableViewHTML =
    "<div class='noDisplay'><button id='addAmbition'>+</button><button id='goBack'>←</div><div class='detailedView'><table><col width='80px'><col width='80px'><col width='100px'><col width='80px'><col width='80px'><col width='80px'><tr><td colspan=\"6\" class='lineH40' id='tableTitle'>Ambition Name</td></tr><tr class='headers'><td><div>Goals</div></td><td><div>Date Started</div></td><td class='statusTD'><div>Task Status</div></td><td><div>Expected Completion</div></td><td><div>Date Completed</div></td><td><div>Actions</div></td></tr></table></div";
  const tableViewRowHTML =
    "<tr><td class='lineH40 name'>Goal Mother Boyyo Name</td><td class='lineH40 dateStart'>10/30/2019</td><td class='statusTD'><div class='statusBar'></div><div class='statusBarLine'></div></td><td class='lineH40 dateExpected'>11/01/2019</td><td class='lineH40 dateComplete'>10/30/2019</td><td class='lineH40 goalButtons'><div class='goalButton completeButton'>U</div><div class='goalButton editButton'>E</div><div class='goalButton deleteButton'>X</div></td></tr>";
  let tAOM = new TaskAdderOverlayManager();
  let path;
  //item: {function: func, }
  const commonEvents = [
    {
      view: undefined,
      selector: "button",
      listener: _returnToSimplified,
      thisVar: undefined
    },
    {
      view: undefined,
      selector: ".statusBar",
      listener: tableViewButton,
      thisVar: undefined
    },
    {
      view: undefined,
      selector: ".statusBarLine",
      listener: tableViewButton,
      thisVar: undefined
    },
    {
      view: undefined,
      selector: ".editButton",
      listener: tAOM.editTask,
      thisVar: tAOM
    },
    {
      view: undefined,
      selector: ".completeButton",
      listener: console.log,
      thisVar: undefined
    },
    {
      view: undefined,
      selector: ".deleteButton",
      listener: _deleteTask,
      thisVar: undefined
    }
  ];
  Listener.addListener(this, "submitNewTask", submitNewTask);
  Listener.addListener(this, "submitEdit", submitEdit);

  function _returnToSimplified(task) {
    let row = _findRow(task);
    row.parentNode.replaceChild(_createSimplifiedRow(task), row);
  }

  //Creates a 'simplified view' of all of your tasks.
  //tasks: array of Task's  (generally obtained from taskStorage)
  function generateSimplifiedView(tasks) {
    path = [];
    let docFrag = new DocumentFragment();
    docFrag
      .appendChild(document.createElement("body"))
      .insertAdjacentHTML("afterbegin", simplifiedViewTableHTML);
    let tableBody = docFrag.querySelector("tbody");
    for (let i = 0; i < tasks.length; i++) {
      let newRow = _createSimplifiedRow(tasks[i]);
      tableBody.appendChild(newRow);
    }
    let d = grabAllFrom(docFrag, "body>div");
    for (let i = 0; i < d.length; i++) {
      grab("#content").appendChild(d[i]);
    }
    grab("#addAmbition").addEventListener(
      "click",
      tAOM.addNewTaskOverlay.bind(tAOM)
    );
  }

  //Creates and generates information for new simplified view row.
  function _createSimplifiedRow(task) {
    let tBody = new DocumentFragment()
      .appendChild(createElement("body"))
      .appendChild(createElement("table"))
      .appendChild(createElement("tbody"));
    tBody.insertAdjacentHTML("beforeend", simplifiedViewRowHTML);
    let view = _fillInView(tBody.querySelector("tr"), task);
    view.addEventListener("click", _createDetailedView.bind(this, task, 4));
    return view;
  }

  //creates a block view which can be used however one wants
  function _createBlockView(task, colSpan) {
    let docFrag = new DocumentFragment();
    docFrag
      .appendChild(createElement("body"))
      .insertAdjacentHTML("beforeend", blockViewHTML);
    let blockView = grabFrom(docFrag, "body>div");
    _fillInView(blockView, task, colSpan);

    return blockView;
  }

  //high level creates the detailed view which is
  //input directly into the document after creation
  //replaces existing table row
  function _createDetailedView(task, colSpan = 4) {
    let newRow = _resetRow(task); // recreating the node allows for quick deletion of all event listeners and innerHTML
    let td = document.createElement("td");
    td.colSpan = colSpan;
    newRow.appendChild(td).appendChild(_createBlockView(task, colSpan));
  }

  function tableViewButton(task) {
    path.push(_getViewData(grab("#content")));
    createTableView(task);
  }

  //creates a view for all of the subtasks for the task
  //this is where new subtasks can be added to the task
  function createTableView(task) {
    let a = new DocumentFragment()
      .appendChild(createElement("body"))
      .appendChild(createElement("div"));
    a.insertAdjacentHTML("beforeend", tableViewHTML);
    let view = a.querySelector("div.detailedView");
    view.querySelector("#tableTitle").textContent = task.name;
    for (let i = 0; i < task.subTasks.length; i++) {
      view
        .querySelector("tbody")
        .appendChild(_createTableRow(task.subTasks[i]));
    }
    Listener.trigger("clearContent");
    grabFrom(a, "#addAmbition").addEventListener(
      "click",
      tAOM.addNewTaskOverlay.bind(tAOM)
    );
    grabFrom(a, "#goBack").addEventListener("click", _back.bind(this));
    grabAllFrom(a, "body>div>*").forEach(element => {
      grab("#content").appendChild(element);
    });
  }

  function _createTableRow(task) {
    let docFrag = new DocumentFragment();
    docFrag
      .appendChild(createElement("div"))
      .appendChild(createElement("table"))
      .appendChild(createElement("tbody"))
      .insertAdjacentHTML("beforeEnd", tableViewRowHTML);
    let row = docFrag.querySelector("tr:last-child");
    _fillInView(row, task);
    row.addEventListener("click", function() {
      let clickedStatusBar = false;
      event.path.forEach(element => {
        if (element.classList && element.classList.contains("statusTD"))
          clickedStatusBar = true;
      });
      if (!event.target.classList.contains("goalButton") && !clickedStatusBar)
        _createDetailedView(task, 6);
    });
    return row;
  }

  function _returnToTableRow(task) {
    let row = _resetRow(task);
    row.parentNode.replaceChild(_createTableRow(task), row);
  }

  //Replaces a row in the document with a newly created
  //table row which then has no event listeners.
  function _resetRow(task) {
    let newRow = createElement("tr");
    let row = _findRow(task);
    row.parentNode.replaceChild(newRow, row);
    return newRow;
  }
  //takes any 'view' such as simplified, block or table
  //and looks for common names to be filled in. (If variable is not set,
  //will be set as 'Not Set' in the view)
  function _fillInView(view, task, colSpan) {
    _tryToSetTextContent(view, ".name", task.name ? task.name : "Not Set");
    _tryToSetTextContent(view, ".desc", task.desc ? task.desc : "Not Set");
    _tryToSetTextContent(
      view,
      ".dateExpected",
      !isNaN(Date.parse(task.dateExpected))
        ? _toDate(task.dateExpected)
        : "Not Set"
    );
    _tryToSetTextContent(
      view,
      ".dateStart",
      !isNaN(Date.parse(task.dateS)) ? _toDate(task.dateS) : "Not Set"
    );
    _tryToSetTextContent(
      view,
      ".dateComplete",
      !isNaN(Date.parse(task.dateC)) ? _toDate(task.dateC) : "Not Set"
    );
    _tryToSetTextContent(
      view,
      ".completeButton",
      task.completionStatus ? "✓" : "✘"
    );
    _tryToSetTextContent(
      view,
      ".statusBarLine",
      task.progress() * 100 + "px",
      "style.width"
    );
    _tryToSetTextContent(
      view,
      ".statusBarLine",
      task.onTrack() ? "#474747" : "red",
      "style.backgroundColor"
    );
    for (let j = 0; j < task.subTasks.length; j++)
      grabFrom(view, ".statusBar").appendChild(
        task.subTasks[j].completionStatus ? generateFilledDot() : generateDot()
      );
    commonEvents.forEach(event => {
      let shouldFill = Boolean(
        event.selector == ".statusBar" && view.querySelector(".dateExpected")
      );
      let shouldFill2 = Boolean(
        event.selector == ".statusBarLine" &&
          view.querySelector(".dateExpected")
      );
      if (event.selector == "button" && colSpan == 6)
        grabFrom(view, event.selector).addEventListener(
          "click",
          _returnToTableRow.bind(this, task)
        );
      else if (
        view.querySelector(event.selector) &&
        (shouldFill ||
          shouldFill2 ||
          (event.selector != ".statusBarLine" &&
            event.selector != ".statusBar"))
      )
        grabFrom(view, event.selector).addEventListener(
          "click",
          event.listener.bind(event.thisVar ? event.thisVar : this, task)
        );
    });
    return view;
  }

  //attempts to set text content of an element, fearing it could throw an error
  function _tryToSetTextContent(
    element,
    elementName,
    value,
    whatToSet = "textContent"
  ) {
    try {
      if (whatToSet.indexOf("style.") != -1)
        grabFrom(element, elementName)["style"][
          whatToSet.substring(6, whatToSet.length)
        ] = value;
      else grabFrom(element, elementName)[whatToSet] = value;
    } catch (error) {
      //console.log(error);
    }
  }

  //looks for row in the document matching the task
  function _findRow(task) {
    for (let i = 0; i < grab("tbody").children.length; i++) {
      let childElement = grab("tbody").children.item(i);
      if (
        !!childElement.querySelector(".name") &&
        childElement.querySelector(".name").textContent == task.name
      )
        return childElement;
    }
    return -1;
  }

  function _getTaskByRow(row) {
    let taskName = grabFrom(row, ".name").textContent;
    return _getTaskByName(taskName);
  }

  function _getTaskByName(name) {
    let parent;
    if (path.length > 0) parent = path[path.length - 1];
    return _getTaskUnderParentByName(parent, name);
  }

  function _getTaskUnderParentByName(parentNode, name) {
    let returningTask;
    let listOfTasks = [];
    if (parentNode) {
      switch (parentNode.type) {
        case "simplified":
          parentNode.rows.forEach(row => {
            listOfTasks.push(row.task);
          });
          break;
        case "table":
          listOfTasks.push(...parentNode.task.subTasks);
          break;
      }
    } else {
      listOfTasks = Listener.trigger("getTasks");
    }
    listOfTasks.forEach(task => {
      if (task.name == name) returningTask = task;
    });
    return returningTask;
  }

  function _getValuesFromOverlay() {
    let name = grab("#taskAdderOverlay #name input").value;
    let desc = grab("#taskAdderOverlay #desc input").value;
    let dateS = grab("#taskAdderOverlay #dateS input").value;
    let dateC = grab("#taskAdderOverlay #dateC input").value;
    let dateExpected = grab("#taskAdderOverlay #dateExpected input").value;
    let completionStatus = grab("#taskAdderOverlay #completionStatus input")
      .checked;
    return { name, desc, dateS, dateC, dateExpected, completionStatus };
  }

  function _resurfaceView(newRow) {
    let docFrag = new DocumentFragment(); // to have proper geometry and rendering,
    docFrag.appendChild(grab("tbody")); //   tbody must be transplanted into docFrag and row appended then put back.
    docFrag.querySelector("tbody").appendChild(newRow);
    grab("table").appendChild(docFrag.querySelector("tbody"));
  }

  function submitNewTask() {
    let values = _getValuesFromOverlay();
    let taskByTitle =
      grab("#content #tableTitle").colSpan == 6
        ? _getTaskByName(grab("#content #tableTitle").textContent)
        : null;
    if (taskByTitle) {
      let newTask = Listener.trigger(
        "addSubtask",
        taskByTitle,
        values.name,
        values.desc,
        values.dateS,
        values.dateC,
        values.dateExpected,
        values.completionStatus
      );
      let newRow = _createTableRow(newTask);
      _resurfaceView(newRow);
    } else {
      let newTask = Listener.trigger(
        "addTask",
        values.name,
        values.desc,
        values.dateS,
        values.dateC,
        values.dateExpected,
        values.completionStatus
      );
      let newRow = _createSimplifiedRow(newTask);
      _resurfaceView(newRow);
    }
  }

  function submitEdit(args) {
    let oldTask = args[0];
    let row = _findRow(oldTask);
    let values = _getValuesFromOverlay();
    Listener.trigger(
      "editTask",
      oldTask,
      values.name,
      values.desc,
      values.dateS,
      values.dateC,
      values.dateExpected,
      values.completionStatus,
      oldTask.subTasks
    );
    //oldTask is now updated...so the view can be updated with oldTask's new values
    _refreshRow(row, oldTask);
  }

  function _refreshRow(row, task) {
    let process = undefined;
    if (
      row.querySelector("button") == null ||
      row.querySelector("button") == undefined
    )
      process = _returnToSimplified;
    if (row.parentNode.children[0].cells[0].colSpan == 6)
      process = _createTableRow;
    else process = _createDetailedView;
    process(task);
  }

  //deletes task on the doc and in taskStorage
  function _deleteTask(task) {
    //responsibilities of this function:
    //  1. Delete the task from the global task list
    Listener.trigger("deleteTask", task.name);
    //  2. Remove its view from the list (in whatever form it's in)
    let row = _findRow(task);
    row.parentNode.removeChild(row);
  }

  function _getViewData(view) {
    let tbody = view.querySelector("tbody");
    let tableTitle = tbody.querySelector("#tableTitle").textContent;
    let colspan = tbody.querySelector("#tableTitle").colSpan;
    let viewData = { type: "" };
    if (colspan == 4) {
      //then it's simplified view
      viewData.type = "simplified";
      viewData.rows = [];
      let tableRows = grabAllFrom(tbody, "tr");
      for (let i = 2; i < tableRows.length; i++) {
        if (!grabFrom(tableRows[i], ".dateExpected"))
          viewData.rows.push({
            task: _getTaskByRow(tableRows[i]),
            type: "simplified"
          });
        else
          viewData.rows.push({
            task: _getTaskByRow(tableRows[i]),
            type: "block"
          });
      }
      return viewData;
    } else if (colspan == 6) {
      viewData.type = "table";
      viewData.task = _getTaskByName(tableTitle);
      return viewData;
    }
  }

  function _back() {
    let viewData = path.splice(path.length - 1, 1)[0];
    let rows = grabAll("#content tbody tr");
    switch (viewData.type) {
      case "simplified":
        Listener.trigger("clearContent");
        generateSimplifiedView(Listener.trigger("getTasks"));
        for (let i = 2; i < rows.length; i++) {
          let row = viewData.rows[i - 2];
          if (row.type == "block") _createDetailedView(row.task);
        }
        break;
      case "table":
        createTableView(viewData.task);
        break;
    }
  }

  return { generateSimplifiedView };
}
export default ViewGenerator;
