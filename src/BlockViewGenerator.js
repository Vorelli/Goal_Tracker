import createElement from './createElement';
import { grabFrom } from './grab';
import { formatISO9075 } from 'date-fns';
import { generateFilledDot, generateDot } from './dots';

const BlockViewGenerator = function(listener) {
    const that = this;
    that.l = listener;
    that.ambitionViewerText = "<div class='ambitionViewer'> <div id='leftHalf'> <button>Back</button> <h1 class='name'>Ambition Name</h1> <div></div> <h4 class='desc'>Ambition Discription/Notes Section</h4> </div> <div id='rightHalf'> <div id='ambitionButtons'> <div class='ambitionButtons completeButton'>U</div> <div class='ambitionButtons editButton'>E</div> <div class='ambitionButtons deleteButton'>D</div> </div> <div class='statusBar ambitionStatus'> </div> <div id='ambitionDates'> <div>Started:<br></div> <div class='ambitionStartDate ambitionDate'>09/25/2019</div> <div>Completed:<br></div> <div class='ambitionCompDate ambitionDate'>10/12/2019</div> </div> </div> </div>";    


    function generateAmbitionViewer(args) {
        let ambition = args[0];
        let docFrag = new DocumentFragment();
        docFrag.appendChild(createElement('body')).insertAdjacentHTML('beforeend', that.ambitionViewerText);
        let newNode = docFrag.querySelector('div');
        newNode.ambition = ambition;
        grabFrom(newNode, '#rightHalf .editButton').ambition = ambition;
        newNode.querySelector('button').addEventListener('click', that.l.trigger.bind(that, 'returnToSimplified'));

        if(!!ambition && !!ambition.getData)
            ambition = ambition.getData();
        editBlock(newNode, ambition.name, ambition.desc, ambition.dateS, ambition.dateC, ambition.goals);        
        grabFrom(newNode, '#rightHalf .statusBar').addEventListener('click', that.l.trigger.bind(that, 'generateTableView', ambition));
        grabFrom(newNode, '#ambitionButtons .editButton').addEventListener('click', _editBlock );

        return newNode;
    }

    function editBlock(block, name, desc, dateS, dateC, goals) {
        grabFrom(block, '#leftHalf h1').textContent = name;
        grabFrom(block, '#leftHalf h4').textContent = desc;
        grabFrom(block, '#ambitionDates .ambitionStartDate').textContent = formatISO9075(new Date(dateS), {representation: 'date'});
        grabFrom(block, '#ambitionDates .ambitionCompDate').textContent = formatISO9075(new Date(dateC), {representation: 'date'});
        let statusBar = grabFrom(block, '.statusBar');
        for(let i = 0; i < goals.length; i++)
            statusBar.appendChild(goals[i].completionStatus ? generateFilledDot() : generateDot());
    }

    function _editBlock(event) {
        that.l.trigger('editAmbitionPopup', event)
    }

    return {generateAmbitionViewer}
}
export default BlockViewGenerator;