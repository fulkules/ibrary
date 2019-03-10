import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import { connect } from 'react-redux';
import axios from 'axios';


class Task extends Component {
    constructor(){
        super()
        this.state = {
            editing: false,
            name: '',
            time: '',
            tasks: [],
            subTasks: []
        }
    }

    handleInput = (prop, val) => {
        this.setState({
            [prop]: val
        })
    }

    edit = (e) => {
        this.setState({ editing: true })
    }

    cancelChanges = async () => {
        this.setState({ editing: false })
    }

    deleteTask = async (id) => {
        await axios.delete('/api/task/:id')
    }

    render() {
        
        const { tasks, subTasks } = this.props;
        // const { editing } = this.state;
        // {this.state.editing ? 
        // (
        //     var taskArr = tasks.map((task, i) => {
        //         console.log(task[i])
        //         return(
        //             <div>
        //                 <input 
        //                     type="text" 
        //                     onChange={this.handleInput} 
        //                     value={this.state.name} 
        //                     placeholder="task name"
        //                 />
        //                 <input 
        //                     type="text" 
        //                     onChange={this.handleInput} 
        //                     value={this.state.time} 
        //                     placeholder="time of task"
        //                 />
        //                 <button onClick={ this.saveChanges }>Save</button>
        //                 <button onClick={ this.cancelChange }>Cancel</button>
        //             </div>
        //         )
        //     })
        //     let subTaskArr = subTasks.map((subTask, i) => {
        //         return (
        //             <div>
        //                 <h4>{subTasks[i].name}</h4>
        //                 <button key={subTasks[i]} onClick={ this.edit }></button>
        //                 <button key={subTasks[i]} onClick={ this.deleteTask }></button>
        //             </div>
        //         )
        //     })
        // // ) 

        // : 

        // (
        //     const taskArr = tasks.map((task, i) => {
        //         // console.log(task[i])
        //         return(
        //             <div>
        //                 <h3>{tasks[i].name}</h3>
        //                 <button onClick={ this.edit }>Edit</button>
        //                 <button onClick={ this.deleteTask }>Delete</button>
        //             </div>
        //         )
        //     })
        //     const subTaskArr = subTasks.map((subTask, i) => {
        //         return (
        //             <div>
        //                 <h4>{subTasks[i].name}</h4>
        //                 <button key={subTasks[i]} onClick={ this.edit }></button>
        //                 <button key={subTasks[i]} onClick={ this.delete }></button>
        //             </div>
        //         )
        //     })
        // )
        
    return (
        <div className="Task">
            <Nav />
            <h1>Task Component</h1>

            {/* <h3>{taskArr}</h3>
            <h5>{subTaskArr}</h5> */}
        </div>
    );
    }
}

const mapStateToProps = (reduxState) => {
    return {
        tasks: reduxState.data.tasks,
        subTasks: reduxState.data.subTasks
    }    
}

export default connect(mapStateToProps)(Task);