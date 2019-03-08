import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser, clearUser } from '../../ducks/actions';


class Dashboard extends Component {
    constructor(){
        super()
        
        this.state = {

        }
    }

    componentDidMount(){
        this.getUser();
    }

    getUser = async () => {
        const { id } = this.props;
        if(!id){
            try{
                let res = await axios.get('/api/current');
                this.props.updateUser(res.data)
                console.log(res)
            } catch(err){
                console.log(err)
                this.props.history.push('/')
            }
        }
    }

    logout = async () => {
        await axios.post('/auth/logout');
        this.props.clearUser();
        this.props.history.push('/')
    }

    render() {
        const { username } = this.props.auth;
        console.log(this.props.auth)
        return (
            <div className="Dashboard">
                <h3>Dashboard</h3>
                <h4>Welcome {username}</h4>
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

export default connect (mapStateToProps, mapDispatchToProps)(Dashboard);