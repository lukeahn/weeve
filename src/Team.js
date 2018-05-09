import React from 'react'
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {Button, Icon, Chip, Input} from 'react-materialize'
import "./index.css"
var URL="http://weeve.cornell.tech"

export default class Team extends React.Component{

  handleClick = event => {
      // event.preventDefault();
      this.props.history.push("/signup");
  }
  render(){
    return (
      <Grid>
        <Row>
          <Col  xsOffset={5} xs={6} align="middle">
            <div class="title_font" align="middle">The Team</div>
          </Col>
        </Row>
        <Row>
        <Col xsOffset={1} sm={2} align="middle" >
        <div class="title_font_small" align="middle">Jill Sue</div>
         </Col>
        <Col xsOffset={1} sm={2} align="middle" >
            <div class="title_font_small" align="middle">Luke Ahn</div>
        </Col>
        <Col xsOffset={1} sm={2} align="middle">
          <div class="title_font_small" align="middle">Marco Berlot</div>
        </Col>
        <Col xsOffset={1} sm={2} align="middle">
          <div class="title_font_small" align="middle">Zen Yui</div>
        </Col>
      </Row>
        <Row>
        <Col xsOffset={1} sm={2} >
            <img src={require("./Pictures/jill.png")} height="150"  alt='Icon' />
         </Col>
        <Col xsOffset={1} sm={2} >
          <img src={require("./Pictures/luke.png")} height="150"  alt='Icon' />
        </Col>
        <Col xsOffset={1} sm={2}>
          <img src={require("./Pictures/marco.png")} height="150"  alt='Icon' />
        </Col>
        <Col xsOffset={1} sm={2}>
          <img src={require("./Pictures/zen.jpg")} height="150"  alt='Icon' />
        </Col>
      </Row>
      <Row>
      <Col xsOffset={1} sm={2} align="middle" >
        <a href="https://www.linkedin.com/in/jillian-sue-3032ab91/">  <img src="https://www.shareicon.net/data/128x128/2017/06/28/888033_logo_512x512.png" height="90"  alt='Icon' /></a>
       </Col>
      <Col xsOffset={1} sm={2} align="middle" >
        <a href="https://www.linkedin.com/in/luke-ahn-32b00089/"><img src="https://www.shareicon.net/data/128x128/2017/06/28/888033_logo_512x512.png"height="90"  alt='Icon' /></a>
      </Col>
      <Col xsOffset={1} sm={2} align="middle">
        <a href="https://www.linkedin.com/in/marco-berlot-1a9385117/"><img src="https://www.shareicon.net/data/128x128/2017/06/28/888033_logo_512x512.png" height="90"  alt='Icon' /></a>
      </Col>
      <Col xsOffset={1} sm={2} align="middle">
        <a href="https://www.linkedin.com/in/zenyui/"><img src="https://www.shareicon.net/data/128x128/2017/06/28/888033_logo_512x512.png" height="90"  alt='Icon' /></a>
      </Col>
    </Row>
      </Grid>
  )}
}
