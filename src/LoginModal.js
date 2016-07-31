import React, {Component} from 'react'
import {Button, ControlLabel, FormGroup, Modal, Radio} from 'react-bootstrap'


export default class LoginModal extends Component {
    state = {
        userChoices: {},
    }

    handleChange(questionIndex, choiceIndex) {
        const {userChoices} = this.state;
        this.setState({
            userChoices: {...userChoices, [questionIndex]: choiceIndex}
        });
    }

    render() {
        const {questions, active, onClose, onSuccess} = this.props;
        const {userChoices} = this.state;

        const questionsElems = questions.map(
            (question, i) => (<Question
                {...question}
                checked={userChoices[i]}
                key={i}
                onChange={choiceIndex => this.handleChange(i, choiceIndex)}
                />)
        );

        return <Modal show={active} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Account Verification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Please answer the following questions</h4>
                <form>
                    {questionsElems}
                </form>
                <Button onClick={onSuccess}>
                    Accept
                </Button>
            </Modal.Body>

        </Modal>;
    }
}


function Question({text, choices, checked, answer, onChange}) {
    const radios = choices.map(
        (choice, i) => <Radio
            key={i}
            value={i}
            checked={i === checked}
            onChange={evt => onChange(i, evt)}
            >{choice}</Radio>
    );

    return <FormGroup>
        <ControlLabel>{text}</ControlLabel>
        {radios}
    </FormGroup>;
}
