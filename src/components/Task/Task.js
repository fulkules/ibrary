import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateData } from '../../ducks/actions';
import getAllUserData from '../../common/getUtils';
import './Task.css';
import CalendarHeader from '../Calendar/Calendar';
import SubTask from './SubTask';
import TaskCard from './TaskCard';


class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            tasks: [],
            sub_task: [],
            name: [],
            time: [],
            date: new Date(),
            input: '',
            complete: false,
            subTaskName: '',
            completedTasks: []
        }
    }

    handleInput(props, val) {
        this.setState({ [props]: val })
    }

    handleNameInput(e, i) {
        let name = this.state.name
        name[i] = e.target.value
        this.setState({ name })
    }
    handleTimeInput(e, i) {
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
        const { name, time } = this.state
        // console.log(this.props)
        if (id) {
            try {
                let res = await axios.delete(`/api/task/${id}`, { name: name[i], time: time[i] });
                res = res.data;
                this.props.updateData({
                    goals: this.props.goals,
                    subGoals: this.props.subGoals,
                    tasks: res,
                    subTasks: this.props.subTasks
                });
                const allUserData = await getAllUserData()
                this.props.updateData(allUserData)
            } catch (err) {
                console.log(err)
            }
        }

    }

    handleSave = async (id, i) => {
        const { name, time } = this.state;
        try {
            let allTasks = await axios.put(`/api/task/${id}`, { name: name[i], time: time[i] });
            allTasks = allTasks.data
            this.props.updateData({
                goals: this.props.goals,
                subGoals: this.props.subGoals,
                tasks: allTasks, subTasks:
                    this.props.subTasks
            })
            this.setState({ editing: false })
            const allUserData = await getAllUserData()
            this.props.updateData(allUserData)
        } catch (err) {
            console.log(err)
        }
    }

    addTask = async () => {
        // const {name, date} = this.props.tasks;
        const { input, taskTime, date } = this.state;
        try {
            let allTasks = await axios.post('/api/task', { name: input, time: taskTime, date });
            allTasks = allTasks.data
            this.props.updateData({
                goals: this.props.goals,
                subGoals: this.props.subGoals,
                tasks: allTasks,
                subTasks: this.props.subTasks
            })
            this.setState({ input: '', taskTime: '' })
        } catch (err) {
            console.log(err)
        }
    }

    componentDidMount() {
        this.setDate();
        // console.log(this.state.date)
    }

    setDate = date => this.setState({ date })

    toggleComplete = (id) => {
        const { complete } = this.state;
        this.setState({ complete: !complete })
        
    }

    render() {
        const { tasks } = this.props;
        // console.log(this.props)
        let taskArr = tasks.map((task, i) => {
            if (this.state.name[i] === undefined) {
                this.state.name[i] = task.name
                this.state.time[i] = task.time
            }

            

            // console.log(task.sub_task)  
            return (
                <React.Fragment key={task.id}>
                    <TaskCard 
                        id={task.id}
                        name={task.name}
                        SubTask={task.sub_task}
                        time={task.time}
                        date={task.date}
                    />
                </React.Fragment>
            )
        })
        return (
            <React.Fragment>
                <CalendarHeader />
                <input
                    value={this.state.input}
                    onChange={e => this.handleInput('input', e.target.value)}
                    placeholder="Add new Task"
                    className="addTask-input"
                    type="text"
                    maxLength="255"
                />
                <input
                    type="time"
                    value={this.state.taskTime}
                    onChange={e => this.handleInput('taskTime', e.target.value)}
                    placeholder="Task Time"
                    className="addTime-input"
                />
                <button className="addTask-button" onClick={this.addTask}>Add Task</button>
                {/* <div className="task">{taskArr}</div> */}
                <div className="task">{taskArr}</div>
            </React.Fragment>
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