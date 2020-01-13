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

    function _parseJSON(ambitions) {
        ambitions.forEach(item => {
            if(!!item.goals){
                //ambition
                let tempAmbition = new Ambition(item.name, item.desc, new Date(item.dateA),
                    new Date(item.dateC), item.completionStatus, _parseJSON(item.goals));
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
                return tempTask;
            }
        })
    }
    
    function _load(ambitions) {
        let a = that.storage.load('ambitions');
        that.ambitions = []; 
        _save();
        if(!!ambitions && !!ambitions.length){
            that.ambitions=ambitions.slice(0); //if instantiated with an ambitions object, set the ambitions array to a copy of it.
            return;
        }
        else if(!!ambitions && !!ambitions.goals){
            that.ambitions.push(ambitions.clone()); //if instantiated with an ambition object, add it to the ambitions array.
            return;
        }
        else if(a!=null && a!=undefined) {//otherwise, laod the ambition objects from localstorage
            if(that.ambitions.length != 0){
                a = JSON.parse(ambitions);
                _parseJSON(a);
            }
            else 
                _parseJSON([]);
        }else {
            _save();
        }
    }

    function getIndex(name) { 
        for(let i = 0; i < that.ambitions.length; i++)
            if(ambitions[i].getData().name == name)
                return i;
        return -1;
    }

    function replacebyName(name, newAmbition) {
        that.ambitions[getIndex(name)] = newAmbition;
    }

    function _save() { that.storage.save('ambitions', _genSaveString()) };
    function _genSaveString() { JSON.stringify(getData()) };
    function get(index) { return that.ambitions[index] };
    function insert(pos, ambition) { if(getIndex(ambition) == -1){that.ambitions.insert(pos, ambition);_save();return true;}return false; }
    function swap(pos1, pos2) { if(Math.max(pos1,pos2)>=that.ambitions.length || Math.min(pos1,pos2)<0)return;let temp = that.ambitions[pos1]; that.ambitions[pos1] = that.ambitions[pos2]; that.ambitions[pos2] = temp;_save(); }
    function push(ambition) { that.ambitions.push(ambition) };
    function remove(ambition) { return that.ambitions.splice(getIndex(ambition.getData().name), 1); };
    function removeByName(name) { return that.ambitions.splice(getIndex(name), 1); };
    function getData() { 
        let temp = {ambitions: []};
        that.ambitions.forEach(ambition => {
            temp.ambitions.push(ambition.getData())
        });
        return temp;
    }

    return {push, insert, swap, get, remove, removeByName, getData, getIndex};
}
export default Ambitions;