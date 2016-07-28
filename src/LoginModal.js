import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap'

export default class LoginModal extends Component {
    render() {
        const {active, onClose, onSuccess} = this.props;
        return <Modal show={active} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Account Verification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Please answer the following questions</h4>
                <Button onClick={onSuccess}>
                    Accept
                </Button>
            </Modal.Body>

        </Modal>;
    }
}
