import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import TaskList from './taskList/TaskList';
import GoalList from './goalList/GoalList';


class Dashboard extends Component {
    constructor(){
        super()
        
        this.state = {

        }
    }



    render() {
        // console.log(this.props)
        return (
            <div className="Dashboard">
                <Header />
                {/* <TaskList /> */}
                <GoalList />
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect (mapStateToProps)(Dashboard);