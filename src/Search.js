import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap';
import { Widget, toggleWidget,profileAvatar} from 'react-chat-widget';
import {Button, Icon, Chip, Input} from 'react-materialize'
import "./index.css"
import 'react-chat-widget/lib/styles.css';
class Card extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        like: 0,
        };

    }

    handleClick = event => {
        this.setState({
        [event.target.id]: event.target.value
        });
    }


render() {
    return (
      <Col sm={6}>
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
      <Col xsOffset={2} sm={4}>
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


class Search extends React.Component {
render(){
  return(
    <Grid>
    <Row>
        <Input type="search" label="What Are you looking for?" s={12} />
    </Row>
          <Row>
          <Card/>
          <Experts/>
          </Row>
          <Row>
          <Card/>
          </Row>
          <Card/>

          <Widget
           profileAvatar="./Pictures/jill.png"
           title="Welcome to Weevechat"
           subtitle="Enjoy your conversations"
          />
    </Grid>
  )
  }
}

export default Search
