import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateData } from '../../ducks/actions';
import getAllUserData from '../../common/getUtils';
import CalendarHeader from '../Calendar/Calendar';
import './Goal.css';
import GoalCard from './GoalCard';


class Goal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            goals: [],
            sub_goal: [],
            name: [],
            date: [],
            input: '',
            complete: false,
            goalDate: '',
            subGoalName: ''
        }
    }

    handleInput(prop, val) {
        this.setState({ [prop]: val })
    }

    handleNameInput(e, i) {
        let name = this.state.name
        name[i] = e.target.value
        this.setState({ name })
    }

    handleDateInput(e, i) {
        let date = this.state.date
        date[i] = e.target.value
        this.setState({ date })
    }

    setEdit = () => {
        this.setState({ editing: true })
    }

    handleCancel = () => {
        this.setState({ editing: false })
    }

    handleDelete = async (id, i) => {
        const { name, date } = this.state
        // console.log(this.props)
        if (id) {
            try {
                let res = await axios.delete(`/api/goal/${id}`, { name: name[i], date: date[i] });
                res = res.data;
                this.props.updateData({
                    goals: res,
                    subGoals: this.props.subGoals,
                    tasks: this.props.tasks,
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
        const { name, date } = this.state;
        try {
            let allGoals = await axios.put(`/api/goal/${id}`, { name: name[i], date: date[i] });
            allGoals = allGoals.data
            this.props.updateData({
                goals: allGoals,
                subGoals: this.props.subGoals,
                tasks: this.props.tasks,
                subTasks: this.props.subTasks
            })
            this.setState({
                editing: false,
                goals: [],
                sub_goal: [],
                name: [],
                date: [],
                input: '',
                complete: false,
                goalDate: '',
                subGoalName: ''
            })
            const allUserData = await getAllUserData()
            this.props.updateData(allUserData)
        } catch (err) {
            console.log(err)
        }
    }

    addGoal = async () => {
        // const {name, date} = this.props.goals;
        const { input, goalDate } = this.state;
        try {
            let allGoals = await axios.post('/api/goal', { name: input, date: goalDate });
            allGoals = allGoals.data
            this.props.updateData({
                goals: allGoals,
                subGoals: this.props.subGoals,
                tasks: this.props.tasks,
                subTasks: this.props.subTasks
            })
            this.setState({ 
                editing: false,
                goals: [],
                sub_goal: [],
                name: [],
                date: [],
                input: '',
                complete: false,
                goalDate: '',
                subGoalName: '' 
            })
            const allUserData = await getAllUserData()
            this.props.setUserData(allUserData)
        } catch (err) {
            console.log(err)
        }
    }



    render() {
        // console.log(this.props)
        const { goals } = this.props;
        // console.log(goals)
        let goalArr = goals.map((goal, i) => {
            if (this.state.name[i] === undefined) {
                this.state.name[i] = goal.name
                this.state.date[i] = goal.date
            }

            // console.log(goal.sub_goal)  
            return (
                <React.Fragment key={goal.id}>
                    <GoalCard 
                        id={goal.id}
                        name={goal.name}
                        SubGoal={goal.sub_goal}
                        time={goal.time}
                        date={goal.date}
                    />
                </React.Fragment>
            )
        })
            // console.log(goal)
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
                <div className="task">{goalArr}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Goal);