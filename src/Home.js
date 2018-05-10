import React from 'react'
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {Button, Icon, Chip, Input, Modal} from 'react-materialize'
import "./index.css"
var URL="http://weeve.cornell.tech"

export default class Home extends React.Component{

  handleClick = event => {
      // event.preventDefault();
      this.props.history.push("/signup");
  }
  render(){
    return (
      <Grid>
        <Row>
          <Col  xsOffset={4} xs={6} align="middle">
            <div class="title_font" align="middle">Welcome to Weeve</div>
          </Col>
        </Row>
          <Row className="margin-top">
            <Col xsOffset={1} sm={5} className="title_font">
              <h3>Weeve is a knowledge tool leveraging semantic databases that empower teams to express and query their ideas without compromising creativity.</h3>
              <Row >
                <Col xsOffset={0} sm={3} className="title_font" >
                  <Button onClick={()=>{this.handleClick()}} waves='light'>Let's Get Started</Button>
                </Col>
                <Col xsOffset={1} sm={3} className="title_font" >
                  <a href="mailto:mb2589@cornell.edu"><Button  waves='light'>Share with us your Impressions</Button></a>
                </Col>
              </Row>
            </Col>
          <Col xsOffset={1} sm={3} >
            <img src="https://cdn.dribbble.com/users/410036/screenshots/2128761/concept2.gif" height="260"  alt='Icon' />
        </Col>
        </Row>
        <Row>
          <Col xsOffset={1} sm={10} className="title_font">
            <h3>Weeve empowers teams to create a knowledge database on the fly, leverage each other’s knowledge and domain expertise, all while staying in sync. With weeve, we envision an entirely new workplace environment and platform where: </h3>
          </Col>
        </Row>
        <Row>
        <Col xsOffset={1} sm={3} >
          <img src="http://jbjtmarketers.org/wp-content/uploads/2016/07/booklet.gif" height="170"  alt='Icon' />
        </Col>
        <Col xsOffset={1} sm={3} className="margin-top-neg">
          <img src="https://media.giphy.com/media/3o7btSmfUYgXNCuCCA/giphy.gif" height="230"  alt='Icon' />
        </Col>
        <Col xsOffset={1} sm={3}>
          <img src="http://www.pepcreations.com/wp-content/uploads/2017/07/2D-Flash-animation-services.gif" height="170"  alt='Icon' />
        </Col>
      </Row>
      <Row className="title_font margin-bottom">
      <Col xsOffset={1} sm={3}>
        <h3>File systems don’t exist. There can and should be many paths to a document AND anyone should be able to easily search using simple tags and keywords.</h3>
      </Col>
      <Col xsOffset={1} sm={3} >
        <h3>Secondly, team members are not stuck reinventing the wheel. They leverage each other’s knowledge and work, which creates a more productive and collaborative environment. </h3>
      </Col>
      <Col xsOffset={1} sm={3}>
        <h3>Lastly, you can effortlessly find the internal expert on a topic, saving you time and energy. </h3>
      </Col>
    </Row>
      </Grid>
  )}
}
