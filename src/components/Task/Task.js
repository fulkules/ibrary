import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateData } from '../../ducks/actions';
import Calendar from 'react-calendar-mobile';
import './Task.css';
import CalendarHeader from '../Calendar/Calendar';


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
            taskTime: ''
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
                this.props.updateData({goals: this.props.goals, subGoals: this.props.subGoals, tasks: res, subTasks: this.props.subTasks});
            } catch(err){
                console.log(err)
            }
        }
       
    }

    handleSave = async (id, i) => {
        const { name, time } = this.state;
        let allTasks = await axios.put(`/api/task/${id}`, {name:name[i], time:time[i]});
        allTasks = allTasks.data
        this.props.updateData({goals: this.props.goals, subGoals: this.props.subGoals, tasks: allTasks, subTasks: this.props.subTasks})
        this.setState({ editing: false })
    }

    addTask = async () => {
        // const {name, date} = this.props.goals;
        const { input, taskTime } = this.state;
        let allTasks = await axios.post('/api/task', {name: input, time: taskTime});
        allTasks = allTasks.data
        this.props.updateData({goals: this.props.goals, subGoals: this.props.subGoals, tasks: allTasks, subTasks: this.props.subTasks})
        this.setState({ input: '', taskTime: '' })
    }

    onChange = date => this.setState({ date })

    render() {
// console.log(this.props)
        const { tasks } = this.props;
        // console.log(tasks)
        let taskArr = tasks.map((task, i) => {
            if(this.state.name[i] === undefined){
                this.state.name[i] = task.name
                this.state.time[i] = task.time
            }
            const { id, name, time } = task;
            // console.log(tasks[i].id)
            return(
                <div key={id}>
                    { this.state.editing ? 
                        <div>
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
                        <div>
                            <h3>{name}</h3>
                            <h4>{time}</h4>
                            <button onClick={ this.setEdit }>Edit</button>
                            <button onClick={() => this.handleDelete(id) }>Delete</button>        
                        </div>
                    }
                </div>
            )
        })

        return (
            <div className="Task">
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
                <h1>Task Component</h1>
                <h3>{taskArr}</h3>
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