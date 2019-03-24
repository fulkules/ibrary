import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import Weather from '../Weather/Weather';
import './Header.css';
import { updateUser, clearUser } from '../../ducks/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class Header extends Component {
    constructor(props){
        super(props)

        this.state = {
            tasks: 0
        }
    }

    logout = async () => {
        await axios.post('/auth/logout');
        this.props.clearUser();
        this.props.history.push('/')
    }

    render() {
        const { username } = this.props.auth;
        // console.log(this.props)
        return (
                <div className="Header">
                    <Nav />
                    <div className="weather-api" ><Weather /></div>
                    <h1>Hello {username}!</h1>
                    <h3 
                        className="numTasks">{this.props.data.tasks.length || 0} Tasks To Complete
                    
                    </h3>
                    <button onClick={this.logout}>Logout</button>
                </div>
        
        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

const mapDispatchToProps = {
    updateUser,
    clearUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));