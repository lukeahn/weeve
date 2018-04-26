import React, {Component} from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, Blocks, Data } from 'draft-js';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Button, Grid, Row, Col, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'; 
import { RichUtils } from 'draft-js';
import request from 'superagent';
import { WithContext as ReactTags } from 'react-tag-input';
import zen from './zen.jpg';

const EditorComponent = () => <Editor />


class KnowledgeEditor extends Component {
  
    constructor(props) {
        super(props);

        var data = null;
        var Data = null;
        var oldHash = localStorage.getItem("hash");
        var hash = this.hash = function(s){
            return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
        }(JSON.stringify(Data))+'';

        if(data && oldHash === hash){
            try{
                data = JSON.parse(data);
            }
            catch(err){
                data = null;
                console.error(err);
            }
        }
        else{
            data = null;
        }
        this.state = {
            data: data || Data,
            view: 'edit',
            saved: false,
            tags: [
                { id: "Credentials", text: "Credentials" },
                { id: "GCP", text: "GCP" }
             ],
            suggestions: [
                { id: 'AWS', text: 'AWS' },
                { id: 'Meeting', text: 'Meeting' },
                { id: 'Task', text: 'Task' },
                { id: 'Costa Rica', text: 'Costa Rica' },
                { id: 'Sri Lanka', text: 'Sri Lanka' },
                { id: 'Thailand', text: 'Thailand' }
             ]

        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.renderLogo= this.renderLogo.bind(this);
        this.renderUser= this.renderUser.bind(this);
        this.addUsers= this.addUsers.bind(this);
    }
  

    save(){
        console.log("called");
        var TOKEN=localStorage.getItem("tokenID");
        localStorage.setItem("data", JSON.stringify(this.state.data));
        localStorage.setItem("hash", this.hash);
        var sendingData = {}
        sendingData["collaborators"]=[1]
        sendingData["title"]="title"
        sendingData["explicit_tags"]= ["testing","with","marco"]
        sendingData["body"]="this.state.data"

        fetch('http://localhost:8080/post/', {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
            "Authorization": "bearer " + TOKEN,
      
          },
          body: JSON.stringify({
          "title":"luke",
          "body":"body",
          "explicit_tags":["testing","with","luca"],
          "collaborators": [1]
      })
          
        })
    }
    handleDelete(i) {
            const { tags } = this.state;
            this.setState({
             tags: tags.filter((tag, index) => index !== i),
            });
        }

        handleAddition(tag) {
            const { tags } = this.state;
            this.setState({tags: [...tags, ...[tag]] });
        }

        handleDrag(tag, currPos, newPos) {
            const tags = [...this.state.tags];
            const newTags = tags.slice();

            newTags.splice(currPos, 1);
            newTags.splice(newPos, 0, tag);

            // re-render
            this.setState({ tags: newTags });
        }
    upload = (data, success, failed, progress) => {
        console.log(data.formData);
        request.post('/upload')
            .accept('application/json')
            .send(data.formData)
            .on('progress', ({ percent }) => {
                progress(percent);
            })
            .end((err, res) => {
                if (err) {
                    return failed(err);
                }
                success(res.body.files, 'image');
            });
    }

    defaultData = (blockType) => {
        if (blockType === 'block-image') {
            return {
                url: '/whoa.jpg',
            }
        }
        return {};
    }

    renderLogo(){
        return <div className="row, my_text">
               <div className="col-sm-offset-10">
               <div className="avatar"> <img src={zen} style={{height:30, weight:30}} alt="zen"></img></div>
               </div>
               </div>
    }
    renderUser(){       
        const { tags, suggestions } = this.state;
        return(<div className="sidepanel">
        
        <ReactTags tags={tags}
            suggestions={suggestions}
            handleDelete={this.handleDelete}
            handleAddition={this.handleAddition}
            handleDrag={this.handleDrag} />
            <p><img src={zen} style={{height:30, weight:30}} alt="zen"></img> Zen Yui, Data Engineer </p>
        </div>
        )
    }

    addUsers(){
       const { tags, suggestions } = this.state;
       return (
          <div className="row margin-top">
            <div className="col-sm-offset-10 col-sm-1">
             <div className="addUsers">
                             <ReactTags tags={tags}
                                 suggestions={suggestions}
                                 handleDelete={this.handleDelete}
                                 handleAddition={this.handleAddition}
                                 handleDrag={this.handleDrag} />
              </div>
             </div>
            </div>

       )
    }
    
    renderSide(){
       const { tags, suggestions } = this.state;
       return (
           <div className="sidepanel">
                           <ReactTags tags={tags}
                               suggestions={suggestions}
                               handleDelete={this.handleDelete}
                               handleAddition={this.handleAddition}
                               handleDrag={this.handleDrag} />
            </div>

       )
    }
  

    render() {       
        const {data, view, saved} = this.state;
    //   const { editorState } = this.state;
        return (
            <Grid>
                <div className="flex-container">
                
                    {this.renderSide()}
                    {this.renderUser()}
                    <div className="container-content" style={{display: view==='json' ? 'block' : 'none'}}>
                        <pre style={{whiteSpace: 'pre-wrap', width: '750px', margin: 'auto'}}>{JSON.stringify(data, null, 3)}</pre>
                    </div>
                    <div className="container-content" style={{display: view!=='json' ? 'block' : 'none'}}>
                        <div className="TeXEditor-root">
                            <div className="TeXEditor-editor">
                                <Editor onChange={data=>this.setState({data})}
                                        value={data}
                                        blockTypes={Blocks}
                                        cleanupTypes="*"
                                        sidebar={0}
                                        handleDefaultData={this.defaultData}
                                        handleUpload={this.upload}
                                        toolbar={{
                                        disableItems: ['H5'],
                                        textActions: [
                                        {
                                            button: <span>Quote</span>,
                                            label: 'Quote',
                                            active: (block, editorState) => block.get('type') === 'blockquote',
                                            toggle: (block, action, editorState, setEditorState) => setEditorState(RichUtils.toggleBlockType(
                                            editorState,
                                            'blockquote'
                                            )),
                                        }]
                                        }}/>
                            </div>
                        </div>
                    </div>
                    <button className={"button"+(view==='json'?' active':'')} onClick={()=>this.setState({view: 'json'})}>
                        See JSON
                    </button>
                    <button className={"button"+(view==='edit'?' active':'')} onClick={()=>this.setState({view: 'edit'})}>
                        See Editor
                    </button>
                    <button className="button" onClick={() =>{this.save() }}>
                        {saved ? 'Saved!' : 'Save'}
                    </button>
                    <button className="button" onClick={(v)=>this.setState({data:null})}>
                        Clear 
                    </button>
                </div>
            </Grid>
        );
    }
  }

  


export default KnowledgeEditor
