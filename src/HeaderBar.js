import React, {Component} from 'react'
import {Checkbox, Col} from 'react-bootstrap'

export default class HeaderBar extends Component {
    render() {
        return <div>
            <Col sm={9}>
                <h1>Katy Player</h1>
            </Col>
            <Col sm={3}>
                <Checkbox>
                    Youtube RED
                </Checkbox>
            </Col>
        </div>;
    }
}
