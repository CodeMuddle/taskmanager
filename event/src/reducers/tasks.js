import UniqueIdentifier from '../utils/uniqueidentifier';
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

export default (state = initialState, action) => {
    console.log("state:",state,"action",action.actionType);
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
            return state;
        case 'removeFromList':
            var task = action.task;
            state.list = state.list || []
            state.list = state.list.filter(function(l){
                return !(l.id === task.id);
            });
            return state;
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
            return state;
        case 'updateStatus':
            console.log("event::task taskStatus",action.taskStatus);
            state.taskStatus = action.taskStatus;
            return state;
        default:
            return state;
    }
};