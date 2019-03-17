import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import TaskList from './taskList/TaskList';
import GoalList from './goalList/GoalList';
import {updateUser} from '../../ducks/actions';
import './Dashboard.css';
import Quote from '../Quote/Quote';
import axios from 'axios';


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
                <Quote />
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