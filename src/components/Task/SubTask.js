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
            name: '',
            complete: false,
            input: '',
            background: "#FFE4E5"
        }
    }

    componentDidMount(){
        const background = this.props.subTask.complete ? "#DBFFBA" : "#FFE4E5"
        this.setState({ complete: this.props.subTask.complete, name: this.props.subTask.name, background})
    }
    
    handleInput(props, val) {
        this.setState({ [props]: val })
    }

    handleNameInput(e) {
        let name = this.state.name
        name = e.target.value
        this.setState({ name })
    }

    changeBackground = async (id) => {
        const { complete } = this.state;
        console.log(complete)
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

    handleSave = async (id, complete) => {
        complete = typeof complete === 'boolean' ? complete : this.props.subTask.complete
        const { name } = this.state;
        try {
            let allSubTasks = await axios.put(`/api/s_task/${id}`, { name, complete });
            allSubTasks = allSubTasks.data
            // this.props.updateData({
            //     goals: this.props.goals,
            //     subGoals: this.props.subGoals,
            //     tasks: this.props.tasks,
            //     subTasks: allSubTasks
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
        const { subTask } = this.props;
        // console.log(this.props.subGoal)
        console.log(subTask)
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
                            <i className="far fa-save saveEditButton" onClick={ () => this.handleSave(this.props.subTask.id) }></i>
                            <i className="far fa-window-close" onClick={ this.handleCancel }></i>
                        </div>
                    </React.Fragment>
                    :
                    <div className="subTask-container" style={{background: this.state.background}}>
                        <input 
                            checked={this.state.complete ? "true" : ""}
                            className="subTask-complete-box" 
                            type="checkbox" 
                            key={subTask.id} 
                            value={this.state.complete} 
                            onClick={ () => this.changeBackground(subTask.id) } 
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
