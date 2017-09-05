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
    switch (action.type) {
        case 'CURRENT_TAB':
            state.currentTab = action.text;
            return state;
        case 'ALL_TAB':
            return state;
        case 'FILTER_TAB':
            let text = (action.text || "").trim().toLowerCase();
            let filteredTabs = state.tabs.filter(function(t) {
                return (t.title || "").toLowerCase().search(text) > -1;
            });
            state.filteredTabs = filteredTabs;
            if (state.currentIndex > state.filteredTabs.length) {
                state.currentIndex = 0;
            }
            return state;
        case 'SET_ALL_TABS':
            state.tabs = action.tabs || [];
            state.filteredTabs = action.tabs || [];
            return state;
        case 'SELECT_TAB':
            if ('tab' in action) {
                chrome.tabs.update(action.tab.id, { active: true });
            } else {
                if (state.currentIndex <= state.filteredTabs.length) {
                    let currentTab = state.filteredTabs[state.currentIndex];
                    chrome.tabs.update(currentTab.id, { active: true });
                }
            }
            state.currentIndex = 0;
            state.filteredTabs = state.tabs;
            return state;
        case 'SELECT_NEXT':
            if (state.currentIndex < state.filteredTabs.length - 1) {
                state.currentIndex++;
            }
            return state;
        case 'SELECT_PREV':
            if (state.currentIndex > 0) {
                state.currentIndex--;
            }
            return state;
        default:
            return state;
    }
};