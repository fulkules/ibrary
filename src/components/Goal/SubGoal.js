import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateData } from '../../ducks/actions';
import axios from 'axios';

class SubGoal extends Component {
    constructor(){
        super()

        this.state = {
            editing: false,
            goals: [],
            subGoals: [],
            name: [],
            complete: false,
            input: ''
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
    handleBoxInput(e, i){
        let complete = this.state.complete;
        complete[i] = e.target.value
        this.setState({ complete: !complete })
    }

    setEdit = () => {
        this.setState({ editing: true })
    }

    handleCancel = () => {
        this.setState({ editing: false })
    }

    handleDelete = async (id, i) => {
        const { name, complete } = this.state
        // console.log(this.props)
        if(id) {
            try{
                let res = await axios.delete(`/api/s_goal/${id}`, {name: name[i], complete:complete[i]});
                res = res.data;
                this.props.updateData({goals: this.props.goals, subGoals: res, tasks: this.props.tasks, subTasks: this.props.subTasks});
            } catch(err){
                console.log(err)
            }
        }
       
    }

    handleSave = async (id, i) => {
        const { name, complete } = this.state;
        try{
            let allSubGoals = await axios.put(`/api/s_goal/${id}`, {name:name[i], complete:complete[i]});
            allSubGoals = allSubGoals.data
            this.props.updateData({goals: this.props.goals, subGoals: allSubGoals, tasks: this.props.tasks, subTasks: this.props.subTasks})
            this.setState({ editing: false })
        } catch(err){
            console.log(err)
        }
            
    }

    addSubGoal = async () => {
        // const {name, date} = this.props.goals;
        const { input, complete } = this.state;
        try{
            let allSubGoals = await axios.post('/api/s_goal', {name: input, complete});
            allSubGoals = allSubGoals.data
            this.props.updateData({goals: this.props.goals, subGoals: allSubGoals, tasks: this.props.tasks, subTasks: this.props.subTasks})
            this.setState({ input: '', complete: false })
        } catch(err) {
            console.log(err)
        }
    }

     render() {
// console.log(this.props)
        const { subGoals } = this.props;
        // console.log(goals)
        let subGoalArr = subGoals.map((subGoal, i) => {
            if(this.state.name[i] === undefined){
                this.state.name[i] = subGoal.name
                this.state.complete[i] = subGoal.complete
            }
            const { id, name, complete } = subGoal;
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
                            <button onClick={ () => this.handleSave(id, i) }>Save</button>
                            <button onClick={ this.handleCancel }>Cancel</button>
                        </div>
                        : 
                        <div>
                            <h3>{name}</h3>
                            <input type="checkbox" value={this.state.complete[i]} />
                            <button onClick={ this.setEdit }>Edit</button>
                            <button onClick={() => this.handleDelete(id) }>Delete</button>        
                        </div>
                    }
                </div>
            )
        })

        return (
            <div className="subGoal">
                <input 
                    value={this.state.input}
                    onChange={ e => this.handleNameInput('input', e.target.value)}
                    placeholder="Add new SubGoal"
                />
                <input 
                    type="checkbox"
                    value={this.state.subGoal.complete}
                    onChange={ e => this.handleBoxInput(e.target.value)}
                />
                <button onClick={ this.addGoal }>Add Goal</button>
                <h1>Goal Component</h1>
                <h3>{subGoalArr}</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(SubGoal);