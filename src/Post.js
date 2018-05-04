import React, {Component} from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, Blocks, Data, convertToRaw, convertFromRaw } from 'draft-js';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { RichUtils } from 'draft-js';
import request from 'superagent';
import { WithContext as ReactTags } from 'react-tag-input';
import './static/css/Editor.css';
import {Button, Icon, Chip, Input, Autocomplete} from 'react-materialize'
import update from 'react-addons-update'; // ES6



class Post extends Component {
    
    constructor(props) {
        
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };

    }
    
    componentDidMount = () => {
        this.getPost();
    }

    getPost = event => {
        var TOKEN = localStorage.getItem("tokenID");
        var url = 'http://localhost:8080/post/' + this.props.match.params.postid;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + TOKEN,
            }
        }).then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then(data => {
            console.log("api call returned (promise)")
            var content = data.post.body;
            if (content) {
                console.log('found')
                this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
            } else {
                console.log('no match')
                this.state.editorState = EditorState.createEmpty();
            }

            this.setState({
                editorTitle: data.post.title,
                isLoaded: true,
            })
        })
    }



render() {
    const { isLoaded, editorTitle } = this.state;
    
    if (isLoaded) {
        return (
            <Grid>
                <Row>
                    <div style={{textAlign: 'center'}} >
                        <h1>{editorTitle}</h1>
                    </div>
                </Row>
                <Row>
                <Editor 
                    editorState={this.state.editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    readOnly={true}
                />
                </Row>
            </Grid>
        );
    }
    else {
        return (<div></div>)
    }
}
}

export default Post


