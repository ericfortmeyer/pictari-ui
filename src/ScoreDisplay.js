import React from 'react';

function ScoreDisplay(props) {
    return <div className="score">
        <h1 className="score-title">SCORE</h1>
        <h1 className="score-number">{props.score}</h1>
    </div>;
}

export default React.memo(ScoreDisplay);
