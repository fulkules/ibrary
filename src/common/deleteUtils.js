import axios from 'axios';

export default async function() {
    return await Promise.all([deleteTask(id), deleteGoal(id), deleteSubTask(id), deleteSubGoal(id)])
    .then( values => {
        let allUserData = {}
        allUserData.tasks = values[0]
        allUserData.goals = values[1]
        allUserData.subTasks = values[2]
        allUserData.subGoals = values[3]
        return allUserData
    })
} 

async function deleteTask(id) {
    try {
        let res = await axios.delete('/api/task/:id');
        return res.data
    } catch (err) {
        console.log(err)
    }
}

async function deleteGoal(id) {
    try {
        let res = await axios.delete('/api/goal/:id');
        return res.data
    } catch (err) {
        console.log(err)
    }
}

async function deleteSubTask(id) {
    try {
        let res = await axios.delete('/api/s_task/:id');
        return res.data
    } catch (err) {
        console.log(err)
    }
}
async function deleteSubGoal(id) {
    try {
        let res = await axios.delete('/api/s_goal/:id');
        return res.data
    } catch (err) {
        console.log(err)
    }
}