import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap';
import { Widget, toggleWidget,profileAvatar} from 'react-chat-widget';
import {Button, Icon, Chip, Input} from 'react-materialize'
import "./static/css/Index.css"
import 'react-chat-widget/lib/styles.css';
import axios from 'axios'

URL="http://localhost:8080"
class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //for retrieval
            posts:[
            ],
            experts:[],
            tags:[],
            //for searching
            searchKeywords: "",
            searchCollaborators: [],
            collaborator:0
        };

    }

    handleUpdateKeywords = (keywords) => {
      this.setState({searchKeywords: keywords})
    }
    handleUpdateWriter=(user) =>{
      this.setState({collaborator:user})
    }

    handleRequestData = () => {
    //call the 3 APIs to get the list of posts, experts, suggested tags
        console.log('request data');
        console.log(this.state.collaborator)
        axios.post(URL+'/search/post/', {
            "collaborators": [this.state.collaborator],
            "keywords": this.state.searchKeywords
          },
            {"headers":
              {
                "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3QudXNlckBlbWFpbC5jb20iLCJpYXQiOjE1MjUzOTQ2NzcsImV4cCI6MTUyNTQ4MTA3N30.szuJW4M-J7gZvyrFTR94S_QX8JAtsO0g1IrOSHw5U30",
                "Content-Type":"application/json"
              }
            },
          )
          .then( (newPost )=> {

            if(newPost["data"]["posts"].length!=0){
                this.setState({
                    posts: [...newPost["data"]["posts"]],
                    experts:[...newPost["data"]["experts"]]
                })
                console.log(newPost["data"]["posts"])
              }
            else{
              console.log("Null Object")
            }
          })
          .catch(function (error) {
            console.log(error);
          });

        var newPost = {"title": "title 2", "upvotes": 2, "collaborators": [1],
                       "title": "title 42", "upvotes": 42, "collaborators": [1]}


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
                    handleUpdateKeywords={this.handleUpdateKeywords}
                    handleUpdateWriter={this.handleUpdateWriter}
                />
              <Col xs={6}>
                  <ResultCards results={this.state.posts} />
              </Col>
              <Row>
                  <ResultExperts results={this.state.experts}/>
              </Row>
              <Row>
                  <Tags/>
              </Row>
            </Grid>
        );
    };


}

const SearchQuery = ({handleRequestData, handleAddCollaborator, handleAddSuggestedTag, handleUpdateKeywords,handleUpdateWriter}) => {

    return (
        <div>
            <Row>
              <Col xs={5}>
                <Input type="search" onChange={event=>{handleUpdateKeywords(event.target.value)}} label="What Are you looking for?"/>
              </Col>
              <Col xs={2} className="search-margin">
                  <Button waves="light"  onClick={handleRequestData}>Search</Button>
              </Col>
              <Col xs={5}>
                <Input type="search" onChange={event=>{handleUpdateWriter(event.target.value)}} label="Who wrote the post?" s={12} />
              </Col>
            </Row>

        </div>
    )
}

const ResultCards = ({results}) => {
    const renderChildCard = result => (
            <ResultCard
                title={result.title}
                upvotes={result.upvotes}
                collaborators={result.collaborators}
                explicit_tags={result.explicit_tags}
            />
    )
    if (results.length==0){
      return (<div><Error/></div>)
    }else{
      return (<div>{results.map(renderChildCard)}</div>);
    }
};

const Error = () => {


    return (
        <div>
            <Row>
            </Row>
            <Row>
            </Row>
          <Col sm={11}>
              <div class="card">
                  <div class="card-content">
                      <Col sm={9} class="card-title">
                        <p>Your search  - did not match any documents. </p>
                        <p>Suggestions:
                          Try different keywords.</p>
                      </Col>
                        <Col  xsOffset={1} xs={2} align="middle">
                          <a href="#"> <img src={require("./Pictures/lens.png")} onClick={()=>toggleWidget()} height="60"  alt='Icon' /></a>
                        </Col>
                  </div>
                  <div class="card-action">
                      <Row>
                          <Col xsOffset={1} xs={3} align="middle">
                          </Col>
                          <Col xs={1} align="middle">
                          </Col>
                      </Row>
                  </div>
              </div>
          </Col>
        </div>
    );
};

const ResultCard = ({title, upvotes, collaborators, explicit_tags}) => {

    const addTag = (tag)=>{
      return   <span className="tag-margin"><a href="#">#{tag}</a></span>
    };


    return (
        <div>
          <Col sm={1} align="center" className="margin-top-small">
            <Row>
               <img src={require("./Pictures/star.png")} align="middle" height="24" onClick={()=>upvotes=upvotes+1} alt='Icon'></img>
            </Row>
            <Row>
                  <h6>{upvotes}</h6>
            </Row>
          </Col>
          <Col sm={11}>
              <div class="card">
                  <div class="card-content">
                      <Col sm={9} class="card-title">
                        {title}
                      </Col>
                        <Col  xsOffset={1} xs={2} align="middle">
                            <a href="#"> <img src={require("./Pictures/bookmark.png")} onClick={()=>toggleWidget()} height="30"  alt='Icon' /></a>
                        </Col>
                  </div>
                  <div class="card-action">
                      <Row>
                          {explicit_tags.map(addTag)}
                          <Col xsOffset={1} xs={3} align="middle">
                              <a href="#"><img src={require("./Pictures/jill.png")} height="30"  alt='Icon' /></a>
                          </Col>
                          <Col xs={1} align="middle">
                              <a href="mailto:zenyui@cornell.edu"> <img src={require("./Pictures/message.png")} onClick={()=>toggleWidget()} height="30"  alt='Icon' /></a>
                          </Col>


                      </Row>
                  </div>
              </div>
          </Col>
        </div>
    );
};


const ResultExperts= ({results}) => {
    const renderChildExpert=result => (
      <ExpertUser
          display_name={result.display_name}
          picture={result.picture}
          post_count={result.post_count}
          user_id={result.user_id}
          username={result.username}
      />
    )
      return(
          <Col xsOffset={2} sm={10}>
              <div class="card">
                  <div class="card-content">
                      <span class="card-title">Experts</span>
                  </div>
                  <div class="card-action margin-bottom-neg">
                      {results.map(renderChildExpert)}
                  </div>
              </div>
        </Col>
    )
}


const ExpertUser = ({display_name, picture, post_count, user_id,username}) => {
    return(
      <Row>
          <Col xsOffset={1} xs={2} align="middle">
              <a href="#"><img src={require("./Pictures/zen.jpg")} height="30"  alt='Icon' /></a>
          </Col>
          <Col xs={6} align="left">
              <h6>{display_name}</h6>
          </Col>
              <Col xsOffset={0} xs={1} align="middle">
              <a href="mailto:zenyui@cornell.edu"> <img src={require("./Pictures/message.png")} onClick={()=>toggleWidget()} height="30"  alt='Icon' /></a>
          </Col>
      </Row>
  )
}


class Tags extends React.Component{
  render(){
  return(
      <Col  xsOffset={2} sm={10} >
        <div class="card tags">
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
