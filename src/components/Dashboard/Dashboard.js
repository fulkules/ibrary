import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import TaskList from './taskList/TaskList';
import GoalList from './goalList/GoalList';
import './Dashboard.css';


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
                <TaskList />
                <br /> <br />
                <GoalList />
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect (mapStateToProps)(Dashboard);