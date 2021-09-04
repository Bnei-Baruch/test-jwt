import React, { Component, Fragment } from 'react';
import 'semantic-ui-css/semantic.min.css';
import JwtClient from "./TestApp/JwtClient";
import DemuxFiles from "./TestApp/DemuxFiles";

class App extends Component {

  state = {};

  render() {

    return (
        <Fragment>
          {/*<JwtClient/>*/}
            <DemuxFiles />
        </Fragment>
    );
  }
}

export default App;
