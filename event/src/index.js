import { createStore } from 'redux';
import rootReducer from './reducers';
import { wrapStore } from 'react-chrome-redux';
import TaskClass from '../../class/Task';


const store = createStore(rootReducer, {});
wrapStore(store, {
    portName: 'example'
});

let _this = this;
console.log("*** TASK MANAGER ***");

var task1 = new TaskClass("1",true);

const initialState = {
    search: "",
    taskStatus:{
        "1":false,
        "2":false,
        "3":false,
        "4":false
    },
    list:[],
    dataVersion:2,

    task1:null,
    task2:null,
    task3:null,
    task4:null
};

chrome.storage.sync.get('state',function(ob){
    console.log("Event::index state",ob);
    var task1, task2, task3, task4;
    if((ob || {}).dataVersion !== initialState.dataVersion) {
        task1 = new TaskClass("1",true,ob.list);
        task2 = new TaskClass("2",true,ob.list);
        task3 = new TaskClass("3",true,ob.list);
        task4 = new TaskClass("4",true,ob.list);
    } else {
        task1 = new TaskClass("1");
        task2 = new TaskClass("2");
        task3 = new TaskClass("3");
        task4 = new TaskClass("4");
        task1.setContent(ob.task1 || {});
        task2.setContent(ob.task2 || {});
        task3.setContent(ob.task3 || {});
        task4.setContent(ob.task4 || {});
    }
    var state = ob.state || initialState;
    state.task1 = task1;
    state.task2 = task2;
    state.task3 = task3;
    state.task4 = task4;
    store.dispatch({    
        'actionType':'initializeState',
        'type':'initializeState',
        'state':state
    });
});