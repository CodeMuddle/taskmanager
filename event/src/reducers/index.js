import { combineReducers } from 'redux';

import tasks from './tasks';
import notes from './notes';
import view from './view';
console.log(tasks,"tasks");
export default combineReducers({
    tasks,
    notes,
    view
});