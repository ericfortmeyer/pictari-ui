import React from 'react';

export default class StartButton extends React.PureComponent
{
    render() {
        return this.props.blink && (
          <button
            className="start-button"
            type="button"
            onClick={(e) => this.props.onPlayerClickedStart(e)}>
                <h2>{this.props.text}</h2>
          </button>
        )
    };
}
