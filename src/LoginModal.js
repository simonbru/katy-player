import React, {Component} from 'react'
import {Button, ControlLabel, FormGroup, Modal, Radio} from 'react-bootstrap'

const questions = [
    {
        text: "Do you own a Youtube RED account?",
        choices: ['Yes', 'No', 'Maybe?'],
        answer: 0,
    }, {
        text: "Did you answer honestly to the previous question?",
        choices: ['Of course', 'Actually...'],
        answer: 0,
    }, {
        text: "Isn't there any chance that you haven't been feeling dishonest lately?",
        choices: ['Sure', 'Hell no!', "I'm not sure"],
        answer: 2
    },
];

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
        const {active, onClose, onSuccess} = this.props;
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
