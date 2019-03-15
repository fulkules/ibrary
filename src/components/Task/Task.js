import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateData } from '../../ducks/actions';
import getAllUserData from '../../common/getUtils';
import './Task.css';
import CalendarHeader from '../Calendar/Calendar';
import SubTask from './SubTask';


class Task extends Component {
    constructor(props){
        super(props)
        this.state = {
            editing: false,
            tasks: [],
            subTasks: [],
            name: [],
            time: [],
            date: new Date(),
            input: '',
            taskTime: '',
            subTaskName: ''
        }
    }

    handleInput(props, val){
        this.setState({ [props]: val})
    }

    handleNameInput(e, i){
        let name = this.state.name
        name[i] = e.target.value
        this.setState({ name })
    }
    handleTimeInput(e, i){
        let time = this.state.time
        time[i] = e.target.value
        this.setState({ time })
    }

    setEdit = () => {
        this.setState({ editing: true })
    }

    handleCancel = () => {
        this.setState({ editing: false })
    }

    handleDelete = async (id, i) => {
        const {name, time} = this.state
        // console.log(this.props)
        if(id) {
            try{
                let res = await axios.delete(`/api/task/${id}`, {name:name[i], time:time[i]});
                res = res.data;
                this.props.updateData({
                    goals: this.props.goals, 
                    subGoals: this.props.subGoals, 
                    tasks: res, 
                    subTasks: this.props.subTasks});
                    const allUserData = await getAllUserData()
                    this.props.updateData(allUserData)
            } catch(err){
                console.log(err)
            }
        }
       
    }

    handleSave = async (id, i) => {
        const { name, time } = this.state;
        try {
            let allTasks = await axios.put(`/api/task/${id}`, {name:name[i], time:time[i]});
            allTasks = allTasks.data
            this.props.updateData({goals: this.props.goals, subGoals: this.props.subGoals, tasks: allTasks, subTasks: this.props.subTasks})
            this.setState({ editing: false })
            const allUserData = await getAllUserData()
            this.props.updateData(allUserData)
        } catch(err){
            console.log(err)
        }
    }

    addTask = async () => {
        // const {name, date} = this.props.goals;
        const { input, taskTime } = this.state;
        try {
            let allTasks = await axios.post('/api/task', {name: input, time: taskTime});
            allTasks = allTasks.data
            this.props.updateData({goals: this.props.goals, subGoals: this.props.subGoals, tasks: allTasks, subTasks: this.props.subTasks})
            this.setState({ input: '', taskTime: '' })
        } catch(err) {
            console.log(err)
        }
    }

    onChange = date => this.setState({ date })

    addSubTask = async (id) => {
        const { subTaskName, complete } = this.state;
        try {
            let allSubTasks = await axios.post('/api/s_task', { name: subTaskName, complete, t_id: id });
            allSubTasks = allSubTasks.data
            this.props.updateData({ 
                goals: this.props.goals, 
                subGoals: this.props.subGoals, 
                tasks: this.props.tasks, 
                subTasks: allSubTasks })
            this.setState({ subTaskName: '', complete: false })
            const allUserData = await getAllUserData()
            this.props.updateData(allUserData)
        } catch (err) {
            console.log(err)
        }
    }

    render() {
// console.log(this.props)
        const { tasks } = this.props;
        // console.log(tasks)
        let taskArr = tasks.map((task, i) => {
            if(this.state.name[i] === undefined){
                this.state.name[i] = task.name
                this.state.time[i] = task.time
            }

            let mappedSubTasks;
            if(task.sub_task){
                mappedSubTasks = task.sub_task.map((subTask, i) => {
                    return (
                        <div key={i}>
                            <SubTask 
                                subTask={subTask}
                                key={i}
                            />
                        </div>
                    )
                })
            }

            const { id, name, time } = task;
            // console.log(tasks[i].id)
            return(
                <div key={id}>
                    { this.state.editing ? 
                        <div className="col-xs-4">
                            <input 
                                key={id}
                                value={this.state.name[i]}
                                onChange={ (e) => this.handleNameInput(e, i) }
                            />
                            <input 
                                key={task[i]}
                                value={this.state.time[i]} 
                                onChange={ (e) => this.handleTimeInput(e, i) }
                            />
                            <button onClick={ () => this.handleSave(id, i) }>Save</button>
                            <button onClick={ this.handleCancel }>Cancel</button>
                        </div>
                        : 
                        <div className="col-xs-4">
                            <h3>{name}</h3>
                            <h4>{time}</h4>
                            <button className="taskEdit" onClick={ this.setEdit }>Edit</button>
                            <button className="taskDelete" onClick={() => this.handleDelete(id) }>Delete</button>
                            <input
                                className="add-subTask"
                                key={id.toString()}
                                placeholder="Add a step to your goal"
                                onChange={e => this.handleInput('subTaskName', e.target.value)}
                            />
                            <button className="add-subTask-button" onClick={() => this.addSubTask(id)} >Add</button>
                            <div id="subList">{mappedSubTasks}</div>        
                        </div>
                    }
                </div>
            )
        })

        return (
            <div>
                <CalendarHeader />
                <input 
                    value={this.state.input}
                    onChange={ e => this.handleInput('input', e.target.value)}
                    placeholder="Add new Task"
                />
                <input 
                    type="time"
                    value={this.state.taskTime}
                    onChange={ e => this.handleInput('taskTime', e.target.value)}
                    placeholder="Task Time"
                />
                <button onClick={ this.addTask }>Add Task</button>
                <div className="task">{taskArr}</div>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return {
        goals: reduxState.data.goals,
        subGoals: reduxState.data.subGoals,
        tasks: reduxState.data.tasks,
        subTasks: reduxState.data.subTasks,
        update: reduxState.data.subTasks
    }    
}

const mapDispatchToProps = {
    updateData
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);