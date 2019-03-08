import { UPDATE_USER, CLEAR_USER } from './constants';

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


//// GOAL ACTIONS ////
