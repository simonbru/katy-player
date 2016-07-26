import React, {Component} from 'react'
import {Col, Image, ListGroup, ListGroupItem} from 'react-bootstrap'


const playlist = [
    ['Roar', 'CevxZvSJLk8'],
    ['Dark Horse', '0KSOMA3QBU0'],
    ['This Is How We Do', '7RMQksXpQSk'],
];


export default class Playlist extends Component {
    render() {
        return <ListGroup>
            {playlist.map( ([title, videoId]) => <VideoEntry title={title} videoId={videoId} /> )}
        </ListGroup>;
    }
}


function VideoEntry({videoId, title, isSelected}) {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const thumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

    return <ListGroupItem href={url} active={isSelected}>
        <Image src={thumbnail} responsive />
        {title}
    </ListGroupItem>;
}
