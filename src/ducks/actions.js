import { UPDATE_USER, CLEAR_USER } from './constants';
import { ADD_TASK, SET_USER_DATA, UPDATE_TASK, DELETE_TASK } from './constants';


//// AUTH ACTIONS ////
export function updateUser(user){
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function clearUser(){
    return {
        type: CLEAR_USER
    }
}

//// DASH ACTIONS ////



//// TASK ACTIONS ////
export function addTask(){
    return {
        type: ADD_TASK,
        payload: ''
    }
}

export function setUserData(allUserData){
    // console.log(tasks)
    return {
        type: SET_USER_DATA,
        payload: allUserData
    }
}

export function updateTask(){
    return {
        type: UPDATE_TASK,
        payload: ''
    }
}

export function deleteTask(){
    return {
        type: DELETE_TASK
    }
}


//// GOAL ACTIONS ////
