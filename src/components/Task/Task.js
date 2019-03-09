import React, { Component } from 'react';
import Nav from '../Nav/Nav';


class Task extends Component {
    constructor(){
        super()
        this.state = {

        }
    }



    render() {
        return (
            <div className="Task">
                <Nav />
                <h1>Task Component</h1>
            </div>
        );
    }
}

export default Task;