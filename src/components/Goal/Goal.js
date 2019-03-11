import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import { connect } from 'react-redux';
import axios from 'axios';
import getAllUserData from '../../common/getUtils';
import { updateData } from '../../ducks/actions';


class Goal extends Component {
    constructor(props){
        super(props)
        this.state = {
            editing: false,
            goals: [],
            subGoals: [],
            name: [],
            date: [],
            input: '',
            goalDate: ''
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
    handleDateInput(e, i){
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
        const {name, date} = this.state
        // console.log(this.props)
        if(id) {
            try{
                let res = await axios.delete(`/api/goal/${id}`, {name:name[i], date:date[i]});
                res = res.data;
                this.props.updateData({goals: res, subGoals: this.props.subGoals, tasks: this.props.tasks, subTasks: this.props.subTasks});
            } catch(err){
                console.log(err)
            }
        }
       
    }

    handleSave = async (id, i) => {
        const { name, date } = this.state;
        let allGoals = await axios.put(`/api/goal/${id}`, {name:name[i], date:date[i]});
        allGoals = allGoals.data
        this.props.updateData({goals: allGoals, subGoals: this.props.subGoals, tasks: this.props.tasks, subTasks: this.props.subTasks})
        this.setState({ editing: false })
    }

    addGoal = async () => {
        // const {name, date} = this.props.goals;
        const { input, goalDate } = this.state;
        let allGoals = await axios.post('/api/goal', {name: input, date: goalDate});
        allGoals = allGoals.data
        this.props.updateData({goals: allGoals, subGoals: this.props.subGoals, tasks: this.props.tasks, subTasks: this.props.subTasks})
        this.setState({ input: '', goalDate: '' })
    }

    render() {
// console.log(this.props)
        const { goals } = this.props;
        // console.log(goals)
        let goalArr = goals.map((goal, i) => {
            if(this.state.name[i] === undefined){
                this.state.name[i] = goal.name
                this.state.date[i] = goal.date
            }
            const { id, name, date } = goal;
            // console.log(goals[i].id)
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
                                key={goal[i]}
                                value={this.state.date[i]} 
                                onChange={ (e) => this.handleDateInput(e, i) }
                            />
                            <button onClick={ () => this.handleSave(id, i) }>Save</button>
                            <button onClick={ this.handleCancel }>Cancel</button>
                        </div>
                        : 
                        <div>
                            <h3>{name}</h3>
                            <h4>{date}</h4>
                            <button onClick={ this.setEdit }>Edit</button>
                            <button onClick={() => this.handleDelete(id) }>Delete</button>        
                        </div>
                    }
                </div>
            )
        })

        return (
            <div className="Goal">
                <Nav />
                <input 
                    value={this.state.input}
                    onChange={ e => this.handleInput('input', e.target.value)}
                    placeholder="Add new Goal"
                />
                <input 
                    type="date"
                    value={this.state.goalDate}
                    onChange={ e => this.handleInput('goalDate', e.target.value)}
                    placeholder="Goal Deadline"
                />
                <button onClick={ this.addGoal }>Add Goal</button>
                <h1>Goal Component</h1>
                <h3>{goalArr}</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(Goal);