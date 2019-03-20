import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import './Calendar.css';
import { updateUser, clearUser } from '../../ducks/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import dateFns from 'date-fns';
import Calendar from 'react-calendar-mobile';
import {withRouter} from 'react-router-dom';


class CalendarHeader extends Component {
    constructor(){
        super()

        this.state = {
            currentMonth: new Date(),
            currentWeek: new Date(),
            selectedDate: new Date(),
            toggleView: false,
            height: 0
        }
    }

    logout = async () => {
        console.log(this.props)
        await axios.post('/auth/logout');
        this.props.clearUser();
        this.props.history.push('/')
    }
    
    renderHeader(){ 
        const dateFormat = "MMMM YYYY";
        return (
            <div className="header row flex-middle">
                <div className="col col-center">
                    <span>
                        {dateFns.format(this.state.currentMonth, dateFormat)}
                    </span>
                </div>
                
                
            </div>
        );
    } 

    renderDays(){ 
        const dateFormat = "ddd";
        // const dayFormat = "d";
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentWeek);
        // let endDate = dateFns.endOfWeek(this.state.currentWeek);
        let daysInMonth = dateFns.getDaysInMonth(startDate.getDate())
        // console.log(dateFns.getDaysInMonth(startDate.getDate()));

        let additionalDay = 0
        for (let i = 0; i < 7; i++){
            let day = startDate.getDate() + i > daysInMonth ? 1 + additionalDay : startDate.getDate() + i
            startDate.getDate() + i > daysInMonth && additionalDay++

            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)} <br/>
                    {day}
                </div>
            )
        }
        return <div className="days row">{days}</div>
    }

    renderCells(){ 
        return (
            <div>
                <Calendar className="calendar" selectedDate={(date) => console.log(date)}/>
            </div>
        )
    }

    toggle = () => {
        // console.log('hit')
        const {toggleView} = this.state;
        this.setState({ toggleView: !toggleView })
    }

    onDateClick = day => { 
        this.setState({ selectedDate: day })
        console.log({ selectedDate: day })
    }


    render() {
        const { username } = this.props.auth;
        const { toggleView } = this.state;
        // console.log(this.props)
        return (
                <div className="main">
                    <Nav />
                    <button className="logout" onClick={this.logout}>Logout</button> <br/>
                    {this.renderHeader()}
                    {this.renderDays()}
                    <i class="far fa-calendar-alt" onClick={ this.toggle }></i>
                    {toggleView && this.renderCells()}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CalendarHeader));