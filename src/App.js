import React, { Component, Fragment } from 'react';
import 'semantic-ui-css/semantic.min.css';
import JwtClient from "./TestApp/JwtClient";

class App extends Component {

  state = {};

  render() {

    return (
        <Fragment>
          <JwtClient/>
        </Fragment>
    );
  }
}

export default App;
