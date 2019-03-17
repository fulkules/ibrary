import { UPDATE_USER, CLEAR_USER } from './constants';

const initialState = {
    id: 0,
    username: '',
    history: {},
    updated: 1
}

export default function reducer(state = initialState, action){
    const { type, payload } = action;
    switch(type){
        case UPDATE_USER:
            const { id, username } = payload;
            return { ...state, id, username, updated: state.updated++ }
        case CLEAR_USER:
            return { ...state, id: 0, username: '', updated: state.updated++ }
        default:
            return state;
    }
}