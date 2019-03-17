import React, { Component } from 'react';
import CalendarHeader from '../Calendar/Calendar';
import './Vision.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



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

    render(){
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
                <div className="themeSwitcher">
                    <label>Theme </label>
                    <select onChange={ (e) => this.handleThemeChange(e.target.value) }>
                    <option value="snow">Snow</option>
                    <option value="bubble">Bubble</option>
                    <option value="core">Core</option>
                    </select>
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
  

export default Vision;