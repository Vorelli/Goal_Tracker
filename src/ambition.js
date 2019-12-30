//  In order to accomplish an ambition, one or more goals must be accomplished.
//  Perhaps notes can be written to further explain or detail an ambition. I
//  suppose this would count as the desc?
import Goal from './goal'
import { eachDayOfInterval } from 'date-fns';

const Ambition = function(name, desc, dateA, dateC, completionStatus, goals = []) {
    const that = this;
    edit(name, desc, dateA, dateC, completionStatus, goals)
    
    //private 'helper' methods
    function _getAllGoalsData(){ let temp = []; for(let i = 0; i < that.goals.length; i++){ temp.push(that.goals[i].getGoalData()); }; return temp; };

    //public methods
    function getAmbitionData(){return{name:that.name, desc:that.desc, dateA:that.dateA, dateToBeC:that.dateToBeC, dateC:that.dateC, completionStatus:that.completionStatus, goals:_getAllGoalsData()};};
    function addGoal(goal) { if(findGoalByName(goal.getGoalData().name == -1))that.goals.push(goal); };
    function remGoal(index) { return that.goals.splice(index, 1); };
    function completeGoal(index) { that.goals[index].setAllTasksCompletion(true); };

    function findGoalByName(name) {
        for(let i = 0; i < that.goals.length; i++)
            if(that.goals[i].getGoalData().name == name) 
                return i;
        return -1;
    };

    function edit(name, desc, dateA, dateC, completionStatus, goals) {
        that.name = name;
        that.desc = desc;
        that.dateA = dateA;
        that.dateC = dateC;
        that.completionStatus = completionStatus;
        that.goals = goals;
    }

    return {getAmbitionData, edit, addGoal, remGoal, findGoalByName, completeGoal}
}

export default Ambition;