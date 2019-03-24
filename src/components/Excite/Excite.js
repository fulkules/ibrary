import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateData} from '../../ducks/actions';
import CalendarHeader from '../Calendar/Calendar';


class Excite extends Component {

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
        const {user_id} = this.props;
        if(!user_id){
           return <Redirect to="/" />
        }
        return (
            <div className="Excite">
                <CalendarHeader />
                <h1>Excite</h1>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return {
        goals: reduxState.data.goals,
        subGoals: reduxState.data.subGoals,
        tasks: reduxState.data.tasks,
        subTasks: reduxState.data.subTasks,
        update: reduxState.data.subTasks,
        user_id: reduxState.auth.user_id
    }
}

const mapDispatchToProps = {
    updateData
}

export default connect(mapStateToProps, mapDispatchToProps)(Excite);