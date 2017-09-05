import { combineReducers } from 'redux';

import count from './count';
import tabs from './tabs';

export default combineReducers({
    count,
    tabs
});