import React, { Component } from 'react';
import { connect } from 'react-redux';

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

     render() {
// console.log(this.props)
        const { subGoals } = this.props;
        // console.log(goals)
        let subGoalArr = subGoals.map((goal, i) => {
            if(this.state.name[i] === undefined){
                this.state.name[i] = subGoal.name
            }
            const { id, name } = subGoal;
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
                            <input type="checkbox" value="false" />
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
                    placeholder="Add new SubGoal"
                />
                <input 
                    type="checkbox"
                    value={this.state.subGoal.complete}
                    onChange={ e => this.handleInput(e.target.value)}
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

export default connect(mapStateToProps, mapDispatchToProps)(SubGoal);