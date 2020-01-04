import createElement from './CreateElement';

const TableViewGenerator = function() {
    const that = this;
    that.tableRow = new DocumentFragment();
    that.detailedViewText = "<div class='detailedView'><table><col width='80px'><col width='80px'><col width='100px'><col width='80px'><col width='80px'><col width='80px'><tr><td colspan=\"6\" class='lineH40' id='tableTitle'>Ambition Name</td></tr><tr class='headers'><td><div>Goals</div></td><td><div>Date Started</div></td><td class='statusTD'><div>Task Status</div></td><td><div>Expected Completion</div></td><td><div>Date Completed</div></td><td><div></div></td></tr></table></div"
    that.tableRowText = "<tr><td class='lineH40'>Goal Mother Boyyo Name</td class='lineH40'><td class='lineH40'>10/30/2019</td class='lineH40'><td class='statusTD'><div class='statusBar'></div></td><td class='lineH40'>11/01/2019</td class='lineH40'><td class='lineH40'>10/30/2019</td class='lineH40'><td class='lineH40 goalButtons'><div class='goalButton'>U</div><div class='goalButton'>E</div><div class='goalButton'>X</div></td></tr>";

    function generateAmbitionSimplified(ambitions) {

    }

    function generateTable(numRows) {
        let a = new DocumentFragment()
        a.appendChild(createElement('body')).insertAdjacentHTML('beforeend',that.detailedViewText);
        let newNode = a.querySelector('div');
        console.log(newNode);
        for(let i = 0; i < numRows; i++) {
            let a = Math.floor((Math.random()*20)+1);
            newNode.querySelector('table').insertAdjacentHTML('beforeend',that.tableRowText);
            let temp = newNode.querySelectorAll('table tr')[newNode.querySelectorAll('table tr').length-1];
            for(let j = 0; j < a; j++) {
                let span = document.createElement('span');
                span.classList.add('dot');
                temp.querySelector('.statusBar').appendChild(span.cloneNode(true))
            }
            newNode.querySelector('tbody').appendChild(temp);
        }
        return newNode;
    }

    return {generateTable}
}

export default TableViewGenerator;