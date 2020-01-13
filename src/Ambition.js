//  In order to accomplish an ambition, one or more goals must be accomplished.
//  Perhaps notes can be written to further explain or detail an ambition. I
//  suppose this would count as the desc?
import Goal from './Goal'
import { eachDayOfInterval } from 'date-fns';

const Ambition = function(name, desc, dateS, dateC, completionStatus, goals = []) {
    const that = this;
    edit(name, desc, dateS, dateC, completionStatus, goals)
    
    //private 'helper' methods
    function _getAllGoalsData(){ let temp = []; for(let i = 0; i < that.goals.length; i++){ !!that.goals[i].getData ? temp.push(that.goals[i].getData()) : temp.push(that.goals[i]); }; return temp; };

    //public methods
    function getData(){return{name:that.name, desc:that.desc, dateS:that.dateS, dateC:that.dateC, completionStatus:that.completionStatus, goals:_getAllGoalsData(), 
        origAmbition: {getData, edit, addGoal, remGoal, findGoalByName, completeGoal} };};
    function addGoal(goal) { if(findGoalByName(goal.getData().name == -1))that.goals.push(goal); };
    function remGoal(index) { return that.goals.splice(index, 1); };
    function completeGoal(index) { that.goals[index].setAllTasksCompletion(true);that.completionStatus = true; };
    function clone() { return new Ambition(that.name, that.desc, that.dateS, that.dateC, that.completionStatus, that.goals) };

    function findGoalByName(name) {
        for(let i = 0; i < that.goals.length; i++)
            if(that.goals[i].getData().name == name) 
                return i;
        return -1;
    };

    function edit(name, desc, dateS, dateC, completionStatus, goals) {
        that.name = name;
        that.desc = desc;
        that.dateS = dateS;
        that.dateC = dateC;
        that.completionStatus = completionStatus;
        that.goals = goals;
        return getData();
    }

    return {getData, edit, addGoal, remGoal, findGoalByName, completeGoal, clone}
}

export default Ambition;