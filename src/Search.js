import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap';
import { Widget, toggleWidget,profileAvatar} from 'react-chat-widget';
import {Button, Icon, Chip, Input} from 'react-materialize'
import "./static/css/Index.css"
import 'react-chat-widget/lib/styles.css';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //for retrieval
            posts:[
                {"title": "title 1", "upvotes": 1, "collaborators": []},
                {"title": "title 2", "upvotes": 2, "collaborators": [1]}
            ],
            experts:[],
            tags:[],
            //for searching
            searchKeywords: [],
            searchCollaborators: [],
        };

    }

    handleRequestData = () => {
    //call the 3 APIs to get the list of posts, experts, suggested tags
        console.log('request data');

        var newPost = {"title": "title 2", "upvotes": 2, "collaborators": [1]}

        this.setState({
            posts: [...this.state.posts, newPost]
        })
    }

    handleAddCollaborator = (collborator) => {
    // add collaborator for search
        console.log('add collab');
    }

    handleAddSuggestedTag = (tag) => {
    // add tags to build the search qeury
        console.log('add tag');
    }

    render() {
        return (
            <Grid>
                <SearchQuery
                    handleRequestData={this.handleRequestData}
                    handleAddCollaborator={this.handleAddCollaborator}
                    handleAddSuggestedTag={this.handleAddSuggestedTag}
                />
              <Col xs={6} align="middle">
                  <ResultCards results={this.state.posts} />
              </Col>
              <Row>
                  <Experts/>
              </Row>
              <Row>
                  <Tags/>
              </Row>
            </Grid>
        );
    };


}

const SearchQuery = ({handleRequestData, handleAddCollaborator, handleAddSuggestedTag}) => {

    return (
        <div>
            <Row>
                <Input type="search" label="What Are you looking for?" s={12} />
            </Row>
            <Row>
                <Input type="search" label="Who wrote the post?" s={12} />
            </Row>
            <Row>
                <Button waves="light" onClick={handleRequestData}>Search</Button>
            </Row>
        </div>
    )
}

const ResultCards = ({results}) => {
    const renderChildCard = result => (
        <Row>
            <ResultCard
                title={result.title}
                upvotes={result.upvotes}
                collaborators={result.collaborators}
            />
        </Row>
    )
    return (<div>{results.map(renderChildCard)}</div>);
};

const ResultCard = ({title, upvotes, collaborators}) => {
    console.log(title);
    console.log(upvotes);
    console.log(collaborators);
    return (
        <Col sm={12}>
            <div class="card">
                <div class="card-content">
                    <span class="card-title">{title + Date.now().toString()}</span>
                    <a href="#">#Mobile Health</a>
                </div>
                <div class="card-action">
                    <Row>
                        <Col xsOffset={1} xs={2} align="middle">
                            <a href="#"><img src={require("./Pictures/jill.png")} height="42"  alt='Icon' /></a>
                        </Col>
                        <Col xs={1} align="middle">
                            <a href="#"> <img src={require("./Pictures/message.png")} onClick={()=>toggleWidget()} height="42"  alt='Icon' /></a>
                        </Col>
                        <Col xsOffset={2} xs={1} align="middle">
                        {/* <img src={require("./Pictures/star.png")} align="right" height="42" onClick={()=>this.setState({like: this.state.like+1})} alt='Icon'></img> */}
                        </Col>
                        <Col xs={2} align="left">
                            {/* <h3>{this.state.like}</h3> */}
                        </Col>
                    </Row>
                </div>
            </div>
        </Col>
    );
};

class Card extends React.Component {

    handleClick = event => {
        this.setState({
        [event.target.id]: event.target.value
        });
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          console.log(e.target.value)
          var newArray = this.state.users.slice();
          newArray.push({"name":e.target.value ,"pic":"./Pictures/user.png", "userId": "1"}); //hardcoded. need to remove.
          this.setState({users:newArray})
          console.log(this.state)
          this.setState({form: ""});
        }
    }
    _handleChange = event => {
        this.setState({
        [event.target.id]: event.target.value
        });
    }



render() {
    return (
        <Col sm={12}>
            <div class="card">
                <div class="card-content">
                    <span class="card-title">United Health Releases New Mobile Health App</span>
                    <p>I am a very simple card. I am good at containing small bits of information.
                    I am convenient because I require little markup to use effectively.</p>
                    <p><a href="#"> </a> <a href="#">#Mobile Health</a></p>
                </div>
                <div class="card-action">
                    <Row>
                        <Col xsOffset={1} xs={2} align="middle">
                            <a href="#"><img src={require("./Pictures/jill.png")} height="42"  alt='Icon' /></a>
                        </Col>
                        <Col xs={1} align="middle">
                            <a href="#"> <img src={require("./Pictures/message.png")} onClick={()=>toggleWidget()} height="42"  alt='Icon' /></a>
                        </Col>
                        <Col xsOffset={2} xs={1} align="middle">
                        <img src={require("./Pictures/star.png")} align="right" height="42" onClick={()=>this.setState({like: this.state.like+1})} alt='Icon'></img>
                        </Col>
                        <Col xs={2} align="left">
                            <h3>{this.state.like}</h3>
                        </Col>
                    </Row>
                </div>
            </div>
        </Col>
    );
}
}
class ExpertUser extends React.Component{
    render(){
        return(
    <Row>
        <Col xsOffset={1} xs={2} align="middle">
            <a href="#"><img src={require("./Pictures/zen.jpg")} height="42"  alt='Icon' /></a>
        </Col>
        <Col xs={6} align="middle">
            <p><h6>Zen Yui</h6></p>
            <p>Data Engineer</p>
        </Col>
            <Col xsOffset={0} xs={1} align="middle">
            <a href="#"> <img src={require("./Pictures/message.png")} onClick={()=>toggleWidget()} height="42"  alt='Icon' /></a>
        </Col>


    </Row>
  )}
}

class Experts extends React.Component{
    render(){
        return(
        <Col xsOffset={2} sm={10}>
            <div class="card">
                <div class="card-content">
                    <span class="card-title">Experts</span>
                </div>
                <div class="card-action margin-bottom-neg">
                    <ExpertUser/>
                </div>
                <div class="card-action">
                    <Row>
                        <Col xsOffset={1} xs={2} align="middle">
                            <a href="#"><img src={require("./Pictures/user.png")} height="42"  alt='Icon' /></a>
                        </Col>
                        <Col xs={6} align="middle">
                            <p>Luke Ahn</p>
                            <p>Software Engineer</p>
                        </Col>
                        <Col xsOffset={0} xs={1} align="middle">
                            <a href="#"> <img src={require("./Pictures/message.png")} onClick={()=>toggleWidget()} height="42"  alt='Icon' /></a>
                        </Col>
                    </Row>
                </div>
            </div>
      </Col>
    )
  }
}

class Tags extends React.Component{
  render(){
  return(
      <Col  xsOffset={2} sm={10} >
        <div class="card">
          <div class="card-content">
            <span class="card-title">Filter your Tags</span>
          </div>
          <div class="card-action margin-bottom-neg">
             <Input name='group1' type='checkbox' value='PressRelease' label='PressRelease' />
             <Input name='group1' type='checkbox' value='FDA' label='FDA'  className='filled-in' defaultChecked='checked' />
             <Input name='group1' type='checkbox' value='News' label='News' className='filled-in' defaultChecked='checked' />
             <Input name='on' type='date' label="Date" onChange={function(e, value) {}} />
          </div>
          <div class="card-action">
          </div>
        </div>
      </Col>


  )}
}


export default Search
