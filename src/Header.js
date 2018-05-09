import React, {Component} from 'react'
import { Link, Redirect,withRouter } from 'react-router-dom'
import Slider from 'material-ui/Slider';
import {Button, Grid, Row, Col,Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import logo from './Pictures/weeve.png';




const NavLogin = withRouter(({ history }) => (
    <div onClick={() => { history.push('/login') }}>
        Login
    </div>
))

const NavSignup = withRouter(({ history }) => (
<div onClick={() => { history.push('/signup') }}>
    Signup
</div>
))

const NavSearch = withRouter(({ history }) => (
    <div onClick={() => { history.push('/search') }}>
        Search
    </div>
))

const NavEditor = withRouter(({ history }) => (
    <div onClick={() => { history.push('/editor') }}>
        Editor
    </div>
))

const NavProfile = withRouter(({ history }) => (
    <div onClick={() => { history.push('/profile') }}>
        Profile
    </div>
))

const NavAboutUs = withRouter(({ history }) => (
    <div onClick={() => { history.push('/team') }}>
        About Us
    </div>
))



class Header extends Component {

    constructor(props) {

        super(props);
        this.state = {
            component: null,
            login: false,
        };
    }



    handleSelect(eventKey) {
    alert(`selected ${eventKey}`);
    }


    render() {
        if (this.state.login === true) {
            return <Redirect push to='/login' />
          }
        else

        return (

            <Navbar inverse collapseOnSelect>

                <Navbar.Collapse>
                    <Nav>
                        <NavItem href="/">
                           <img style={{height:30, weight:30}} src={logo} alt="weeve"/>
                        </NavItem>
                    </Nav>
                    <Nav>
                        <NavItem >
                            <NavSearch />
                        </NavItem>
                    </Nav>
                    <Nav>
                        <NavItem >
                            <NavEditor />
                        </NavItem>
                    </Nav>
                    <Nav>
                        <NavItem >
                            <NavAboutUs />
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem >
                            <NavProfile />
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>

        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
};


export default Header
