import React, { Component } from 'react';
import CalendarHeader from '../Calendar/Calendar';
import './Vision.css';
import Modal from 'react-responsive-modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import {updateData} from '../../ducks/actions';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class Vision extends Component {
    constructor(props){
        super(props)

        this.state = {
            open: false,
            placeholder: '',
            type: '',
            text: '',
            img: '',
        
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
    
    onCloseModal = () => {
        this.setState({ open: false });
    };

    handleChange = (val) => {
        this.setState({ text: val })
    }
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

    addVision = async () => {
        // console.log(this.props)
        const { type, text, img } = this.state;

        let res = await axios.post(`/api/vision`, { type, text, img });
        res = res.data;
        
    }

    deleteQuill = (id) => {
        
    }

    render(){
        const { open } = this.state;
        const { id } = this.props;
        // if(!id){
        //    return <Redirect to="/" />
        // }
        return (
            <div className="Vision">
                <CalendarHeader />
                <div className="vision-icons">
                    <i className="far fa-file-alt fa-3x" onClick={ this.onOpenModal }></i>
                    <Modal open={ open } onClose={ this.onCloseModal } center>
                        <ReactQuill 
                            onChange={this.handleChange}
                            value={this.state.text}
                            modules={Vision.modules}
                            formats={Vision.formats}
                            bounds={'.app'}
                            placeholder={this.props.placeholder}
                        />
                        <button onClick={ this.addVision }>Submit</button>
                    </Modal>
                    <i className="far fa-image fa-3x"></i>
                </div>
                <div className="thumbnail-clipboard">

                </div>
                
            </div>
        );
    }
}

Vision.modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  /* 
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  Vision.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]
  
  /* 
   * PropType validation
   */
//   Vision.propTypes = {
//     placeholder: PropTypes.string,
//   }
  
const mapStateToProps = (reduxState) => {
    return {
        goals: reduxState.data.goals,
        subGoals: reduxState.data.subGoals,
        tasks: reduxState.data.tasks,
        subTasks: reduxState.data.subTasks,
        update: reduxState.data.subTasks,
        id: reduxState.auth.id
    }
}

const mapDispatchToProps = {
    updateData
}

export default connect(mapStateToProps, mapDispatchToProps)(Vision);