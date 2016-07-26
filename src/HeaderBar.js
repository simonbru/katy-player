import React, {Component} from 'react'
import {Checkbox, Col} from 'react-bootstrap'

export default class HeaderBar extends Component {
    render() {
        const {youtubeRED, onREDTrigger} = this.props;

        return <div>
            <Col sm={9}>
                <h1>Katy Player</h1>
            </Col>
            <Col sm={3}>
                <Checkbox checked={youtubeRED} onClick={onREDTrigger}>
                    Youtube RED
                </Checkbox>
            </Col>
        </div>;
    }
}
