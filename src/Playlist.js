import React, {Component} from 'react'
import {Image, ListGroup, ListGroupItem} from 'react-bootstrap'


const playlist = [
    ['Roar', 'CevxZvSJLk8'],
    ['Dark Horse', '0KSOMA3QBU0'],
    ['This Is How We Do', '7RMQksXpQSk'],
];


export default class Playlist extends Component {
    render() {
        const {onSelect, videoPlaying} = this.props;

        const entries = playlist.map( ([title, videoId]) =>
            <VideoEntry
                key={videoId}
                title={title}
                videoId={videoId}
                onClick={onSelect}
                selected={videoPlaying === videoId}
                />
        );

        return <ListGroup>
            {entries}
        </ListGroup>;
    }
}


function VideoEntry({videoId, title, onClick, selected}) {
    function clickHandler(evt) {
        onClick(videoId, evt);
        evt.preventDefault();
    }

    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const thumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

    return <ListGroupItem href={url} active={selected} onClick={clickHandler}>
        <Image src={thumbnail} responsive />
        {title}
    </ListGroupItem>;
}
