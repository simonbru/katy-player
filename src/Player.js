import React, {Component} from 'react'
import {ResponsiveEmbed} from 'react-bootstrap'

import {getVideoInfo} from './utils'

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
        const {videoId, loop, poster, onCanPlay, onEnded} = this.props;
        const {videoHotlink} = this.state;

        const video = <ResponsiveEmbed a16by9>
            <video autoPlay controls loop={loop} poster={poster}
                    onCanPlay={onCanPlay} onEnded={onEnded}>
                {videoHotlink && <source src={videoHotlink}/>}
            </video>
        </ResponsiveEmbed>;

        return <div>
            <p>Playing video: {videoId}</p>
            {video}
        </div>;
    }
}
