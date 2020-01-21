import { grab, grabAll, grabFrom, grabAllFrom } from "./grab";
import {formatISO9075} from 'date-fns';
import Listener from './Listener';
import {generateDot, generateFilledDot} from './dots';
import createElement from "./createElement";
import TaskAdderOverlayManager from './TaskAdderOverlayManager';
import _toDate from './toDateString';

function ViewGenerator() {
    const simplifiedViewRowHTML = "<tr> <td class='name' valign='center'>Go Hard AFgsfadafasdfsadfsadf</td> <td class='dateStart'>10/20/2019</td> <td class='statusTD'> <div class='statusBar'></div> </td> <td class='dateComplete'></td> </tr>";
    const simplifiedViewTableHTML = "<div class='noDisplay'><button id='addAmbition'>+</button></div><div class='simplifiedView'> <table> <col width='125px'> <col width='125px'> <col width='125px'> <col width='125px'> <tr> <td colspan=\"4\" class='lineH40' id='tableTitle'>Ambitions</td> </tr> <tr class='headers'> <td class='lineH40'><div>Name</div></td> <td class='lineH40'>Date Started</td> <td class='statusTD lineH40'>Status</td> <td class='lineH40'>Date Completed</td> </tr> </table> </div> ";
    const blockViewHTML = "<div class='ambitionViewer'> <div id='leftHalf'> <button>Back</button> <h1 class='name'>Ambition Name</h1> <div></div> <h4 class='desc'>Ambition Discription/Notes Section</h4> </div> <div id='rightHalf'> <div id='ambitionButtons'> <div class='ambitionButtons completeButton'>U</div> <div class='ambitionButtons editButton'>E</div> <div class='ambitionButtons deleteButton'>D</div> </div> <div class='statusBar ambitionStatus'> </div> <div id='ambitionDates'> <div>Started:<br></div> <div class='ambitionStartDate ambitionDate'>09/25/2019</div> <div>Completed:<br></div> <div class='ambitionCompDate ambitionDate'>10/12/2019</div> </div> </div> </div>";    
    let tAOM = new TaskAdderOverlayManager();
    tAOM.overlay.addEventListener('click', (event) => { if(event.target == document.querySelector('div#taskAdderOverlay')) tAOM.toggleOverlay() })
    Listener.addListener(this, 'submitNewTask', submitNewTask);
    Listener.addListener(this, 'submitEdit', submitEdit);
    Listener.addListener(this, 'test', test);

    function test(args) {
        console.log(args);
    }

    function _getValuesFromOverlay() {
        let name = grab('#taskAdderOverlay #name input').value;
        let desc = grab('#taskAdderOverlay #desc input').value;
        let dateS = grab('#taskAdderOverlay #dateS input').value;
        let dateC = grab('#taskAdderOverlay #dateC input').value;
        let dateExpected = grab('#taskAdderOverlay #dateExpected input').value;
        let completionStatus = grab('#taskAdderOverlay #completionStatus input').checked;
        return {name, desc, dateS, dateC, dateExpected, completionStatus};
    }

    function submitNewTask() {
        let values = _getValuesFromOverlay();
        let newTask = Listener.trigger('addTask', values.name, values.desc, values.dateS, values.dateC, values.dateExpected, values.completionStatus);
        let newRow = _createRow(newTask);
        let docFrag = new DocumentFragment();// to have proper geometry and rendering,
        docFrag.appendChild(grab('tbody'));//   tbody must be transplanted into docFrag and row appended then put back.
        docFrag.querySelector('tbody').appendChild(newRow);
        grab('table').appendChild(docFrag.querySelector('tbody'));
    }

    function submitEdit(args) {
        let oldTask = args[0];
        let row = _findRow(oldTask);
        let values = _getValuesFromOverlay();
        Listener.trigger('editTask', oldTask, values.name, values.desc, values.dateS, values.dateC, values.dateExpected, values.completionStatus, oldTask.subTasks);
        //oldTask is now updated...so the view can be updated with oldTask's new values
        _refreshRow(row, oldTask);
    }

    function _refreshRow(row, task) {
        let process = undefined;
        if(row.querySelector('button') == null || row.querySelector('button') == undefined) {
            process = _returnToSimplified;
        }else {
            process = _createDetailedView;
        }
        process(task);
    }

    function _createBlockView(task) {
        let docFrag = new DocumentFragment();
        docFrag.appendChild(createElement('body')).insertAdjacentHTML('beforeend', blockViewHTML);
        let blockView = grabFrom(docFrag, 'body>div');
        _fillInView(blockView, task);
        grabFrom(blockView, 'button').addEventListener('click', _returnToSimplified.bind(this, task));
        grabFrom(blockView, '#rightHalf .statusBar').addEventListener('click', console.log.bind(this, 'create table view now'));
        grabFrom(blockView, '#ambitionButtons .editButton').addEventListener('click', tAOM.editTask.bind(tAOM, task));
        grabFrom(blockView, '#ambitionButtons .completeButton').addEventListener('click', console.log.bind(this, 'complete'));
        grabFrom(blockView, '#ambitionButtons .deleteButton').addEventListener('click', _deleteTask.bind(this, task));
        return blockView;
    }

    function _deleteTask(task) {
        //responsibilities of this function:
        //  1. Delete the task from the global task list
        Listener.trigger('deleteTask', task.name);
        //  2. Remove its view from the list (in whatever form it's in)
        _findRow(task).parentNode.removeChild(_findRow(task));
    }

    function _findRow(task) {
        for(let i = 0; i< grab('tbody').children.length; i++) {
            let childElement = grab('tbody').children.item(i);
            if(!!childElement.querySelector('.name') && childElement.querySelector('.name').textContent == task.name)
                return childElement;
        }
        return -1;
    }

    function _returnToSimplified(task) { _findRow(task).parentNode.replaceChild(_createRow(task), _findRow(task)); };
    function _resetRow(task) { let newRow = createElement('tr'); _findRow(task).parentNode.replaceChild(newRow, _findRow(task)); return newRow };
    function _editBlock(oldTask, newTask) { _findRow(oldTask).parentNode.replaceChild(_createBlockView(newTask), _findRow(oldTask)); }

    function _createDetailedView(task) {
        let newRow = _resetRow(task) // recreating the node allows for quick deletion of all event listeners and innerHTML
        let td = document.createElement('td');
        td.colSpan = 4;
        newRow.appendChild(td).appendChild(_createBlockView(task));
    }

    function _tryToSetTextContent(element, elementName, value) {
        try {
            grabFrom(element, elementName).textContent = value;
        } catch (error) {
            //console.log(error);
        }
    }

    function _createRow(task) {
        let tBody = new DocumentFragment().appendChild(createElement('body')).appendChild(createElement('table')).appendChild(createElement('tbody'));
        tBody.insertAdjacentHTML('beforeend', simplifiedViewRowHTML);
        let view = _fillInView(tBody.querySelector('tr'), task);
        view.addEventListener('click', _createDetailedView.bind(this, task));
        return view;
    }

    function _fillInView(view, task) {
        _tryToSetTextContent(view, '.name', !!task.name ? task.name : "Not Set");
        _tryToSetTextContent(view, '.desc', !!task.desc ? task.desc : "Not Set");
        _tryToSetTextContent(view, 'dateExpected', !isNaN(Date.parse(task.dateExpected)) ? _toDate(task.dateExpected) : "Not Set")
        _tryToSetTextContent(view, '.dateStart', !isNaN(Date.parse(task.dateS)) ? _toDate(task.dateS) : "Not Set");
        _tryToSetTextContent(view, '.dateComplete', !isNaN(Date.parse(task.dateC)) ? _toDate(task.dateC) : "Not Set");
        _tryToSetTextContent(view, '.completeButton', task.completionStatus ? '✓' : '✘')
        for(let j = 0; j < task.subTasks.length; j++)
            grabFrom(view, '.statusBar').appendChild(!!task.subTasks[j].completionStatus ? generateFilledDot() : generateDot());
        return view;
    }
    
    //Creates a 'simplified view' of all of your tasks.
    //tasks: array of Task's
    function generateSimplifiedView(tasks) {
        let docFrag = new DocumentFragment();
        docFrag.appendChild(document.createElement('body')).insertAdjacentHTML('afterbegin', simplifiedViewTableHTML);
        let tableBody = docFrag.querySelector('tbody');
        for(let i = 0; i < tasks.length; i++){
            let newRow = _createRow(tasks[i]);
            tableBody.appendChild(newRow);
        }
        let d = grabAllFrom(docFrag, 'body>div');
        for(let i = 0; i < d.length; i++){ grab('#content').appendChild(d[i]) };
        grab('#addAmbition').addEventListener('click', tAOM.addNewTaskOverlay.bind(tAOM))
    }

    return {generateSimplifiedView};
}
export default ViewGenerator;