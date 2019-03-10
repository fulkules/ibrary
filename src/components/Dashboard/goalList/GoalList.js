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
                <div className="card">
                        <h3>{goals[i].name}</h3>
                        <span>{goals[i].date}</span>
                </div>
            )
            console.log(goalArr)
        })
        return (
            <div className="scrolling-wrapper">
                    <h3>
                        {goalArr}
                    </h3>
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