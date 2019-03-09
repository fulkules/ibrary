import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import { connect } from 'react-redux';


class Goal extends Component {
    constructor(props){
        super(props)
        this.state = {
            goals: [],
            subGoals: []
        }
    }



    render() {
        const { goals } = this.props;
        let goalArr = goals.map((task, i) => {
            return(
                <div>
                    <h3>{goals[i].name}</h3>
                </div>
            )
        })

        return (
            <div className="Goal">
                <Nav />
                <h1>Goal Component</h1>
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
        subGoals: reduxState.data.subGoals
    }    
}

export default connect(mapStateToProps)(Goal);