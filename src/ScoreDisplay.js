import React from 'react';
import { last } from 'rxjs/operators';

function ScoreDisplay(props) {
    return <div className="score">
        <h1 className="score-title">SCORE</h1>
        <h1 className="score-number">{props.score$.pipe(last(score => score))}</h1>
    </div>;
}

export default React.memo(ScoreDisplay);
