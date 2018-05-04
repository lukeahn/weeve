import React from 'react'
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {Button, Icon, Chip, Input} from 'react-materialize'
var URL="http://weeve.cornell.tech"
const Home = () => (
    <Grid>
        <h1>Welcome to Weeve</h1>
        <Row>
        <Col sm={12} align="center">
          <a href="http://weeve.cornell.tech/login/"><Button waves='light'>Log In</Button></a>
        </Col>
        </Row>
        <Row>
        <Col sm={12} align="center">
          <a href="http://weeve.cornell.tech/signup/"><Button waves='light'>SignUp</Button></a>
        </Col>
      </Row>
    </Grid>
)

export default Home
