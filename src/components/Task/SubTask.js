import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateData } from '../../ducks/actions';
import getAllUserData from '../../common/getUtils';
import axios from 'axios';

class SubTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editing: false,
            tasks: [],
            subTasks: [],
            name: this.props.subTask.name,
            complete: false,
            input: ''
        }
    }

    handleInput(props, val) {
        this.setState({ [props]: val })
    }

    handleNameInput(e) {
        let name = this.state.name
        name = e.target.value
        this.setState({ name })
    }

    handleBoxInput(e) {
        let complete = this.state.complete;
        complete = e.target.value
        this.setState({ complete: !complete })
        if (complete) {
            //if truthy set background of container-div to a light green
        } else {
            // if falsey set background of container-div to a light red
        }
    }

    setEdit = () => {
        this.setState({ editing: true })
    }

    handleCancel = () => {
        this.setState({ editing: false })
    }

    handleDelete = async (id) => {
        // console.log(this.props)
        if (id) {
            try {
                let res = await axios.delete(`/api/s_task/${id}`);
                res = res.data;
                this.props.updateData({
                    goals: this.props.goals,
                    subGoals: this.props.subGoals,
                    tasks: this.props.tasks,
                    subTasks: res
                });
                const allUserData = await getAllUserData()
                this.props.updateData(allUserData)
            } catch (err) {
                console.log(err)
            }
        }

    }

    handleSave = async (id) => {
        const { name, complete } = this.state;
        try {
            let allSubTasks = await axios.put(`/api/s_task/${id}`, { name, complete });
            allSubTasks = allSubTasks.data
            this.props.updateData({
                goals: this.props.goals,
                subGoals: this.props.subGoals,
                tasks: this.props.tasks,
                subTasks: allSubTasks
            })
            this.setState({ editing: false, tasks: [], subTasks: [], name: [], complete: false, input: '' })
            const allUserData = await getAllUserData()
            this.props.updateData(allUserData)
        } catch (err) {
            console.log(err)
        }

    }

    render() {
        // console.log(this.props)
        const { subTask } = this.props;
        // console.log(this.props.subGoal)
        return (
            <React.Fragment>
                {this.state.editing ?
                    <React.Fragment>
                        <input
                            key={subTask.id}
                            value={this.state.name}
                            onChange={(e) => this.handleNameInput(e)}
                            maxLength="255"
                        />
                        <div>
                            <button onClick={() => this.handleSave(this.props.subTask.id)}>Save</button>
                            <button onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </React.Fragment>
                    :
                    <div className="subTask-container">
                        <input 
                            className="subTask-complete-box" 
                            type="checkbox" 
                            key={subTask.id} 
                            value={this.state.complete} 
                            onChange={() => { }} 
                        />
                        {subTask.name}<br/>
                        <i className="far fa-edit editSubTask-button" onClick={ this.setEdit }></i>
                        <i className="far fa-trash-alt subTaskDelete" onClick={ () => this.handleDelete(subTask.id) }></i>
                    </div>
                }
            </React.Fragment>
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
