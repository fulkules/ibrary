import { UPDATE_USER, CLEAR_USER } from './constants';
import { ADD_DATA, SET_USER_DATA, UPDATE_DATA, DELETE_DATA } from './constants';


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

//// DATA ACTIONS ////
export function addData(allUserData){
    return {
        type: ADD_DATA,
        payload: allUserData
    }
}

export function setUserData(allUserData){
    // console.log(tasks)
    return {
        type: SET_USER_DATA,
        payload: allUserData
    }
}

export function updateData(allUserData){
    return {
        type: UPDATE_DATA,
        payload: allUserData
    }
}

export function deleteData(id){
    return {
        type: DELETE_DATA,
        payload: id
    }
}
