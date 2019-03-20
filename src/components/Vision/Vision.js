import React, { Component } from 'react';
import CalendarHeader from '../Calendar/Calendar';
import './Vision.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import {updateData} from '../../ducks/actions';
import { Redirect } from 'react-router-dom';


class Vision extends Component {
    constructor(props){
        super(props)

        this.state = {
            editorHtml: '',
            theme: 'snow'
        }
    }

    handleChange = (html) => {
        this.setState({ editorHtml: html })
    }

    handleThemeChange = (newTheme) => {
        if(newTheme === "core") newTheme = null;
        this.setState({ theme: newTheme })
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

    render(){
        const {id} = this.props;
        if(!id){
           return <Redirect to="/" />
        }
        return (
            <div className="Vision">
                <CalendarHeader />
                <ReactQuill 
                    theme={this.state.theme}
                    onChange={this.handleChange}
                    value={this.state.editorHtml}
                    modules={Vision.modules}
                    formats={Vision.formats}
                    bounds={'.app'}
                    placeholder={this.props.placeholder}
                />
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