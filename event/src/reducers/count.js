const initialState = 0;

export default (state = initialState, action) => {
    console.log("called", state, action);
    switch (action.type) {
        case 'ADD_COUNT':
            console.log("new asfdkjasdf");
            return state + (action.payload || 1);
        case 'CREATE_URL':
            var createProperties = {
                url: 'http://www.google.com'
            };
            chrome.tabs.create(createProperties);
            return true;
        case 'CURRENT_TAB1':
            console.log(state, "state");
            return state;
        case 'ALL_TAB':
            var allTabs = chrome.tabs.query({}, function(tabs) {
                console.log("tabs", tabs);
            });
            return state;
        default:
            return state;
    }
};