import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import taskList from './taskList/TaskList';
import goalList from './goalList/GoalList';


class Dashboard extends Component {
    constructor(){
        super()
        
        this.state = {

        }
    }



    render() {
        console.log(this.props)
        return (
            <div className="Dashboard">
                <Header />
                <h3>Dashboard</h3>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect (mapStateToProps)(Dashboard);