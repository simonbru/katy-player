import React, {Component} from 'react'
import {Button, ButtonGroup, Glyphicon} from 'react-bootstrap'

export default class HeaderBar extends Component {
    render() {
        const {youtubeRED, shuffle, repeat,
            onToggleRepeat, onToggleShuffle, onREDTrigger} = this.props;

        return <div className="container-fluid">
            <div className="pull-left">
                <h1>Katy Player</h1>
            </div>
            <div className="pull-right">
                <ButtonGroup bsSize="medium" >
                    <ToggleButton icon="repeat" text="Repeat"
                        state={repeat} onClick={onToggleRepeat} />
                    <ToggleButton icon="random" text="Random"
                        state={shuffle} onClick={onToggleShuffle} />
                </ButtonGroup>
                <ToggleButton icon="expand" text="Youtube Red"
                    state={youtubeRED} onClick={onREDTrigger} />
            </div>
        </div>;
    }
}

function ToggleButton({icon, text, state, onClick}) {
    return <Button bsStyle={state ? 'danger' : 'default'} onClick={onClick} >
        <Glyphicon glyph={icon} />&nbsp; {text}
    </Button>;
}
