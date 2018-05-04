import React, {Component} from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, Blocks, Data,convertToRaw,convertFromRaw } from 'draft-js';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { RichUtils } from 'draft-js';
import request from 'superagent';
import { WithContext as ReactTags } from 'react-tag-input';
import './static/css/Editor.css';
import {Button, Icon, Chip, Input, Autocomplete} from 'react-materialize'
import update from 'react-addons-update'; // ES6

var URL="http://weeve-api.cornell.tech"

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
            title: null,
            users:[],
            possibleUsers:{},
            possibleUsersFullDetail: {},
            collaborators:[],
            tags: [],
            suggestions: [
                { id: 'AWS', text: 'AWS' },
                { id: 'Meeting', text: 'Meeting' },
                { id: 'Task', text: 'Task' },
                { id: 'Costa Rica', text: 'Costa Rica' },
                { id: 'Sri Lanka', text: 'Sri Lanka' },
                { id: 'Thailand', text: 'Thailand' }
             ],
             editorState: EditorState.createEmpty()
        }
        const content = window.localStorage.getItem('content');

        if (content) {
            this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
        } else {
            this.state.editorState = EditorState.createEmpty();
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteUsers = this.handleDeleteUsers.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.renderUser= this.renderUser.bind(this);
        this.addTags= this.addTags.bind(this);
    }

    componentDidMount = () => {
        this.getUserList();
    }

    save(){
        for (var x in this.state.users) {
            this.state.collaborators.push(this.state.users[x].userId)
        }

        console.log("ES",this.state.editorState)

        const contentState= this.state.editorState.getCurrentContent();

        var TOKEN = localStorage.getItem("tokenID");
        localStorage.setItem("data", JSON.stringify(this.state.data));
        localStorage.setItem("hash", this.hash);
        var sendingData = {}
        sendingData["collaborators"]= this.state.collaborators
        sendingData["title"]=this.state.title
        // sendingData["explicit_tags"]= this.state.tags
        sendingData["explicit_tags"] = this.state.tags.map((tag)=>{return tag["text"]})
        sendingData["body"]= JSON.stringify(convertToRaw(contentState))
        console.log(sendingData)
        fetch(URL+'/post/', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "bearer " + TOKEN,
            },
            body: JSON.stringify(sendingData)
    })
}
    handleDeleteUsers(user) {
            const { users } = this.state;
            this.setState({
             users: users.filter((state_user) => state_user !== user),
            });
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

    User(user){
      return(
        <Col onClick={() =>{this.handleDeleteUsers(user)}} s={4}>
          <Chip >
            <img src={require(""+user.pic+"")}  alt='Zen Yui Pic' />
            {user.name}
          </Chip>
        </Col>
  )
    }

    renderUser= ()=> {
        return this.state.users.map((item,i)=>{
            return this.User(item)
        })
    }

    addTags(){
       const { tags, suggestions } = this.state;
       return (
       <div className="row margin-top">
            <div className="col-sm-offset-10 col-sm-1">
                <div className="addTags">
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
    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          var newArray = this.state.users.slice();

          newArray.push({"name":e.target.value ,"pic":"./Pictures/user.png", "userId": "1"}); //hardcoded. need to remove.
          this.setState({users:newArray})
          e.target.value = "";
        }
    }

    // _handleKeyPress = (e) => {
    //     if (e.key === 'Enter') {
    //         var newArray = this.state.users.slice();
    //         var userInfo = null;
    //         for (var i = 0; i < this.state.possibleUsersFullDetail.length; i++) {
    //             if ( this.state.possibleUsersFullDetail[i]['username'] == 'e.target.value')
    //             {
    //                 this.state.possibleUsersFullDetail[i]['picture'] ="./Pictures/user.png"
    //                 userInfo = this.state.possibleUsersFullDetail[i]
    //             }

    //         }
    //       newArray.push(userInfo); //hardcoded. need to remove.
    //       this.setState({users:newArray})
    //       e.target.value = "";
    //     }
    // }
    _handleChange = event => {
        this.setState({
        [event.target.id]: event.target.value
        });
    }

    getUserList = event => {
        var TOKEN = localStorage.getItem("tokenID");

        fetch(URL+'/user/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "bearer " + TOKEN,
        },
        body: JSON.stringify()
        }).then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then(data => {
        var temp = {};

        for (var i = 0; i < data['users'].length; i++) {
            temp[data['users'][i]['username']] =null;
            this.setState({possibleUsers: temp});
            this.setState({possibleUsersFullDetail:data})


        }
        console.log("user list", data)
        })
    }
    onEditorStateChange = (editorState) => {
        const contentState= editorState.getCurrentContent();

        this.saveContent(contentState)
        this.setState({
          editorState,
        });
      }

    saveContent = (content) => {
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
    }

    render() {
        const {data, view, saved} = this.state;
        const { editorState } = this.state;
        const { users } = this.state.possibleUsers;


        return (
            <Grid>
                <div className="flex-container">
                    {this.renderSide()}

                    <Row>
                        <Input id="title" type="search" label="What is the title?" s={12} onChange={this._handleChange} />
                    </Row>
                    <Row>
                        <Autocomplete
                            onKeyDown={this._handleKeyPress}
                            title='Add Collaborator'
                            data={
                                this.state.possibleUsers
                            }
                            value=""
                        />
                    </Row>
                    <Row>
                      {this.renderUser()}
                    </Row>
                    <div className="container-content" style={{display: view==='json' ? 'block' : 'none'}}>
                        <pre style={{whiteSpace: 'pre-wrap', width: '750px', margin: 'auto'}}>{JSON.stringify(data, null, 3)}</pre>
                    </div>
                    <div className="container-content" style={{display: view!=='json' ? 'block' : 'none'}}>
                        <div className="TeXEditor-root">
                            <div className="TeXEditor-editor">
                                <Editor
                                        editorState={this.state.editorState}
                                        onEditorStateChange={this.onEditorStateChange}

                                        />
                            </div>
                        </div>
                    </div>
                    <Row className="show-grid">
                    <button className={"button"+(view==='json'?' active':'')} onClick={()=>this.setState({view: 'json'})}>
                        See JSON
                    </button>
                    <button className={"button"+(view==='edit'?' active':'')} onClick={()=>this.setState({view: 'edit'})}>
                        See Editor
                    </button>
                    <Col xs={1} xsOffset={8}>
                      <Button waves="light" onClick={() =>{this.save() }}>
                          {saved ? 'Saved!' : 'Save'}
                      </Button>
                    </Col>

                    <Button waves="light" onClick={(v)=>this.setState({data:null})}>
                        Clear
                    </Button>
                    </Row>
                </div>
            </Grid>

        );
    }
  }




export default KnowledgeEditor
