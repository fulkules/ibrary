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
        let goalArr = goals.map((goal, i) => {
            return(
                <div key={[i]} className="col-xs-4">
                    {goals[i].name}<br/>
                    {goals[i].date}
                </div>
            )
            // console.log(goalArr)
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