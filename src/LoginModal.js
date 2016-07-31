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

    handleHide() {
        const {questions, onClose} = this.props;
        const {userChoices} = this.state;
        if (questions.every( (question, i) => userChoices[i] === question.answer )) {
            this.props.onSuccess();
        }
        onClose();
    }

    render() {
        const {questions, active, onClose, onSuccess} = this.props;
        const {userChoices} = this.state;
        const handleHide = this.handleHide.bind(this);
        const $this = this;

        function *questionsSequence() {
            // Each question must be answered right for the next element to appear
            for (let i=0; i<questions.length; i++) {
                yield (<Question
                    {...questions[i]}
                    checked={userChoices[i]}
                    key={i}
                    onChange={choiceIndex => $this.handleChange(i, choiceIndex)}
                    />);
                if (userChoices[i] !== questions[i].answer)
                    return;
            }
            yield (<div>
                <p>Success! Enjoy</p>
                <Button bsStyle="primary" onClick={handleHide}>Close</Button>
            </div>);
        }

        return <Modal show={active} onHide={handleHide}>
            <Modal.Header closeButton>
                <Modal.Title>Account Verification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Please answer the following questions</h4>
                <form>
                    {Array.from(questionsSequence())}
                </form>
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
