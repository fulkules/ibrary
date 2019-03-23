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

    deleteVision = async () => {
        console.log('hit')
        const { id } = this.props;
        console.log({deleteVision: 333333})
        await axios.delete(`/api/vision/${id}`)
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
        id: reduxState.auth.id
    }
}

export default connect (mapStateToProps)(Thumbnail);