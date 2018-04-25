import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import logo from './weeve.png';
import './App.css';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Header from './Header';
import Main from './Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';


class App extends Component {
  
  constructor(props) {
    
    super(props);

  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <img  src={logo} alt="weeve"/>
          <Header />
          <Main />


        </div>
      </MuiThemeProvider>

    )
  }
}


export default App;

