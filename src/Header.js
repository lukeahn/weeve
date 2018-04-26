import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Slider from 'material-ui/Slider';
import {Button, Grid, Row, Col,Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'; 
import logo from './weeve.png';




class Header extends Component {
  
    constructor(props) {
    
        super(props);
        this.state = {
            component: null,
      
        };
    }



    handleActive(tab) {
        alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
    }

    render() {
        return (
            <Navbar inverse collapseOnSelect>

                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="search">
                            <a href="/"><img style={{height:30, weight:30}} src={logo} alt="weeve"/></a>
                        </NavItem>
                    </Nav>
                    <Nav>
                        <NavItem eventKey={1} href="search">
                            Search
                        </NavItem>
                    </Nav>
                    <Nav>
                        <NavItem eventKey={1} href="editor">
                            Editor
                        </NavItem>
                    </Nav>
                    <Nav>
                        <NavItem eventKey={1} href="#">
                            TBD
                        </NavItem>
                    </Nav>
                    <Nav>
                        <NavItem eventKey={1} href="#">
                            TBD
                        </NavItem>
                    </Nav>

                    <Nav pullRight>
                        <NavItem eventKey={1} href="profile">
                            Profile 
                        </NavItem>
                    </Nav>

                    <Nav pullRight>
                        <NavItem eventKey={1} href="login">
                            Login
                        </NavItem>
                    </Nav>

                    <Nav pullRight>
                        <NavItem eventKey={1} href="signup">
                            Signup
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            // <Grid style={{paddingBottom:50}}>
            //     <Row style={{backgroundColor: '#C9C5C5'}}>
            //         <Col md={2}>
            //             <Link to='/search'> <Button bsSize="large"> Search </Button></Link>
            //         </Col>
            //         <Col md={2}>
            //             <Link to='/editor'> <Button bsSize="large"> Editor </Button> </Link>
            //         </Col>
            //         <Col md={2}>
            //             <Button  bsSize="large"> TBD </Button>
            //         </Col>
                    
            //         <Col md={2}>
            //             <Link to='/login'> <Button bsSize="large"> Login </Button> </Link>
            //         </Col>
            //         <Col md={2}>
            //             <Link to='/signup'> <Button bsSize="large"> Signup </Button> </Link>
            //         </Col>

            //         <Col md={2}>
            //             <img style={{height:30, weight:30}} src={logo} alt="weeve"/>
            //         </Col>
            //     </Row>
                
            // </Grid>
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
