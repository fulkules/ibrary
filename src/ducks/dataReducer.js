import { ADD_DATA, SET_USER_DATA, UPDATE_DATA, DELETE_DATA } from './constants';

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
        case ADD_DATA:
            return { 
                ...state,
                tasks: payload.tasks, 
                goals: payload.goals, 
                subTasks: payload.subTasks,
                subGoals: payload.subGoals
            }
        case SET_USER_DATA:
            return { 
                ...state, 
                tasks: payload.tasks, 
                goals: payload.goals, 
                subTasks: payload.subTasks,
                subGoals: payload.subGoals 
            }
        case UPDATE_DATA:
            return { 
                ...state, 
                tasks: payload.tasks, 
                goals: payload.goals, 
                subTasks: payload.subTasks,
                subGoals: payload.subGoals,
            }
        case DELETE_DATA:
            return {
                ...state, 
                tasks: payload.tasks, 
                goals: payload.goals, 
                subTasks: payload.subTasks,
                subGoals: payload.subGoals
            }
        default:
            return state;
    }
}