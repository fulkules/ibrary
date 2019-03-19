import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser, setUserData } from '../../ducks/actions';
import getAllUserData from '../../common/getUtils';
import { withRouter } from 'react-router-dom';
import './Login.css';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
        }
    }

    handleChange(prop, val){
        this.setState({
            [prop]: val
        })
    }

    componentDidMount(){
        this.checkUser();
    }

    checkUser = async () => {
        const { id } = this.props;
        if (!id){
            try {
                let res = await axios.get('/api/current');
                this.props.updateUser(res.data);
                this.props.history.push('/dashboard');
            } catch(err) {
                console.log(err)
            }
        } else {
            this.props.history.push('/');
        }
    }

    register = async () => {
        let user = {
            username: this.state.username,
            password: this.state.password
        }
        try {
            let res = await axios.post('/auth/register', user);
            this.props.updateUser(res.data);
            this.props.history.push('/dashboard');
        } catch(err) {
            console.log(err)
        }
    }

    login = async () => {
        let user = {
            username: this.state.username,
            password: this.state.password
        }
        try {
            let res = await axios.post('/auth/login', user);
            // console.log(res)
            this.props.updateUser(res.data);
            const allUserData = await getAllUserData()
            this.props.setUserData(allUserData)
            this.props.history.push('/dashboard');
        } catch(err) {
            console.log(err)
            alert('Invalid Login credentials');
        }
    }

    render() {
        const { username, password } = this.state;
        // console.log(this.props)
        return (
            <div className="Login">
                <h1>iBrary</h1>
                <p>An app for positive thinking and task/goal management.</p>
                <p>Disclaimer: by using this site you consent to the use of cookies.</p>
                <h2>Login or Register Below</h2>
                <input 
                    value={username}
                    onChange={ e => this.handleChange('username', e.target.value) }
                    placeholder="username"
                    maxLength="100"
                />
                <input 
                    type='password'
                    value={password}
                    onChange={ e => this.handleChange('password', e.target.value) }
                    placeholder="password"
                    maxLength="100"
                />
                <button className="login-button" onClick={ this.login }>Login</button>
                <button className="register-button" onClick={ this.register }>Register</button>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return {
        id: reduxState.id
    }
}

const mapDispatchToProps = {
    updateUser,
    setUserData
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));