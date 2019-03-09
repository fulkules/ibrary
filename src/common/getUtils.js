import axios from 'axios';

export default async function() {
    return await Promise.all([getTasks(), getGoals(), getSubTasks(), getSubGoals()])
    .then( values => {
        let allUserData = {}
        allUserData.tasks = values[0]
        allUserData.goals = values[1]
        allUserData.subTasks = values[2]
        allUserData.subGoals = values[3]
        return allUserData
    })
} 

async function getTasks() {
    try {
        let res = await axios.get('/api/tasks');
        return res.data
    } catch (err) {
        console.log(err)
    }
}

async function getGoals() {
    try {
        let res = await axios.get('/api/goals');
        return res.data
    } catch (err) {
        console.log(err)
    }
}

async function getSubTasks() {
    try {
        let res = await axios.get('/api/s_tasks');
        return res.data
    } catch (err) {
        console.log(err)
    }
}
async function getSubGoals() {
    try {
        let res = await axios.get('/api/s_goals');
        return res.data
    } catch (err) {
        console.log(err)
    }
}