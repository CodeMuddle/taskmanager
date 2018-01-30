import { combineReducers } from 'redux';

import tasks from './tasks';
import notes from './notes';
console.log(tasks,"tasks");
export default combineReducers({
    tasks,
    notes
});