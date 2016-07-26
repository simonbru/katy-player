import React, {Component} from 'react'
import {Col, ListGroup, ListGroupItem} from 'react-bootstrap'

const playlist = [
    ['Roar', 'https://www.youtube.com/watch?v=CevxZvSJLk8'],
    ['Dark Horse', 'https://www.youtube.com/watch?v=0KSOMA3QBU0'],
    ['This Is How We Do', 'https://www.youtube.com/watch?v=7RMQksXpQSk'],
];

export default class Playlist extends Component {
    render() {
        return <ListGroup>
            {playlist.map( ([title, url]) => <VideoEntry title={title} url={url}/> )}
        </ListGroup>;
    }
}

function VideoEntry({title, url, isSelected}) {
    return <ListGroupItem href={url} active={isSelected}>
        {title}
    </ListGroupItem>;
}
