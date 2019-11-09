import React from 'react';

export default class ScoreDisplay extends React.Component
{
    render() {
        return <div className="score">
            <h1 className="score-title">SCORE</h1>
            <h1 className="score-number">{this.props.score}</h1>
        </div>;
    }
}
