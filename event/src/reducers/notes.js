import UniqueIdentifier from '../utils/uniqueidentifier';
import NotesClass from '../utils/notes';
const Notes = new NotesClass();
export default (oldState = {}, action) => {
    let state = {...oldState};
    console.log("Notes   state:",oldState,"action",action.actionType);
    if(action.actionType === 'initializeState') {
        Notes._import({...action.notes});
        return Notes._export();
    }
    switch (action.actionType) {
        case 'addNewNotes':
            const id = UniqueIdentifier.getUniqueIdentifier();
            // Notes._import({...state});
            Notes.add({title:action.title,text:action.text},id);
            state = Notes._export();
            break;
        case 'removeNotes':
            Notes.remove(action.id);
            state = Notes._export();
            break;
        case 'updateNotes':
            Notes.update({title:action.title,text:action.text},action.id);
            state = Notes._export();
            break;
        case 'clearNotes':
            Notes._import({_head:null,_tail:null,contents:{}});
            state = Notes._export();
            break;
        default:
            break;
    }
    if(Object.keys(state && state.contents || {}).length && action.actionType){
        chrome.storage.sync.set({'notes':{...state}});
    }
    return state;
};