import UniqueIdentifier from '../utils/uniqueidentifier';
const initialState = {
    isLoading: false,
    currentTab: "",
    currentIndex: 0,
    tabs: [],
    search: "",
    filteredTabs: [],
    selectedTab: {}
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
            debugger;
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
        default:
            return state;
    }
};