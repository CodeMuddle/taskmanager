import { createStore } from 'redux';
import rootReducer from './reducers';

import { wrapStore } from 'react-chrome-redux';

const store = createStore(rootReducer, {});
wrapStore(store, {
    portName: 'example'
});

let _this = this;
console.log("*** TASK MANAGER ***");

const initialState = {
    search: "",
    taskStatus:{
        "1":false,
        "2":false,
        "3":false,
        "4":false
    },
    list:[]
};

chrome.storage.sync.get(['state','notes','view'],function(ob){
    console.log("Event::index state",ob);
    store.dispatch({    
        'actionType':'initializeState',
        'type':'initializeState',
        'state':ob.state || initialState,
        'notes':ob.notes || {},
        'view':ob.view || {}
    });
});