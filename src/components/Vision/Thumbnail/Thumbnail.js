import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


class Thumbnail extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            visions: [],
        }
    }

    getVisions = async () => {
        let res = await axios.get('/api/visions').then(res => {
            console.log(1111111)
            this.setState({ visions: res.data })
        })
    }

    refreshPage = () => {
        window.location.reload()
    }

    deleteVision = async () => {
        const { id } = this.props;
        console.log(id)
        await axios.delete(`/api/vision/${id}`).then(res => {
            this.setState({ visions: res.data })
        });
        this.refreshPage();
    } 

    

    render() {
        // console.log(this.props.id)
        const { id, img, text } = this.props;
        
        return (
            <div className="Thumbnail">
                <img 
                    src={img}
                    alt="My Vision Item"
                />
                <i className="far fa-trash-alt fa-2x" onClick={ this.deleteVision }></i>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {

    return {
        user_id: reduxState.auth.user_id
    }
}

export default connect (mapStateToProps)(Thumbnail);