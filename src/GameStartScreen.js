import React from 'react';
import StartButton from './StartButton';
import './GameStartScreen.css';

export default class GameStartScreen extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            shouldStartButtonBlink: false,
        };
    }

    componentDidMount = () => {
        this.interval = setInterval(() => {
          this.setState((state, props) => {
            return {
              shouldStartButtonBlink: !state.shouldStartButtonBlink,
            };
          });
        }, 500);
    };
      
    componentWillUnmount = () => {
        clearInterval(this.interval);
    };

    render() {
        const title = "Pictari";
        const shouldStartButtonBlink = this.state.shouldStartButtonBlink;
        const startButtonText = "Press Start";
        return <main>
            <div>
                <div className="game-start-screen">
                    <div className="game-start-screen__title-container">
                        <h1>{title}</h1>
                    </div>
                </div>
                <StartButton
                  blink={shouldStartButtonBlink}
                  onPlayerClickedStart={(e) => this.props.onPlayerStartedGame(e)}
                  text={startButtonText}/>
            </div>
        </main>;
    }
}
