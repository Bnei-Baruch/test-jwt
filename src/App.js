import React, { Component, Fragment } from 'react';
import 'semantic-ui-css/semantic.min.css';
import JwtClient from "./TestApp/JwtClient";
// import DemuxFiles from "./TestApp/DemuxFiles";
// import MqttClient from "./TestApp/MqttClient";

class App extends Component {

  state = {};

  render() {
    return (
        <Fragment>
          <JwtClient/>
          {/*<DemuxFiles />*/}
          {/*  <MqttClient />*/}
        </Fragment>
    );
  }
}

export default App;
