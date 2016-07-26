import '!style!css!bootstrap/dist/css/bootstrap.css'
// No need to import JS bootstrap files since we use bootstrap-react

import React, { Component } from 'react';
import {Col, Grid, Row} from 'react-bootstrap'

import HeaderBar from './HeaderBar';
import Player from './Player';
import Playlist from './Playlist';
// import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    videoPlaying: null
  }

  render() {
    const {videoPlaying} = this.state;

    return (
      <div className="App">
        <Grid fluid>
          <Row className="App-headerbar">
            <HeaderBar/>
          </Row>
          <Row>
            <Col sm={9} smPush={3} className="App-player">
              {videoPlaying && <Player videoId={videoPlaying}/>}
            </Col>
            <Col sm={3} smPull={9} className="App-playlist">
              <Playlist videoPlaying={videoPlaying} onSelect={this.onVideoSelect.bind(this)}/>
            </Col>
          </Row>
        </Grid>
        {/*<div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>*/}
      </div>
    );
  }

  onVideoSelect(videoId) {
    this.setState({
      videoPlaying: videoId
    });
  }
}

export default App;
