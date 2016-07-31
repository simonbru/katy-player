import 'babel-polyfill'
import '!style!css!bootstrap/dist/css/bootstrap.css'
// No need to import JS bootstrap files since we use bootstrap-react

import React, { Component } from 'react';
import {Col, Grid, Row} from 'react-bootstrap'

import AdWrapper from './AdWrapper';
import HeaderBar from './HeaderBar';
import LoginModal from './LoginModal';
import Player from './Player';
import Playlist from './Playlist';
import videos from '../data/playlist.json'
import questions from '../data/questions.json'
import {randomPick} from './utils'

import './App.css';


class App extends Component {

  state = {
    videoPlaying: null,
    youtubeRED: false,
    repeat: false,
    shuffle: false,
    showLoginModal: false,
  }

  render() {
    const {showLoginModal, repeat, shuffle, videoPlaying, youtubeRED} = this.state;
    const VideoPlayer = youtubeRED ? Player : AdWrapper;

    const toggleState = (key) => {
      return () => this.setState({
        [key]: !this.state[key]
      });
    };

    return (
      <div className="App">
        <Grid fluid>
          <Row className="App-headerbar">
            <HeaderBar
              repeat={repeat}
              shuffle={shuffle}
              youtubeRED={youtubeRED}
              onToggleRepeat={toggleState('repeat')}
              onToggleShuffle={toggleState('shuffle')}
              onREDTrigger={this.onREDTrigger.bind(this)}
              />
          </Row>
          <Row>
            <Col sm={9} smPush={3} className="App-player">
              {videoPlaying && <VideoPlayer
                  key={videoPlaying}
                  videoId={videoPlaying}
                  loop={repeat}
                  onEnded={this.onVideoEnded.bind(this)}
                  />}
              {/* Note: define 'key' attribute to force-remount the component */}
            </Col>
            <Col sm={3} smPull={9} className="App-playlist">
              <Playlist
                playlist={videos}
                videoPlaying={videoPlaying}
                onSelect={this.onVideoSelect.bind(this)}
                />
            </Col>
          </Row>
        </Grid>
        <LoginModal
          questions={questions}
          active={showLoginModal}
          onClose={this.onLoginModalClose.bind(this)}
          onSuccess={this.onLoginSuccess.bind(this)}
          />
      </div>
    );
  }

  onVideoSelect(videoId) {
    this.setState({videoPlaying: videoId});
  }

  onVideoEnded() {
    const {repeat, shuffle, videoPlaying} = this.state;
    if (repeat) {
      // We already set the loop attribute on video player
      return;
    } else if (shuffle) {
      let nextVid = videoPlaying;
      while (nextVid === videoPlaying)
        nextVid = randomPick(videos)[1];

      this.setState({
        videoPlaying: nextVid
      });
    } else {
      // Play next video in the playlist
      const oldIndex = videos.findIndex( ([, id]) => id === videoPlaying );
      const [, nextVid] = videos[(oldIndex + 1) % videos.length];
      this.setState({
        videoPlaying: nextVid
      });
    }
  }

  onREDTrigger() {
    const update = this.state.youtubeRED
      ? {youtubeRED: false}
      : {showLoginModal: true};

    this.setState(update);
  }

  onLoginModalClose() {
    this.setState({showLoginModal: false});
  }

  onLoginSuccess() {
    this.setState({youtubeRED: true});
  }
}


export default App;
