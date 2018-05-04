import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {button, Grid, Row, Col} from 'react-bootstrap';
var URL="http://weeve-api.cornell.tech"
const style = {
    margin: 12,
  };

class Login extends Component {

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

    handleLogin = event => {
        // event.preventDefault();

        fetch(URL+'/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            // username: 'user_1@cornell.edu',
            // password: 'password',
            username: this.state.email,
            password: this.state.password,
        })
        }).then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then(tokenID => {
            console.log(tokenID["token"])
            localStorage.setItem("tokenID", tokenID["token"]);
            this.props.history.push("/editor");
        })
    }

render() {
    const { email, password } = this.state;
    const enabled =
          email.length > 0 &&
          password.length > 0;

    return (
        <div style={{textAlign: 'center'}} >
            <TextField id="email" hintText="ID" value={this.state.email} onChange={this.handleChange}/><br />
            <TextField id="password" type="password" hintText="Password" value={this.state.password} onChange={this.handleChange}/><br />
            <RaisedButton label="Log In" style={style} disabled={!enabled} onClick={()=>{this.handleLogin() }}/>
        </div>
    );
}
}


export default Login
