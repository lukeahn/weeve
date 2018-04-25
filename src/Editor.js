import React, {Component} from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditorComponent = () => <Editor />


class KnowledgeEditor extends Component {
  
    constructor(props) {
      
      super(props);
      this.state = {
        editorState: EditorState.createEmpty(),
        
      };
    }
  
    onEditorStateChange: Function = (editorState) => {
      this.setState({
        editorState,
      });
    };
  
    render() {
      const { editorState } = this.state;
      return (
        <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={this.onEditorStateChange}
        />
      )
    }
  }

  


export default KnowledgeEditor
