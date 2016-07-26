import React, {Component} from 'react'
import {ResponsiveEmbed} from 'react-bootstrap'


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
        const {videoId, onCanPlay} = this.props;
        const {videoHotlink} = this.state;

        const video = <ResponsiveEmbed a16by9>
            <video autoPlay controls onCanPlay={onCanPlay}>
                <source src={videoHotlink}/>
            </video>
        </ResponsiveEmbed>;

        return <div>
            <p>Playing video: {videoId}</p>
            {videoHotlink ? video : 'Loading...'}
        </div>;
    }
}


function getVideoInfo(videoId) {
    return fetch(`http://localhost:3001/info/${videoId}`)
    .then(response => response.json())
}
