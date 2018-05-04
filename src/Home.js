import React from 'react'
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {Button, Icon, Chip, Input} from 'react-materialize'
var localURL="http://localhost:3000"
const Home = () => (
    <Grid>
        <h1>Welcome to Weeve</h1>
        <Row>
        <Col sm={12} align="center">
          <a href="http://localhost:3000/login/"><Button waves='light'>Log In</Button></a>
        </Col>
        </Row>
        <Row>
        <Col sm={12} align="center">
          <a href="http://localhost:3000/signup/"><Button waves='light'>SignUp</Button></a>
        </Col>
      </Row>
    </Grid>
)

export default Home
