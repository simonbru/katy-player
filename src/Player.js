import React, {Component} from 'react'
import {ResponsiveEmbed} from 'react-bootstrap'


export default class Player extends Component {
    state = {
        videoHotlink: null
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.videoId !== this.props.videoId)
            this.setState({videoHotlink: null});
    }

    componentDidUpdate(prevProps) {
        const {videoId} = this.props;
        const {videoHotlink} = this.state;

        if (!videoHotlink) {
            getVideoInfo(videoId)
            .then(data => this.setState({
                videoHotlink: data.url
            }));
        }
    }
    componentDidMount = this.componentDidUpdate

    render() {
        const {videoId} = this.props;
        const {videoHotlink} = this.state;

        const video = <ResponsiveEmbed a16by9>
            <video autoPlay controls>
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
