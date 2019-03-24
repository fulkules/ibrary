import React, { Component } from 'react';
import { connect } from 'react-redux';
import './GoalList.css';


class GoalList extends Component {
    constructor(props){
        super(props)
        this.state = {
            goals: [],
        }
    }

    render() {
        const { goals } = this.props;
        // console.log(this.props.goals)
        let goalArr = goals.map((goal, i) => {
            let completed = [];
            // console.log(completed)
            goal.sub_goal && goal.sub_goal.filter( (subG) => {
                // console.log(goal.sub_goal.length)
                subG.complete && completed.push(subG)
                // console.log(completed.length)
            })
            return(
                <div key={[i]} className="col-xs-4">
                    {goals[i].name}<br/>
                    {goals[i].date}
                    <h1 className="progress">
                        {completed.length ? Math.round((completed.length / goals[i].sub_goal.length)*100) + '%' : '0%'}
                    </h1>
                </div>
            )
        })
        return (
            <div className="group">
                <h2>Goals</h2>
                {goalArr}
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return {
        goals: reduxState.data.goals,
    }    
}

export default connect(mapStateToProps)(GoalList);