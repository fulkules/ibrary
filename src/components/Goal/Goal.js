import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import { connect } from 'react-redux';
import axios from 'axios';


class Goal extends Component {
    constructor(props){
        super(props)
        this.state = {
            editing: false,
            goals: [],
            subGoals: [],
            name: '',
            date: ''
        }
    }

    handleInput = (prop, val) => {
        this.setState({ [prop]: val })
    }

    handleEdit = () => {
        this.setState({ editing: true })
    }

    handleCancel = () => {
        this.setState({ editing: false })
    }

    handleDelete = async () => {
        
    }

    handleSave = async () => {
        await axios.put('/api/goal/:id');
    }

    render() {
        const { goals } = this.props;
        let goalArr = goals.map((goal, i) => {
            return(
                <div>
                    { (this.state.editing) ? 
                        <div>
                                <input 
                                    key={goals[i]}
                                    value={goals[i].name}
                                    onChange={ (e) => this.handleInput(e.target.value) }
                                />
                                <input 
                                    key={goals[i]}
                                    value={goals[i].date} 
                                    onChange={ (e) => this.handleInput(e.target.value) }
                                />
                                <button onClick={ this.handleSave(goals[i].id) }>Save</button>
                                <button onClick={ this.handleCancel }>Cancel</button>
                        </div>
                        : 
                        <div>
                            <h3>{goals[i].name}</h3>
                            <h4>{goals[i].date}</h4>
                            <button onClick={ this.handleEdit }>Edit</button>
                            <button onClick={ this.handleDelete(goals[i].id) }>Delete</button>        
                        </div>
                    }
                </div>
            )
        })

        return (
            <div className="Goal">
                <Nav />
                <h1>Goal Component</h1>
                <h3>
                    {goalArr}
                </h3>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return {
        goals: reduxState.data.goals,
        subGoals: reduxState.data.subGoals
    }    
}

export default connect(mapStateToProps)(Goal);