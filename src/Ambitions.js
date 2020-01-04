import Ambition from "./Ambition";
import Goal from "./Goal";
import Task from "./Task";
import UserStorage from './UserStorage';

//  Stores a table of ambitions and provides helper methods to
//  provide better functionality than an array would on its own.
//  Makes JSON generation a hell of a lot easier.
const Ambitions = function(ambitions) {
    const that = this;
    that.storage = UserStorage;
    _load(ambitions);
    

    function _genSaveString(ambitions = that.ambitions) {
        JSON.stringify(ambitions.getData());
    }

    function _parseJSON(ambitions) {
        ambitions.forEach(item => {
            if(!!item.goals){
                //ambition
                let tempAmbition = new Ambition(item.name, item.desc, new Date(item.dateA),
                    new Date(item.dateC), item.completionStatus, _parseJSON(item.gaols));
                that.ambitions.push(tempAmbition);
            }else if(!!item.tasks) {
                //goal
                let tempGoal = new Goal(item.name, item.desc, new Date(item.dateA), new Date(item.dateToBeC),
                    new Date(item.dateC), item.completionStatus, _parseJSON(item.tasks));
                return tempGoal;
            }else if(!!item.subTasks) {
                //task
                let tempTask = new Task(item.name, new Date(item.dateA), new Date(item.dateToBeC),
                    new Date(item.dateC), item.completionStatus, _parseJSON(item.subTasks));
            }
        })
    }
    
    function _save() {
        that.storage.save('ambitions', _genSaveString)
    }

    function _load(ambitions) {
        let a = that.storage.load('ambitions');
        console.log('here')
        that.ambitions = []; 
        if(!!ambitions.length){
            that.ambitions=ambitions;
            return;
        }
        else if(!!ambitions.goals){
            that.ambitions.push(ambitions);
            return;
        }
        a = JSON.parse(ambitions);
        _parseJSON(a);
    }

    function getIndex(a) { 
        for(let i = 0; i < that.ambitions.length; i++)
            if(ambition.getAmbitionData().name == a.getAmbitionData().name)
                return i;
        return -1;
    }
    function get(index) { return that.ambitions[index] };
    function insert(pos, ambition) { if(getIndex(ambition) == -1){that.ambitions.insert(pos, ambition);_save();return true;}return false; }
    function swap(pos1, pos2) { if(Math.max(pos1,pos2)>=that.ambitions.length || Math.min(pos1,pos2)<0)return;let temp = that.ambitions[pos1]; that.ambitions[pos1] = that.ambitions[pos2]; that.ambitions[pos2] = temp;_save(); }
    function push(ambition) { insert(that.ambitions.length-1, ambition) };
    function remove(index) { return that.ambitions.splice(index, 1); };
    function getData() { 
        let temp = {ambitions: []};
        that.ambitions.forEach(ambition => {
            temp.ambitions.push(ambition.getAmbitionData())
        });
        return temp;
    }

    return {push, insert, swap, get, remove, getData, getIndex};
}
export default Ambitions;