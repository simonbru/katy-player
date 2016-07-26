import '!style!css!bootstrap/dist/css/bootstrap.css'
// No need to import JS bootstrap files since we use bootstrap-react

import React, { Component } from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap'

import HeaderBar from './HeaderBar';
import Player from './Player';
import Playlist from './Playlist';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid>
          <Row>
            <HeaderBar/>
          </Row>
          <Row>
            <Col md={3}>
              <Playlist/>
            </Col>
            <Col md={9}>
              <Player/>
            </Col>
          </Row>
        </Grid>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
