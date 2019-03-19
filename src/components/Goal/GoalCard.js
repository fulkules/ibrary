import React, { Component } from 'react';
import './Goal.css';
import axios from 'axios';
import getAllUserData from '../../common/getUtils';
import { connect } from 'react-redux';
import { updateData } from '../../ducks/actions';
import SubGoal from './SubGoal';
import './Goal.css';

function newDate(dateFromProps) {
    if(dateFromProps){return dateFromProps}
    let date = new Date()
    let month = (parseInt(date.getMonth()) + 1) > 9 ? (parseInt(date.getMonth()) + 1) : '0' + (parseInt(date.getMonth()) + 1) 
    let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
    date = date.getFullYear() + "-" + month + "-" + day
    return date
}

class GoalCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editing: false,
            name: this.props.name,
            date: newDate(this.props.date),
            input: '',
            complete: false,
            subGoalName: '',
            completedGoals: []
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

    handleSave = async (id) => {
        const { name, date } = this.state;
        try {
            let allGoals = await axios.put(`/api/goal/${id}`, { name, date });
            allGoals = allGoals.data
            this.props.updateData({
                goals: this.props.goals,
                subGoals: this.props.subGoals,
                goals: allGoals, subGoals:
                    this.props.subGoals
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

    addSubGoal = async (id) => {
        const { subGoalName, complete } = this.state;
        try {
            let allSubGoals = await axios.post('/api/s_goal', { name: subGoalName, complete, g_id: id });
            allSubGoals = allSubGoals.data
            this.props.updateData({
                goals: this.props.goals,
                subGoals: allSubGoals,
                tasks: this.props.tasks,
                subTasks: this.props.subTasks
            })
            this.setState({ subGoalName: '', complete: false })
            const allUserData = await getAllUserData()
            this.props.updateData(allUserData)
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        // console.log(this.props)
        let mappedSubGoals;
        if(this.props.SubGoal){
            mappedSubGoals = this.props.SubGoal.map((subGoal, i) => {
                const { goal } = this.props;
                // console.log(subGoal)
                return (
                    <React.Fragment key={subGoal.id}>
                        <SubGoal
                            subGoal={subGoal}
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
                                type="date"
                                value={this.state.date}
                                onChange={(e) => this.handleInput('date', e.target.value)}
                            />
                            <button onClick={() => this.handleSave(this.props.id)}>Save</button>
                            <button onClick={this.handleCancel}>Cancel</button>
                        </div>
                        :
                        <div className="col-xs-4 wrapper">
                            <input
                                className="subGoal-complete-box"
                                type="checkbox"
                                // key={this.props.id}
                                value={this.state.complete}
                                onChange={ () => { this.toggleComplete(this.props.id) } }
                            />
                            { this.props.name }<br />
                            { this.props.date }<br />
                            <div>
                                <button className="goalEdit" onClick={ this.setEdit }>Edit</button>
                                <button className="goalDelete" onClick={ () => this.handleDelete(this.props.id) }>Delete</button><br />
                            </div>
                            <input
                                className="add-subGoal"
                                // key={this.props.id.toString()}
                                placeholder="Add a step to your goal"
                                value={ this.state.subGoalName }
                                onChange={e => this.handleInput('subGoalName', e.target.value)}
                                type="text"
                                maxLength="255"
                            />
                            <button className="add-subGoal-button" onClick={ () => this.addSubGoal(this.props.id) }>Add</button>
                            <div className="subGoalArr-container">{mappedSubGoals}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GoalCard);