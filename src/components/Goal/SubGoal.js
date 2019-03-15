import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateData } from '../../ducks/actions';
import axios from 'axios';
import './Goal.css';

class SubGoal extends Component {
    constructor(props){
        super(props)

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

    handleNameInput(e){
        let name = this.state.name
        name = e.target.value
        this.setState({ name })
    }
    handleBoxInput(e){
        let complete = this.state.complete;
        complete = e.target.value
        this.setState({ complete: !complete })
    }

    setEdit = () => {
        this.setState({ editing: true })
    }

    handleCancel = () => {
        this.setState({ editing: false })
    }

    handleDelete = async (id) => {
        // console.log(this.props)
        if(id) {
            try{
                let res = await axios.delete(`/api/s_goal/${id}`);
                res = res.data;
                this.props.updateData({goals: this.props.goals, subGoals: res, tasks: this.props.tasks, subTasks: this.props.subTasks});

            } catch(err){
                console.log(err)
            }
        }
       
    }

    handleSave = async (id) => {
        const { name, complete } = this.state;
        try{
            let allSubGoals = await axios.put(`/api/s_goal/${id}`, {name, complete});
            allSubGoals = allSubGoals.data
            this.props.updateData({goals: this.props.goals, subGoals: allSubGoals, tasks: this.props.tasks, subTasks: this.props.subTasks})
            this.setState({ editing: false, goals: [], subGoals: [], name: [], complete: false, input: ''})
        } catch(err){
            console.log(err)
        }
            
    }

     render() {
// console.log(this.props)
        const { subGoal } = this.props;
        // console.log(this.props.subGoal)
        return (
            <div className="subGoal-container">
                <div>
                    { this.state.editing ? 
                        <div>
                            <input 
                                key={subGoal.id}
                                value={this.state.name}
                                onChange={ (e) => this.handleNameInput(e) }
                            />
                            <button onClick={ () => this.handleSave(this.props.subGoal.id) }>Save</button>
                            <button onClick={ this.handleCancel }>Cancel</button>
                        </div>
                        : 
                        <div>
                            <div className="subGoalArr-container">
                                <input className="subGoal-complete-box" type="checkbox" key={subGoal.id} value={this.state.complete} onChange={ () => {} } />
                                {subGoal.name}<br/>                                
                                <button onClick={ this.setEdit }>Edit</button>
                                <button onClick={() => this.handleDelete(subGoal.id) }>Delete</button> 
                            </div>
                        </div>
                    }
                </div>
                {/* <p>{subGoal.name}</p> */}
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return {
        goals: reduxState.data.goals,
        tasks: reduxState.data.tasks,
        update: reduxState.data.subTasks
    }    
}

const mapDispatchToProps = {
    updateData
}

export default connect(mapStateToProps, mapDispatchToProps)(SubGoal);