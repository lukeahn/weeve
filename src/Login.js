import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


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
        
        fetch('http://localhost:8080/auth/login', {
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
        // you can access your data here
            console.log(tokenID["token"])
        // save it to the local storage
            localStorage.setItem("tokenID", tokenID["token"]);
        // console.log(response.status);
        // console.log(response.json())
        })
    }   

render() {
    const { email, password } = this.state;
    const enabled =
          email.length > 0 &&
          password.length > 0;

    return (
        <div>
            <h1>Please Log In</h1>
                <TextField id="email" hintText="ID" value={this.state.email} onChange={this.handleChange}/><br />
                <TextField id="password" hintText="Password" value={this.state.password} onChange={this.handleChange}/><br />
                <RaisedButton label="Log In" style={style} disabled={!enabled} onClick={()=>{this.handleLogin() }}/>
                
        </div>
    );
}
}


export default Login