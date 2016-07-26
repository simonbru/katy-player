import React, {Component} from 'react'
// import {ResponsiveEmbed} from 'react-bootstrap'

import './AdWrapper.css'
import Player from './Player'


const adslist = [
    'SzVt6AmoJTA',  // TechSNAP
    't_w5ORP2Ods',  // LAS
    '-_q9fhKttRo',  // BSD Now
    'bGfdZYssBtg',  // Coder Radio
];


export default class AdWrapper extends Component {

    static defaultProps = {
        skipTime: 5,
    }

    state = {
        timeLeft: this.props.skipTime,
        adSkipped: false,
        advertId: randomPick(adslist),
    }

    componentDidMount() {
        const $this = this;

        function decrement() {
            const timeLeft = $this.state.timeLeft - 1;
            $this.setState({timeLeft});

            if (timeLeft > 0) {
                setTimeout(decrement, 1000);
            }
        };
        setTimeout(decrement, 1000);
    }

    render() {
        let {skipTime, videoId, ...otherProps} = this.props;
        const {timeLeft, advertId, adSkipped} = this.state;

        if (!adSkipped)
            videoId = advertId;
        const playerProps = {videoId, key: videoId, ...otherProps};

        let skipButton = null;
        if (!adSkipped) {
            skipButton = <SkipButton
                timeLeft={timeLeft}
                onSkip={this.onSkip.bind(this)}
                />;
        }

        return <div className="AdWrapper">
            <Player {...playerProps} />
            {skipButton}
        </div>;
    }

    onSkip() {
        this.setState({adSkipped: true});
    }
}


function SkipButton({timeLeft, onSkip}) {
    function handleClick(evt) {
        onSkip();
        evt.preventDefault();
    }

    const message = `You can skip to video in ${timeLeft}`;
    return <div className="AdWrapper-SkipButton">
        {timeLeft > 0
            ? <div className="AdWrapper-waitmsg">{message}</div>
            : <a href="#" onClick={handleClick} className="AdWrapper-skipmsg">
                Skip Ad
                <span className="glyphicon glyphicon-step-forward"/>
              </a>
        }
    </div>
}


function randomPick(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}
