import { grab, grabAll, grabFrom, grabAllFrom } from "./grab";
import {formatISO9075} from 'date-fns';
import BlockViewGenerator from './BlockViewGenerator';
import {generateDot, generateFilledDot} from './dots';

const SimplifiedViewGenerator = function(globalListenerObject) {
    const that = this;
    that.l = globalListenerObject;
    const dataRow = "<tr> <td class='name' valign='center'>Go Hard AFgsfadafasdfsadfsadf</td> <td class='dateStart'>10/20/2019</td> <td class='statusTD'> <div class='statusBar'></div> </td> <td class='dateComplete'></td> </tr>";
    const table = "<div class='noDisplay'><button id='addAmbition'>+</button></div><div class='simplifiedView'> <table> <col width='125px'> <col width='125px'> <col width='125px'> <col width='125px'> <tr> <td colspan=\"4\" class='lineH40' id='tableTitle'>Ambitions</td> </tr> <tr class='headers'> <td class='lineH40'><div>Name</div></td> <td class='lineH40'>Date Started</td> <td class='statusTD lineH40'>Status</td> <td class='lineH40'>Date Completed</td> </tr> </table> </div> ";

    function _generateDetailedView(event) {
        let row = null
        for (let i = 0; i < event.path.length && row==null; i++) {
            if(!!event.path[i].ambition)
                row = event.path[i];
        }
        row.removeEventListener('click', _generateDetailedView);
        row.innerHTML = '';
        let td = document.createElement('td');
        td.colSpan = 4;
        row.appendChild(td).appendChild(that.l.trigger('generateBlockView', row.ambition));
        td.parentNode.ambition = td.firstChild.ambition;
        that.l.addListener('returnToSimplified', _replaceRowWithNewView);
    }

    function _replaceRowWithNewView([event]) {
        let row;
        for(let i = 0; i < event.path.length; i++) {
            if(event.path[i].localName == 'tr')
                row = event.path[i];
        }
        let ambition = row.querySelector('div.ambitionViewer').ambition;
        row.parentNode.replaceChild(_generateRow(_createRowFromHTML(dataRow), ambition), row)
        row.addEventListener('click', _generateDetailedView);
    }

    function _createRowFromHTML(html) {
        let tBody = document.createElement('body').appendChild(document.createElement('table')).appendChild(document.createElement('tbody'));
        tBody.insertAdjacentHTML('beforeend', html);
        return tBody.querySelector('tr');
    }

    function _generateSimplifiedViewRow(element, ambition) {
        console.log(element, ambition);
        grabFrom(element, 'tbody').insertAdjacentHTML('beforeend', dataRow);
        let row = (grabFrom(element, '.simplifiedView tr:last-child'));
        _generateRow(row, ambition);
    }

    function _generateRow(row, ambition) {
        grabFrom(row, '.name').textContent = ambition.name;
        grabFrom(row, '.dateStart').textContent = formatISO9075(ambition.dateS, {representation: 'date'});
        grabFrom(row, '.dateComplete').textContent = formatISO9075(ambition.dateC, {representation: 'date'});
        for(let j = 0; j < ambition.goals.length; j++)
            grabFrom(row, '.statusBar').appendChild(ambition.goals[j].completionStatus ? generateFilledDot() : generateDot());
        row.ambition = ambition;
        row.addEventListener('click', _generateDetailedView);
        return row;
    }
    
    function generateSimplifiedView(ambitions) {
        let docFrag = new DocumentFragment();
        docFrag.appendChild(document.createElement('body')).insertAdjacentHTML('afterbegin',table);
        const a = ambitions.getData().ambitions;
        for(let i = 0; i < a.length; i++){
            _generateSimplifiedViewRow(docFrag, a[i]);
        }
        let d = grabAllFrom(docFrag, 'body>div');
        for(let i = 0; i < d.length; i++){ grab('#content').appendChild(d[i]) };
    }

    return {generateSimplifiedView};
}


export default SimplifiedViewGenerator;