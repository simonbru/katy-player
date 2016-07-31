import React, {Component} from 'react'
// import {ResponsiveEmbed} from 'react-bootstrap'

import Player from './Player'
import {randomPick} from './utils'

import './AdWrapper.css'

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

    render() {
        // eslint-disable-next-line
        let {skipTime, ...videoProps} = this.props;
        const {timeLeft, advertId, adSkipped} = this.state;
        let skipButton = null;
        const poster = `https://i.ytimg.com/vi/${this.props.videoId}/maxresdefault.jpg`;

        if (!adSkipped) {
            Object.assign(videoProps, {
                videoId: advertId,
                onCanPlay: this.onCanPlay.bind(this),
                key: advertId
            });

            skipButton = <SkipButton
                timeLeft={timeLeft}
                onSkip={this.onSkip.bind(this)}
                />;
        }

        return <div className="AdWrapper">
            <Player {...videoProps} poster={poster} />
            {skipButton}
        </div>;
    }

    componentWillUnmount() {
        this._isUnmounted = true;
    }

    onSkip() {
        this.setState({adSkipped: true});
    }

    onCanPlay(evt) {
        // Start decrementing skip-time counter
        const $this = this;

        function decrement() {
            const timeLeft = $this.state.timeLeft - 1;
            $this.setState({timeLeft});

            if (timeLeft > 0 && !$this._isUnmounted) {
                setTimeout(decrement, 1000);
            }
        };
        setTimeout(decrement, 1000);
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
