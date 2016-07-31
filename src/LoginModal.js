import React, {Component} from 'react'
import {Button, ControlLabel, FormGroup, Modal,
        ProgressBar, Radio} from 'react-bootstrap'


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
        const {questions, onClose, onSuccess} = this.props;
        const {userChoices} = this.state;
        if (questions.every( (question, i) => userChoices[i] === question.answer )) {
            onSuccess();
        }
        onClose();
    }

    render() {
        const {questions, active} = this.props;
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
            yield (<FakeProgress>
                <Button bsStyle="danger" onClick={handleHide}>Close</Button>
            </FakeProgress>);
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


function Question({text, errorText, choices, checked, answer, onChange}) {
    let validationState = null;
    if (checked === answer)
        validationState = 'success';
    else if (checked !== undefined)
        validationState = 'error';

    const radios = choices.map(
        (choice, i) => <Radio
            key={i}
            value={i}
            checked={i === checked}
            onChange={evt => onChange(i, evt)}
            >{choice}</Radio>
    );

    return <FormGroup validationState={validationState}>
        <ControlLabel>{text}</ControlLabel>
        {radios}
        {validationState === 'error' && <ControlLabel>{errorText}</ControlLabel>}
    </FormGroup>;
}


class FakeProgress extends Component {
    state = {
        progress: 0
    }

    componentDidMount() {
        this._interval = setInterval(() => {
            let {progress} = this.state;
            progress += (progress > 35) ? 15 : 5;
            this.setState({ progress: progress });
        }, 100);
    }

    componentWillUnmount() {
        if (this._interval)
            clearInterval(this._interval);
    }

    render() {
        const {progress} = this.state;
        const {children} = this.props;

        if (progress < 100) {
            return <div>
                <ProgressBar active bsStyle="danger" now={progress} />
                <h5 style={{textAlign: 'center'}} >Validating answers...</h5>
            </div>;
        } else {
            return <div>
                <ProgressBar striped bsStyle="success" now={100} />
                <h4 style={{textAlign: 'center'}} >Success!</h4>
                {React.Children.toArray(children)}
            </div>
        }
    }
}
