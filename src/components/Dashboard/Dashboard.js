import React, { Component } from 'react';
import axios from 'axios';
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
                <h3>Dashboard</h3>
                <TaskList />
                <GoalList />
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect (mapStateToProps)(Dashboard);