import { createStore, combineReducers } from 'redux';
import auth from './authReducer';
import data from './dataReducer';



export default createStore(combineReducers({
    auth,
    data
}),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);