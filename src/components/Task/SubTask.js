import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateData } from '../../ducks/actions';
import axios from 'axios';
import './Task.css';

class SubTask extends Component {
    constructor(props){
        super(props)

        this.state = {
            editing: false,
            tasks: [],
            subTasks: [],
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
                let res = await axios.delete(`/api/s_task/${id}`);
                res = res.data;
                this.props.updateData({goals: this.props.goals, subGoals: this.props.subGoals, tasks: this.props.tasks, subTasks: res});

            } catch(err){
                console.log(err)
            }
        }
       
    }

    handleSave = async (id) => {
        const { name, complete } = this.state;
        try{
            let allSubTasks = await axios.put(`/api/s_task/${id}`, {name, complete});
            allSubTasks = allSubTasks.data
            this.props.updateData({goals: this.props.goals, subGoals: this.props.subGoals, tasks: this.props.tasks, subTasks: allSubTasks})
            this.setState({ editing: false, tasks: [], subTasks: [], name: [], complete: false, input: ''})
        } catch(err){
            console.log(err)
        }
            
    }

     render() {
// console.log(this.props)
        const { subTask } = this.props;
        // console.log(this.props.subGoal)
        return (
            <div className="subTask-container">
                <div>
                    { this.state.editing ? 
                        <div>
                            <input 
                                key={subTask.id}
                                value={this.state.name}
                                onChange={ (e) => this.handleNameInput(e) }
                            />
                            <button onClick={ () => this.handleSave(this.props.subTask.id) }>Save</button>
                            <button onClick={ this.handleCancel }>Cancel</button>
                        </div>
                        : 
                        <div>
                            <div className="subTaskArr-container">
                                <input className="subTask-complete-box" type="checkbox" key={subTask.id} value={this.state.complete} onChange={ () => {} } />
                                {subTask.name}<br/>                                
                                <button onClick={ this.setEdit }>Edit</button>
                                <button onClick={() => this.handleDelete(subTask.id) }>Delete</button> 
                            </div>
                        </div>
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SubTask);
