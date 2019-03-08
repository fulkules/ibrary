import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import Weather from '../Weather/Weather';
import './Header.css';

class Header extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <div className="Header">
                <Nav />
                <Weather />
            </div>
        );
    }
}

export default Header;