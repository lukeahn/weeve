import React, { Component } from 'react';
import './static/css/App.css';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Header from './Header';
import Main from './Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <MuiThemeProvider>
            <div>
                <Header />
                <Main />
            </div>
        </MuiThemeProvider>

    )
  }
}


export default App;

