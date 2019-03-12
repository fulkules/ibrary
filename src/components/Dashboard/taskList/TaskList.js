import React, { Component } from 'react';
import { connect } from 'react-redux';


class TaskList extends Component {
    constructor(props){
        super(props)
        this.state = {
            tasks: [],
        }
    }



    render() {
        const { tasks } = this.props;
        console.log(this.props)
        let taskArr = tasks.map((task, i) => {
            return(
                <div className="card" key={task.id}>
                    <h3>{tasks[i].name}</h3>
                    <span>{tasks[i].time}</span>
                </div>
            )
        })

        return (
            <div className="scrolling-wrapper">
                <h2>Tasks</h2>
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
    }    
}

export default connect(mapStateToProps)(TaskList);