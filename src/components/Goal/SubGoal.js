import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateData } from '../../ducks/actions';
import getAllUserData from '../../common/getUtils';
import axios from 'axios';
import './Goal.css';

class SubGoal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editing: false,
            goals: [],
            subGoals: [],
            name: '',
            complete: false,
            input: '',
            background: '#FFE4E5'
        }
    }

    componentDidMount(){
        const background = this.props.subGoal.complete ? "#DBFFBA" : "#FFE4E5"
        this.setState({ complete: this.props.subGoal.complete, name: this.props.subGoal.name, background })
    }

    handleInput(props, val) {
        this.setState({ [props]: val })
    }

    handleNameInput(e) {
        let name = this.state.name
        name = e.target.value
        this.setState({ name })
    }

    changeBackground = (id) => {
        const { complete } = this.state;
        // console.log(complete)
        // console.log({1111: this.props})
        this.handleSave(id, !complete);
        if (!complete) {
            console.log('1')
            this.setState({ background: '#DBFFBA', complete: true })
        } else {
            console.log('2')
            this.setState({ background: '#FFE4E5', complete: false})
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
                let res = await axios.delete(`/api/s_goal/${id}`);
                res = res.data;
                this.props.updateData({
                    goals: this.props.goals,
                    subGoals: res,
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

    handleSave = async (id, complete) => {
        complete = typeof complete === 'boolean' ? complete : this.props.subGoal.complete
        const { name } = this.state;
        try {
            let allSubGoals = await axios.put(`/api/s_goal/${id}`, { name, complete });
            allSubGoals = allSubGoals.data
            // this.props.updateData({
            //     goals: this.props.goals,
            //     subGoals: allSubGoals,
            //     tasks: this.props.tasks,
            //     subTasks: this.props.subTasks
            // })
            this.setState({ editing: false })
            const allUserData = await getAllUserData()
            this.props.updateData(allUserData)
        } catch (err) {
            console.log(err)
        }

    }

    render() {
        // console.log(this.props)
        const { subGoal } = this.props;
        // console.log(this.props.subGoal)
        return (
            <React.Fragment>
                    {this.state.editing ?
                        <div>
                            <input
                                key={subGoal.id}
                                value={this.state.name}
                                onChange={(e) => this.handleNameInput(e)}
                                maxLength="255"
                            />
                            <div>
                                <i className="far fa-save saveEditButton" onClick={ () => this.handleSave(this.props.subGoal.id) }></i>
                                <i className="far fa-window-close" onClick={ this.handleCancel }></i>
                            </div>
                        </div>
                        :
                        <div className="subGoal-container" style={{ background: this.state.background }}>
                            <input 
                                checked={this.state.complete ? true : ""}
                                className="subGoal-complete-box" 
                                type="checkbox" 
                                key={subGoal.id} 
                                value={this.state.complete} 
                                onChange={ () => this.changeBackground(subGoal.id) } 
                            />
                            {subGoal.name}<br />
                            <i className="far fa-edit editSubGoal-button" onClick={ this.setEdit }></i>
                            <i className="far fa-trash-alt subGoalDelete" onClick={ () => this.handleDelete(subGoal.id) }></i>
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

export default connect(mapStateToProps, mapDispatchToProps)(SubGoal);