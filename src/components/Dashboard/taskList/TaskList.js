import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TaskList.css';


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
                <div key={[i]} className="col-xs-4">
                    {tasks[i].name}<br/>
                    {tasks[i].time}<br/>
                </div>
            )
        })

        return (
            <div className="group">
                <h2>Tasks</h2>
                {taskArr}
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