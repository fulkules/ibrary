import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import Weather from '../Weather/Weather';

class Header extends Component {
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