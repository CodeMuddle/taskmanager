import UniqueIdentifier from '../utils/uniqueidentifier';

export default (state = {}, action) => {
    console.log("state:",state,"action",action.actionType);
    if(action.actionType === 'initializeState'){
        state = action.state;
        return state;
    }
    switch (action.actionType) {
        case 'addToList':
            const id = UniqueIdentifier.getUniqueIdentifier();
            state.list = state.list || []
            state.list.push({
                id:id,
                createdDate: +new Date(),
                text: action.text,
                type:action.type,
                isCompleted:false
            });
            break;
        case 'addTask':
            const id = UniqueIdentifier.getUniqueIdentifier();
            
            break;
        case 'removeFromList':
            var task = action.task;
            state.list = state.list || []
            state.list = state.list.filter(function(l){
                return !(l.id === task.id);
            });
            break;
        case 'updateTask':
            var updateTask = action.task;
            state.list = state.list || []
            state.list = state.list.filter(function(l){
                if(l.id === updateTask.id) {
                    l.text = updateTask.text;
                    l.isCompleted = updateTask.isCompleted
                }
                return true;
            });
            break;
        case 'updateStatus':
            console.log("event::task taskStatus",action.taskStatus);
            state.taskStatus = action.taskStatus;
            break;
        default:
            break;
    }
    if(Object.keys(state || {}).length){
        chrome.storage.sync.set({'state':state});
    }
    return state;
};