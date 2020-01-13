import createElement from './CreateElement';

const TableViewGenerator = function() {
    const buttonText = "<div class='noDisplay'><button id='addAmbition'>+</button></div>";
    const detailedViewText = "<div class='detailedView'><table><col width='80px'><col width='80px'><col width='100px'><col width='80px'><col width='80px'><col width='80px'><tr><td colspan=\"6\" class='lineH40' id='tableTitle'>Ambition Name</td></tr><tr class='headers'><td><div>Goals</div></td><td><div>Date Started</div></td><td class='statusTD'><div>Task Status</div></td><td><div>Expected Completion</div></td><td><div>Date Completed</div></td><td><div></div></td></tr></table></div"
    const tableRowText = "<tr><td class='lineH40'>Goal Mother Boyyo Name</td class='lineH40'><td class='lineH40'>10/30/2019</td class='lineH40'><td class='statusTD'><div class='statusBar'></div></td><td class='lineH40'>11/01/2019</td class='lineH40'><td class='lineH40'>10/30/2019</td class='lineH40'><td class='lineH40 goalButtons'><div class='goalButton'>U</div><div class='goalButton'>E</div><div class='goalButton'>X</div></td></tr>";

    function generateTable(tableTitle, lastView, dataObject) {
        //dataObject is either an ambition, goal or task(/subtask)
        let numRows = -1;
        if(!!dataObject.getData().goals)      // => Ambition
            numRows = dataObject.getData().goals.length;
        if(!!dataObject.getData().tasks)      // => Goal
            numRows = dataObject.getData().tasks.length;
        if(!!dataObject.getData().subTasks)   // => Task (or subTask)
            numRows = dataObject.getData().subTasks.length;
        let table = _generateTable(numRows);
        

    }

    function _generateTable(numRows) {


        let a = new DocumentFragment().appendChild(createElement('div'));
        a.insertAdjacentHTML('afterBegin', buttonText);
        a.insertAdjacentHTML('beforeend',detailedViewText);
        let newNode = a.querySelector('div.detailedView');
        
        for(let i = 0; i < numRows; i++) {
            let a = Math.floor((Math.random()*20)+1);
            newNode.querySelector('table').insertAdjacentHTML('beforeend',tableRowText);
            let temp = newNode.querySelectorAll('table tr')[newNode.querySelectorAll('table tr').length-1];
            for(let j = 0; j < a; j++) {
                let span = document.createElement('span');
                span.classList.add('dot');
                temp.querySelector('.statusBar').appendChild(span.cloneNode(true))
            }
            newNode.querySelector('tbody').appendChild(temp);
        }
        return a;
    }

    return {generateTable}
}()

export default TableViewGenerator;