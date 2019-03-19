import React, { Component } from 'react';
import './Task.css';
import axios from 'axios';
import getAllUserData from '../../common/getUtils';
import { connect } from 'react-redux';
import { updateData } from '../../ducks/actions';
import SubTask from './SubTask';
import './Task.css';


class TaskCard extends Component {
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
                                value={this.props.name}
                                onChange={(e) => this.handleNameInput(e)}
                                type="text"
                                maxLength="255"
                            />
                            <input
                                // key={this.props.id}
                                type="time"
                                value={this.props.time}
                                onChange={(e) => this.handleTimeInput(e)}
                            />
                            <button onClick={() => this.handleSave(this.props.id)}>Save</button>
                            <button onClick={this.handleCancel}>Cancel</button>
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
                            <button className="taskEdit" onClick={this.setEdit}>Edit</button>
                            <button className="taskDelete" onClick={() => this.handleDelete(this.props.id)}>Delete</button><br />
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