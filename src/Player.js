import React, {Component} from 'react'
import {ResponsiveEmbed} from 'react-bootstrap'

import {getVideoInfo} from './utils'
import config from '../config.json'

export default class Player extends Component {
    render() {
        const {videoId, loop, poster, onCanPlay, onEnded} = this.props;
        const videoHotlink = `${config.bridgeServerURL}/dl/${videoId}`;

        const video = <ResponsiveEmbed a16by9>
            <video autoPlay controls loop={loop} poster={poster}
                    onCanPlay={onCanPlay} onEnded={onEnded}>
                <source src={videoHotlink}/>
            </video>
        </ResponsiveEmbed>;

        return <div>
            <p>Playing video: {videoId}</p>
            {video}
        </div>;
    }
}
