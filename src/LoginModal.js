import React, {Component} from 'react'
import {Button, ControlLabel, FormGroup, Modal, Radio} from 'react-bootstrap'

export default class LoginModal extends Component {
    render() {
        const {active, onClose, onSuccess} = this.props;
        return <Modal show={active} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Account Verification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Please answer the following questions</h4>
                <form>
                    <FormGroup>
                        <ControlLabel>Do you own a Youtube RED account?</ControlLabel>
                        <Radio>Yes</Radio>
                        <Radio>No</Radio>
                        <Radio>Soon...</Radio>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Have you been feeling dishonest lately?</ControlLabel>
                        <Radio>Yes</Radio>
                        <Radio></Radio>
                        <Radio>Soon...</Radio>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Have you been feeling dishonest lately?</ControlLabel>
                        <Radio>Yes</Radio>
                        <Radio>No</Radio>
                        <Radio>Soon...</Radio>
                    </FormGroup>
                </form>
                <Button onClick={onSuccess}>
                    Accept
                </Button>
            </Modal.Body>

        </Modal>;
    }
}
