import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {button, Grid, Row, Col} from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import {Autocomplete,Button, Icon, Chip, Input} from 'react-materialize'

var URL="http://weeve-api.cornell.tech"

const style = {
margin: 12,
  };

class Signup extends Component {

    constructor(props) {

        super(props);

        this.state = {
        email: "",
        password: ""
        };

    }

    handleChange = event => {
        this.setState({
        [event.target.id]: event.target.value
        });
    }

    handleSignup = event => {
        // event.preventDefault();

        fetch(URL+'/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({

            username: this.state.email,
            password: this.state.password,
        })
      }).then(this.props.history.push("/login"));
    }

render() {
    const { email, password } = this.state;
    const enabled =
          email.length > 0 &&
          password.length > 0;

    return (
      <Grid>
          <Row>
             <Col  xsOffset={4} xs={4} className="title_font" >
              <h2>Create your Weeve Account</h2>
            </Col>
          </Row>
          <Row>
            <Col  xsOffset={4} xs={4} className="title_font" >
              <TextField id="email" hintText="ID" value={this.state.email} onChange={this.handleChange}/><br />
            </Col>
          </Row>
          <Row>
            <Col  xsOffset={4} xs={4} className="title_font" >
              <TextField id="password" type="password" hintText="Password" value={this.state.password} onChange={this.handleChange}/><br />
            </Col>
          </Row>
          <Row>
          <Col  xsOffset={5} xs={4} className="title_font" >
            <Button label="Sign Up" disabled={!enabled}  onClick={()=>{this.handleSignup()} } waves='light'>Sign Up</Button>
          </Col>
          </Row>
    </Grid>


    );
}
}


export default Signup
