import React, {Component} from 'react'
// import {ResponsiveEmbed} from 'react-bootstrap'

import Player from './Player'


export default class AdWrapper extends Component {

    static defaultProps = {
        skipTime: 5,
    }

    state = {
        timeLeft: this.props.skipTime,
        adSkipped: false,
        advertId: 'QmaNSESs_bw',
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.videoId !== this.props.videoId)
            this.setState({
                timeLeft: this.props.skipTime,
                adSkipped: false
            });
    }

    componentDidMount() {
        this.forceUpdate();
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
        const playerProps = {videoId, ...otherProps};

        let skipButton = null;
        if (!adSkipped) {
            skipButton = <SkipButton
                timeLeft={timeLeft}
                onSkip={this.onSkip.bind(this)}
                />;
        }

        return <div>
            <Player {...playerProps} />
            {skipButton}
        </div>;
    }

    onSkip() {
        this.setState({adSkipped: true});
    }
}


function SkipButton({timeLeft, onSkip}) {
    if (timeLeft > 0)
        return <p>{timeLeft}</p>;
    else
        return <a href="#" onClick={onSkip}>Skip</a>;
}
