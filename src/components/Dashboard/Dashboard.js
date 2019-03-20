import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import TaskList from './taskList/TaskList';
import GoalList from './goalList/GoalList';
import {updateUser} from '../../ducks/actions';
import {Redirect} from 'react-router-dom';
import './Dashboard.css';
import Quote from './Quote/Quote';
import axios from 'axios';


class Dashboard extends Component {
    constructor(){
        super()
        
        this.state = {

        }
    }

    // componentDidMount(){
    //     this.checkUser();
    // }

    // checkUser = async () => {
    //     const { id } = this.props;
    //     if (!id){
    //         try {
    //             let res = await axios.get('/api/current');
    //             this.props.updateUser(res.data);
    //         } catch(err) {
    //             console.log(err)
    //         }
    //     } else {
    //         this.props.history.push('/');
    //     }
    // }

    render() {
        console.log(this.props.id)
        const {id} = this.props;
        if(!id){
           return <Redirect to="/" />
        }
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

    return {
        id: reduxState.auth.id
    }
}

export default connect (mapStateToProps, {updateUser})(Dashboard);