import { grab, grabAll, grabFrom, grabAllFrom } from "./grab";
import {formatISO9075} from 'date-fns'

const SimplifiedViewGenerator = function() {
    const that = this;
    const dataRow = "<tr> <td class='name' valign='center'>Go Hard AFgsfadafasdfsadfsadf</td> <td class='dateStart'>10/20/2019</td> <td class='statusTD'> <div class='statusBar'></div> </td> <td class='dateComplete'></td> </tr>";
    const table = "<div class='noDisplay'><button id='addAmbition'>+</button></div><div class='simplifiedView'> <table> <col width='125px'> <col width='125px'> <col width='125px'> <col width='125px'> <tr> <td colspan=\"4\" class='lineH40' id='tableTitle'>Ambitions</td> </tr> <tr class='headers'> <td class='lineH40'><div>Name</div></td> <td class='lineH40'>Date Started</td> <td class='statusTD lineH40'>Status</td> <td class='lineH40'>Date Completed</td> </tr> </table> </div> ";

    function _generateDot() {
        let a = document.createElement('span');
        a.classList.add('dot');
        return a;
    }

    function _generateFilledDot() {
        let a = _generateDot();
        a.classList.add('filledDot');
        return a;
    }
    
    function generateSimplifiedView(ambitions) {
        let docFrag = new DocumentFragment();
        docFrag.appendChild(document.createElement('body'));
        grabFrom(docFrag, 'body').insertAdjacentHTML('afterbegin',table);
        const a = ambitions.getData().ambitions;
        for(let i = 0; i < a.length; i++){
            grabFrom(docFrag, 'tbody').insertAdjacentHTML('beforeend', dataRow);
            let row = (grabFrom(docFrag, '.simplifiedView tr:last-child'));
            grabFrom(row, '.name').textContent = a[i].name;
            grabFrom(row, '.dateStart').textContent = formatISO9075(a[i].dateA, {representation: 'date'});
            grabFrom(row, '.dateComplete').textContent = formatISO9075(a[i].dateC, {representation: 'date'});
            for(let j = 0; j < a[i].goals.length; j++)
                grabFrom(row, '.statusBar').appendChild(a[i].goals[j].completionStatus ? _generateFilledDot() : _generateDot());
            row.ambition = a[i];
        }
        let d = grabAllFrom(docFrag, 'body>div');
        for(let i = 0; i < d.length; i++){ grab('#content').appendChild(d[i]) };
    }

    return {generateSimplifiedView};
}


export default SimplifiedViewGenerator;