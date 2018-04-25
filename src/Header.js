import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';

// The Header creates links that can be used to navigate
// between routes.


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

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
      <header>
        <br />
        <br />
        <Tabs>
          <Tab component={"Editor"} label="Editor" >
            <div>
            </div>
          </Tab>
          <Tab label="Search" >
            <div>
            </div>
          </Tab>

          <Tab label="Log In" >
            <div>
            </div>
          </Tab>

          <Tab label="Sign Up" >
            <div>
            </div>
          </Tab>
      </Tabs>


        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/editor'>Editor</Link></li>
          </ul>
        </nav>
        
  </header>
    )
  }
}

export default Header
