import React, {Component} from 'react'
import { Link, Redirect,withRouter } from 'react-router-dom'
import Slider from 'material-ui/Slider';
import {SideNav,SideNavItem} from 'react-materialize'
import {Button, Grid, Row, Col,Nav,  NavDropdown, MenuItem,Navbar, NavItem} from 'react-bootstrap';
import logo from './Pictures/weeve.png';
import user_info from './Pictures/user_info.png'




const NavLogin = withRouter(({ history }) => (
    <div onClick={() => { history.push('/login') }}>
        Login
    </div>
))

const NavSignup = withRouter(({ history }) => (
<div onClick={() => {  history.push('/signup') }}>
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

const NavLogOut = withRouter(({ history }) => (
    <div onClick={() => {localStorage.clear();history.push('/home') }}>
        Log Out
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
        if (localStorage.getItem("tokenID") == null) {
            return <Redirect push to='/login' />
          }
        else

        return (

            <Navbar inverse collapseOnSelect>

                <Navbar.Collapse>
                  <Nav>
                    <NavItem >
                        <SideNav
                        trigger={<img style={{height:30, weight:30}} src={user_info} alt="weeve"/>}
                        options={{ closeOnClick: true }}
                        >
                        <SideNavItem userView
                          user={{
                            background: 'http://www.oxygenna.com/wp-content/uploads/2015/11/18.jpg',
                            image: require("./Pictures/jill.png"),
                            name: 'John Doe',
                            email: 'jdandturk@gmail.com'
                          }}
                        />
                        <SideNavItem href='#!icon' icon='cloud'>First Link With Icon</SideNavItem>
                        <SideNavItem href='#!second'>Second Link</SideNavItem>
                        <SideNavItem divider />
                        <SideNavItem subheader>Subheader</SideNavItem>
                        <SideNavItem waves href='#!third'>Third Link With Waves</SideNavItem>
                      </SideNav>
                    </NavItem>
                  </Nav>
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
                    <Nav pullRight>
                        <NavItem >
                            <NavLogOut />
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
