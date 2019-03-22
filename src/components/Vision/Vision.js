import React, { Component } from 'react';
import CalendarHeader from '../Calendar/Calendar';
import './Vision.css';
import Modal from 'react-responsive-modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import {updateData} from '../../ducks/actions';
import axios from 'axios';
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';


class Vision extends Component {
    constructor(props){
        super(props)

        this.state = {
            open1: false,
            open2: false,
            placeholder: '',
            type: '',
            text: '',
            img: '',
            isUploading: false,
            url: '',
            file: {},
            signedRequest: '',
            visions: []
        }
    }

    onOpenModalQuill = () => {
        this.setState({ open1: true });
    };
    
    onCloseModalQuill = () => {
        this.setState({ open1: false });
    };

    onOpenModalDrop = () => {
        this.setState({ open2: true });
    }

    onCloseModalDrop = () => {
        this.setState({ open2: false });
    }

    handleChange = (val) => {
        this.setState({ text: val })
    }
    
    getVisions = async () => {
        let res = await axios.get('/api/visions').then(res => {
            this.setState({ visions: res.data })
        })
    }
    
    componentDidMount(){
        this.getVisions()
    }

    getSignedRequest = ([file]) => {
        this.setState({ isUploading: true });
        // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;
    
       console.log('before axios')
        // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
        axios
          .get('/api/signs3', {
            params: {
              'file-name': fileName,
              'file-type': file.type,
            },
          })
          .then(response => {
              console.log('in .then')
            const { signedRequest, url } = response.data;
            console.log(response)
            this.uploadFile(file, signedRequest, url);
            // this.setState({ img: file.preview, signedRequest, url })
          })
          .catch(err => {
            console.log(err);
          });
      };
    
      uploadFile = (file, signedRequest, url) => {
          console.log(file, signedRequest, url)
        const options = {
          headers: {
            'Content-Type': file.type,
          },
        };
    
        axios
          .put(signedRequest, file, options)
          .then(response => {
              console.log(response)
            this.setState({ isUploading: false, url });
            // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
            this.addVision();
          })
          .catch(err => {
            this.setState({
              isUploading: false,
            });
            if (err.response.status === 403) {
            //   alert(
            //     `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
            //       err.stack
            //     }`
            //   );
            } else {
              alert(`ERROR: ${err.status}\n ${err.stack}`);
            }
          });
      };

    onDrop = (acceptedFiles) => {
        console.log(acceptedFiles)
        const file = acceptedFiles[0];
        this.setState({
          img: file.preview
        })
    };
    

    addVision = async () => {
        // console.log(this.props)
        // this.uploadFile(this.state.file, this.state.signedRequest, this.state.img)
        const { type, text, img } = this.state;
        let vision = {
            type,
            text,
            img
        }

        let res = await axios.post(`/api/vision`, { type, text, img });
        res = res.data;
        console.log(res.data)
    }

    // deleteVision = (id) => {
    //     axios.delete(`/api/vision/${id}`).then(res => {
    //         return this.getVisions()
    //     })
    // }

    render(){
        const { open1, open2, url, isUploading, img, visions } = this.state;
        const { id } = this.props;
        let visionArr = visions.map((vision, i) => {
            console.log(vision)
            return(
                <div>
                    <img
                        src={vision.img}
                        key={[i]}
                        alt="My Vision Item" 
                    />
                    {/* <i className="far fa-trash-alt" onClick={this.deleteVision(id)}></i> */}
                </div>
            )
        });

        return (
            <div className="Vision">
                <CalendarHeader />
                <div className="vision-icons">
                    <i className="far fa-file-alt fa-3x" onClick={ this.onOpenModalQuill }></i>
                    <Modal open={ open1 } onClose={ this.onCloseModalQuill } center>
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
                    <i className="far fa-image fa-3x" onClick={ this.onOpenModalDrop }></i>
                    <Modal open={ open2 } onClose={ this.onCloseModalDrop } center>
                        <h1>Upload</h1>
                        <h1 style={{fontSize: "14px"}}>{url}</h1>
                        <img src={ img ? img : 'http://via.placeholder.com/450x450' } alt="" width="250px" />
                        <Dropzone
                            onDropAccepted={this.getSignedRequest}
                            style={{
                                position: 'relative',
                                width: 200,
                                height: 200,
                                borderWidth: 7,
                                marginTop: 50,
                                borderColor: 'rgb(102, 102, 102)',
                                borderStyle: 'dashed',
                                borderRadius: 5,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: 28,
                            }}
                            accept="image/*"
                            multiple={false}
                        >
                            {isUploading ? <GridLoader /> : <p>Drop File or Click Here</p>}
                        </Dropzone>
                        <button onClick={ this.addVision }>Submit</button>
                    </Modal>
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
      ['link'],
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
    'link'
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