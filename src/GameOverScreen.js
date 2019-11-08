import React from 'react';
import './GameOverScreen.css';

function GameOverScreen(props) {
    const title = "Game Over";
    return <main>
        <div className="game-over-screen">
            <div className="game-over-screen__title-container">
                <h1>{title}</h1>
            </div>
        </div>
    </main>;
}

export default React.memo(GameOverScreen);
