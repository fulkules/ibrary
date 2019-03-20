import React, { Component } from 'react';
import './Task.css';
import axios from 'axios';
import getAllUserData from '../../common/getUtils';
import { connect } from 'react-redux';
import { updateData } from '../../ducks/actions';
import SubTask from './SubTask';
import './Task.css';

function newDate(dateFromProps) {
    if(dateFromProps){return dateFromProps}
    let date = new Date()
    let month = (parseInt(date.getMonth()) + 1) > 9 ? (parseInt(date.getMonth()) + 1) : '0' + (parseInt(date.getMonth()) + 1) 
    let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
    date = date.getFullYear() + "-" + month + "-" + day
    return date
}

class TaskCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editing: false,
            // tasks: [],
            // sub_task: [],
            name: this.props.name,
            time: this.props.time,
            date: newDate(this.props.date),
            input: '',
            complete: false,
            subTaskName: '',
            completedTasks: []
        }
    }

    handleInput(props, val) {
        this.setState({ [props]: val })
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

    handleSave = async (id) => {
        const { name, time } = this.state;
        try {
            let allTasks = await axios.put(`/api/task/${id}`, { name: name, time: time });
            allTasks = allTasks.data
            this.props.updateData({
                goals: this.props.goals,
                subGoals: this.props.subGoals,
                tasks: allTasks, subTasks:
                    this.props.subTasks
            })
            this.setState({ 
                editing: false,

            })
            const allUserData = await getAllUserData()
            this.props.updateData(allUserData)
        } catch (err) {
            console.log(err)
        }
    }

    addSubTask = async (id) => {
        const { subTaskName, complete } = this.state;
        try {
            let allSubTasks = await axios.post('/api/s_task', { name: subTaskName, complete, t_id: id });
            allSubTasks = allSubTasks.data
            this.props.updateData({
                goals: this.props.goals,
                subGoals: this.props.subGoals,
                tasks: this.props.tasks,
                subTasks: allSubTasks
            })
            this.setState({ subTaskName: '', complete: false })
            const allUserData = await getAllUserData()
            this.props.updateData(allUserData)
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        // console.log(this.props)
        let mappedSubTasks;
        if(this.props.SubTask){
            mappedSubTasks = this.props.SubTask.map((subTask, i) => {
                const {task} = this.props;
                // console.log(subTask)
                return (
                    <React.Fragment key={subTask.id}>
                        <SubTask
                            subTask={subTask}
                        />
                    </React.Fragment>
                )
            })
        }

        return (
            <React.Fragment>
                {
                    this.state.editing ?
                        <div className="col-xs-4 wrapper">
                            <input
                                // key={this.props.id}
                                value={this.state.name}
                                onChange={(e) => this.handleInput('name', e.target.value)}
                                type="text"
                                maxLength="255"
                            />
                            <input
                                // key={this.props.id}
                                type="time"
                                value={this.state.time}
                                onChange={(e) => this.handleInput('time', e.target.value)}
                            />
                            <div>
                                <button onClick={() => this.handleSave(this.props.id)}>Save</button>
                                <button onClick={this.handleCancel}>Cancel</button>
                            </div>
                        </div>
                        :
                        <div className="col-xs-4 wrapper">
                            <input
                                className="subTask-complete-box"
                                type="checkbox"
                                // key={this.props.id}
                                value={this.state.complete}
                                onChange={() => { this.toggleComplete(this.props.id) }}
                            />
                            {this.props.name}<br />
                            {this.props.time}<br />
                            <div>
                                <button className="taskEdit" onClick={this.setEdit}>Edit</button>
                                <button className="taskDelete" onClick={() => this.handleDelete(this.props.id)}>Delete</button><br />
                            </div>
                            <input
                                className="add-subTask"
                                // key={this.props.id.toString()}
                                placeholder="Add a step to your task"
                                value={this.state.subTaskName}
                                onChange={e => this.handleInput('subTaskName', e.target.value)}
                                type="text"
                                maxLength="255"
                            />
                            <button className="add-subTask-button" onClick={() => this.addSubTask(this.props.id)}>Add</button>
                            <div className="subTaskArr-container">{mappedSubTasks}</div>
                        </div>
                }
            </React.Fragment >
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskCard);