import React, {Component} from 'react'
import {ResponsiveEmbed} from 'react-bootstrap'

import config from '../config.json'

export default class Player extends Component {
    state = {
        videoHotlink: null
    }

    componentDidMount() {
        const {videoId} = this.props;

        getVideoInfo(videoId)
        .then(data => this.setState({
            videoHotlink: data.url
        }));
    }

    render() {
        const {videoId, poster, onCanPlay} = this.props;
        const {videoHotlink} = this.state;

        const video = <ResponsiveEmbed a16by9>
            <video autoPlay controls poster={poster} onCanPlay={onCanPlay}>
                {videoHotlink && <source src={videoHotlink}/>}
            </video>
        </ResponsiveEmbed>;

        return <div>
            <p>Playing video: {videoId}</p>
            {video}
        </div>;
    }
}


function getVideoInfo(videoId) {
    return fetch(`${config.bridgeServerURL}/info/${videoId}`)
    .then(response => response.json())
}
