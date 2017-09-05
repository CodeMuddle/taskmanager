import { createStore } from 'redux';
import rootReducer from './reducers';

import { wrapStore } from 'react-chrome-redux';

const store = createStore(rootReducer, {});

wrapStore(store, {
    portName: 'example'
});

let _this = this;
console.log("*** TAB SWITCHER TAB SECTION ***");

// TASK: Tab on created
chrome.tabs.onCreated.addListener((tab) => {
    console.log("called on new tab created", tab);
    chrome.tabs.getAllInWindow((tabs) => {
        store.dispatch({
            type: 'SET_ALL_TABS',
            tabs: tabs
        });
    });
});
chrome.tabs.getAllInWindow((tabs) => {
    store.dispatch({
        type: 'SET_ALL_TABS',
        tabs: tabs
    });
});

// TASK: Tab on updated
// chrome.tabs.onUpdated.addListener((tab) => {
//     console.log("called on tab updated", tab);
//     // ADD NEW TAB AND CHECK CURRENT TAB
//     /*store.dispatch({
//         type: 'CURRENT_TAB',
//         text: "UPDATED : " + tab.title
//     });*/
// });

chrome.tabs.onRemoved.addListener((tab) => {
    console.log("called on tab deleted", tab);
    chrome.tabs.getAllInWindow((tabs) => {
        store.dispatch({
            type: 'SET_ALL_TABS',
            tabs: tabs
        });
    });
});
chrome.tabs.onActivated.addListener((tab) => {
    console.log("called on window changed", tab);
    chrome.tabs.getAllInWindow((tabs) => {
        store.dispatch({
            type: 'SET_ALL_TABS',
            tabs: tabs
        });
    });
});
chrome.tabs.onDetached.addListener((tab) => {
    console.log("called on tab detached", tab);
    chrome.tabs.getAllInWindow((tabs) => {
        store.dispatch({
            type: 'SET_ALL_TABS',
            tabs: tabs
        });
    });
});
chrome.tabs.onAttached.addListener((tab) => {
    console.log("called on tab attached", tab);

});
var updatedTimeout = null;

function updatedTabs(store, id) {
    //debounce for
    if (updatedTimeout) {
        clearTimeout(updatedTimeout);
    }
    updatedTimeout = setTimeout(() => {
        store.dispatch({
            type: 'SET_ALL_TABS',
            id: id
        })
        updatedTimeout = null;
    }, 20)
}