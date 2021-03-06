import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap';
import { Widget, toggleWidget,profileAvatar} from 'react-chat-widget';
import {Autocomplete,Button, Icon, Chip, Input} from 'react-materialize'
import "./static/css/Index.css"
import 'react-chat-widget/lib/styles.css';
import axios from 'axios'
import { browserHistory } from 'react-router';
var TOKEN = localStorage.getItem("tokenID");

var URL="http://weeve-api.cornell.tech"
var dict={}
var obj={}
var jsonAutocomplete
var config = {
  "headers":
    {
      "Authorization": "bearer " + TOKEN,
      "Content-Type":"application/json"
    }
  };
class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            //for retrieval
            posts:[
            ],
            experts:[],
            tags:[],
            checked_tags:new Set(),
            //for searching
            searchKeywords: "",
            searchCollaborators: [],
            collaborator:[],
            suggested_users:[]
        };
      }

        componentDidMount = (event) => {
          axios.get(URL+"/user/",config)
            .then((response)=>{
              this.setState({
                  suggested_users: [...response["data"]["users"]],
              })
              var i;
              for (i = 0; i < response.data.users.length; i++) {
                  dict[response["data"]["users"][i].display_name]=response["data"]["users"][i].user_id
                  obj[response["data"]["users"][i].display_name]="https://cdn3.iconfinder.com/data/icons/business-round-flat-vol-1-1/36/user_account_profile_avatar_person_student_female-256.png"
              }
              console.log(dict)
            });
        }


    handleUpdateKeywords = (keywords) => {

      this.setState({searchKeywords: keywords})
    }
    handleUpdateWriter=(user) =>{
      console.log("test")
      console.log(user)
      console.log(dict[user])
      if(dict[user]==null){
        this.setState({collaborator:[]})
      }else{
      this.setState({collaborator:[dict[user]]})
      }
    }

    handleRequestData = () => {
    //call the 3 APIs to get the list of posts, experts, suggested tags
      console.log(this.state.searchKeywords)
        if(this.state.searchKeywords=="" &&  this.state.collaborator.length==0){
          alert("Please Insert a word in Search ")
          return
        }
        console.log('request data');
        var TOKEN = localStorage.getItem("tokenID");
        console.log(this.state)
        axios.post(URL+'/search/post/', {
            "collaborators": this.state.collaborator,
            "keywords": this.state.searchKeywords
          },
            {"headers":
              {
                "Authorization": "bearer " + TOKEN,
                "Content-Type":"application/json"
              }
            },
          )
          .then( (newPost )=> {

            if(newPost["data"]["posts"].length!=0){
                this.setState({
                    posts: [...newPost["data"]["posts"]],
                    experts:[...newPost["data"]["experts"]],
                    tags:[...newPost["data"]["tags"]]
                })
                console.log("TEST")
                console.log(newPost["data"])
                console.log(this.state)
              }
            else{
              console.log("Null Object")
              this.setState({
                  posts: [],
                  experts:[]
              })
            }
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    handleAddCollaborator = (collborator) => {
    // add collaborator for search
        console.log('add collab');
    }

    handleAddSuggestedTag = (tag) => {
    // add tags to build the search qeury
        console.log('add tag');
    }
    filterTags=(tag)=>{
      console.log("Filter Tags")
    }
    updateTags=(tag)=>(
      console.log("Adding tag")
    )
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
                  <ResultTags results={this.state.tags} filterTag={this.filterTags} updateTags={this.updateTags}/>
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
                <Autocomplete  data={obj}
                  type="search" onChange={event=>{handleUpdateWriter(event.target.value)}} title="Who wrote the post?" s={12} />
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
                post_id={result.post_id}
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

const ResultCard = ({title, upvotes, collaborators, explicit_tags,post_id}) => {

    const addTag = (tag)=>{
      return   <span className="tag-margin"><a href="#">#{tag}</a></span>
    };

    const handleClick=(post_id)=>{
      console.log(post_id)
    }
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
                  <div class="card-content" onClick={handleClick}>
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
const ResultTags= ({results,filterTags,updateTags}) => {
    const renderChildTag=result => (
      <Tags tag={result.tag} filterTags={filterTags} updateTags={updateTags}/>
    )
      return(
        <Col  xsOffset={2} sm={10} >
          <div class="card tags">
            <div class="card-content">
              <span class="card-title">Filter your Tags</span>
            </div>
            <div class="card-action margin-bottom-neg">
              {results.map(renderChildTag)}
            </div>
            <div class="card-action">
            </div>
          </div>
        </Col>
    )
}

const Tags =({filterTag,tag,updateTags})=>{
  return(
    <Input name='group1' handleCheckboxChange={updateTags} type='checkbox' value={tag} label={tag} />
  )
}


export default Search
