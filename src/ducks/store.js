import { createStore, combineReducers } from 'redux';
import auth from './authReducer';
import dash from './dashReducer';
import task from './taskReducer';
import goal from './goalReducer';



export default createStore(combineReducers({
    auth,
    // dash,
    // task,
    // goal
}),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);