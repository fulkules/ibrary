import axios from 'axios';

export default async function() {
    return await Promise.all([addTask(), addGoal(), addSubTask(), addSubGoal()])
    .then( values => {
        let allUserData = {}
        allUserData.tasks = values[0]
        allUserData.goals = values[1]
        allUserData.subTasks = values[2]
        allUserData.subGoals = values[3]
        return allUserData
    })
} 

async function addTask() {
    try {
        let res = await axios.post('/api/task');
        return res.data
    } catch (err) {
        console.log(err)
    }
}

async function addGoal() {
    try {
        let res = await axios.post('/api/goal');
        return res.data
    } catch (err) {
        console.log(err)
    }
}

async function addSubTask() {
    try {
        let res = await axios.post('/api/s_task');
        return res.data
    } catch (err) {
        console.log(err)
    }
}
async function addSubGoal() {
    try {
        let res = await axios.post('/api/s_goal');
        return res.data
    } catch (err) {
        console.log(err)
    }
}