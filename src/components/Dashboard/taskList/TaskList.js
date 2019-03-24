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
        // console.log(this.props)
        let taskArr = tasks.map((task, i) => {
            let completed = [];
            // console.log(completed)
            task.sub_task && task.sub_task.filter( (subT) => {
                // console.log(goal.sub_task.length)
                subT.complete && completed.push(subT)
                // console.log(completed.length)
            })
            return(
                <div key={[i]} className="col-xs-4">
                    {tasks[i].name}<br/>
                    {tasks[i].time}<br/>
                    <h1 className="progress">
                        {completed.length ? Math.round((completed.length / tasks[i].sub_task.length)*100) + '%' : '0%'}
                    </h1>
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