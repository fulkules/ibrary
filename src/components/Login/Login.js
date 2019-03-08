import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser } from '../../ducks/actions';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
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
            this.props.history.push('/dashboard');
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
            this.props.history.push('/dashboard');
        } catch(err) {
            console.log(err)
            alert('Invalid Login credentials');
        }
    }

    render() {
        const { username, password } = this.state;
        return (
            <div className="Login">
                <h2>Login Component</h2>
                <input 
                    value={username}
                    onChange={ e => this.handleChange('username', e.target.value) }
                    placeholder="username"
                />
                <input 
                    type='password'
                    value={password}
                    onChange={ e => this.handleChange('password', e.target.value) }
                    placeholder="password"
                />
                <button onClick={ this.register }>Register</button>
                <button onClick={ this.login }>Login</button>
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
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);