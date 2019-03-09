import axios from 'axios';

export default async function() {
    return await Promise.all([updateTask(id), updateGoal(id), updateSubTask(id), updateSubGoal(id)])
    .then( values => {
        let allUserData = {}
        allUserData.tasks = values[0]
        allUserData.goals = values[1]
        allUserData.subTasks = values[2]
        allUserData.subGoals = values[3]
        return allUserData
    })
} 

async function updateTask(id) {
    try {
        let res = await axios.put('/api/task/:id');
        return res.data
    } catch (err) {
        console.log(err)
    }
}

async function updateGoal(id) {
    try {
        let res = await axios.put('/api/goal/:id');
        return res.data
    } catch (err) {
        console.log(err)
    }
}

async function updateSubTask(id) {
    try {
        let res = await axios.put('/api/s_task/:id');
        return res.data
    } catch (err) {
        console.log(err)
    }
}
async function updateSubGoal() {
    try {
        let res = await axios.put('/api/s_goals/:id');
        return res.data
    } catch (err) {
        console.log(err)
    }
}