import React, { Component } from 'react';
import { connect } from 'react-redux';


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
                <div className="goal-nail">
                    <h3>{goals[i].name}</h3>
                    <span>{goals[i].date}</span>
                </div>
            )
        })

        return (
            <div className="goal-list">
                <h1>GoalList</h1>
                <h3>
                    {goalArr}
                </h3>
                <h5></h5>
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