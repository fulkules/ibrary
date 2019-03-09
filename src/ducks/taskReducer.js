import { ADD_TASK, SET_USER_DATA, UPDATE_TASK, DELETE_TASK } from './constants';

const initialState = {
    id: 0,
    username: '',
    name: '',
    time: '',
    date: '',
    tasks: [],
    goals: [],
    subTasks: [],
    subGoals: []
}

export default function reducer(state = initialState, action){
    const { type, payload } = action;
    switch(type){
        case ADD_TASK:
            const {} = payload;
            return { 
                ...state,
                
            }
        case SET_USER_DATA:
            return { 
                ...state, 
                tasks: payload.tasks, 
                goals: payload.goals, 
                subTasks: payload.subTasks,
                subGoals: payload.subGoals 
            }
        case UPDATE_TASK:
            const {} = payload;
            return { 
                ...state 
                
            }
        case DELETE_TASK:

        default:
            return state;
    }
}