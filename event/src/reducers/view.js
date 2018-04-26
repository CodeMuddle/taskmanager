import UniqueIdentifier from '../utils/uniqueidentifier';
import NotesClass from '../utils/notes';
const Notes = new NotesClass();
const Pages = {
    TODAY_TASK:1,
    PRIORITY_TASK:2,
    NOTES:3
};

const initialState = {
    page: Pages.TODAY_TASK,
    updateNote: null
};

export default (oldState = initialState, action) => {
    let state = {...oldState};
    console.log("View   state:",oldState,"action",action.actionType);
    if(action.actionType === 'initializeState'){
        state = action.view;
        return state;
    }
    switch (action.actionType) {
        case "PAGE":
        console.log("page",action);
        state.page = action.page;
        chrome.storage.sync.set({'view':{...state}});
        break;
        case "SELECT_NOTE":
        console.log("page",action);
        state.updateNote = action.updateNote;
        case "CLEAR_NOTE":
        console.log("page",action);
        state.updateNote = null;
        chrome.storage.sync.set({'view':{...state}});
        break;
        default:
            break;
    }
    return state;
};