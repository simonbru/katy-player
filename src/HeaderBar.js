import React, {Component} from 'react'
import {Button, Col, Glyphicon} from 'react-bootstrap'

export default class HeaderBar extends Component {
    render() {
        const {youtubeRED, onREDTrigger} = this.props;

        return <div>
            <Col sm={9}>
                <h1>Katy Player</h1>
            </Col>
            <Col sm={3}>
                <Button bsStyle="danger" onClick={onREDTrigger}>
                    <Glyphicon glyph={youtubeRED ? 'check' : 'unchecked'} />
                    {' Youtube Red'}
                </Button>
            </Col>
        </div>;
    }
}
