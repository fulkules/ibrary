import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import { connect } from 'react-redux';


class Task extends Component {
    constructor(props){
        super(props)
        this.state = {
            tasks: [],
            subTasks: []
        }
    }



    render() {
        const { tasks } = this.props;
        let taskArr = tasks.map((task, i) => {
            return(
                <div>
                    <h3>{tasks[i].name}</h3>
                </div>
            )
        })

        return (
            <div className="Task">
                <Nav />
                <h1>Task Component</h1>
                <h3>
                    {taskArr}
                </h3>
                <h5></h5>
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