import createElement from './createElement';
const AmbitionViewerGenerator = function() {
    const that = this;
    that.ambitionViewerText = "<div class='ambitionViewer'> <div id='leftHalf'> <h1>Ambition Name</h1> <h4>Ambition Discription/Notes Section</h4> </div> <div id='rightHalf'> <div id='ambitionButtons'> <div class='ambitionButtons completeButton'>U</div> <div class='ambitionButtons editButton'>E</div> <div class='ambitionButtons deleteButton'>D</div> </div> <div class='statusBar ambitionStatus'> </div> <div id='ambitionDates'> <div>Started:<br></div> <div class='ambitionStartDate ambitionDate'>09/25/2019</div> <div>Completed:<br></div> <div class='ambitionCompDate ambitionDate'>10/12/2019</div> </div> </div> </div>";

    function generateAmbitionViewer(ambition) {
        let docFrag = new DocumentFragment();
        docFrag.appendChild(createElement('body')).insertAdjacentHTML('beforeend', that.ambitionViewerText);
        let newNode = docFrag.querySelector('div');
        return newNode;
    }
    return {generateAmbitionViewer};
}
export default AmbitionViewerGenerator;