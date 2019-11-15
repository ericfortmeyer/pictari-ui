import React from 'react';
import SplashScreen from './SplashScreen';
import LevelOne from './LevelOne';
import BootScreen from './BootScreen';
import GameStartScreen from './GameStartScreen';
import GameOverScreen from './GameOverScreen';
import './App.css';

export default class App extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      shouldRenderBootScreen: false,
      shouldRenderSplashScreen: true,
      shouldRenderGameStartScreen: false,
      shouldRenderLevelOneScreen: false,
      playerLost: false,
    }
  }
  
  componentDidMount = () => {
    // other timers will be started sequentially 
    // within the previous timer
    // this.startBootScreenTimer();
    this.startSplashScreenTimer();
  }

  componentWillUnmount = () => {
    clearTimeout(this.bootScreenTimer);
    clearTimeout(this.splashScreenTimer);
    clearTimeout(this.gameOverScreenTimer);
    clearTimeout(this.playerWonScreenTimer);
  }

  startBootScreenTimer() {
    const timeToBoot = 35000; // ms
    // switch to splash screen
    this.bootScreenTimer = setTimeout(() => {
      this.setState((prevState) => ({
          shouldRenderBootScreen: !prevState.shouldRenderBootScreen,
          shouldRenderSplashScreen: !prevState.shouldRenderSplashScreen
        }));
      this.startSplashScreenTimer();
    }, timeToBoot);
  }

  startSplashScreenTimer() {
    const splashScreenRenderDuration = 5000; // ms
    // switch to game start screen
    this.splashScreenTimer = setTimeout(() => {
      this.setState((prevState) => ({
          shouldRenderSplashScreen: !prevState.shouldRenderSplashScreen,
          shouldRenderGameStartScreen: !prevState.shouldRenderGameStartScreen
        }));
    }, splashScreenRenderDuration);
  }

  startGameOverScreenTimer() {
    const gameOverScreenRenderDuration = 6000; // ms
    this.gameOverScreenTimer = setTimeout(() => {
      this.setState((prevState) => ({
          shouldRenderGameStartScreen: !prevState.shouldRenderGameStartScreen,
          playerLost: !prevState.playerLost
      }));
    },gameOverScreenRenderDuration);
  }

  handlePlayerStartedGame = () => this.setState(() => ({shouldRenderLevelOneScreen: true, shouldRenderGameStartScreen: false}));

  handlePlayerWon = () => this.playerWonScreenTimer = setTimeout(() => this.setState({shouldRenderGameStartScreen: true, shouldRenderLevelOneScreen: false}), 3000)

  handlePlayerLost = () => this.setState(() => ({playerLost: true, shouldRenderLevelOneScreen: false}));

  handlePlayerResetGame = () => window.location.reload(false);

  render() {
    const {
      shouldRenderBootScreen,
      shouldRenderSplashScreen,
      shouldRenderGameStartScreen,
      shouldRenderLevelOneScreen,
      playerLost
    } = this.state;
    playerLost && this.startGameOverScreenTimer();
    return (shouldRenderBootScreen && <BootScreen/>)
        || (shouldRenderSplashScreen && <SplashScreen/>)
        || (shouldRenderGameStartScreen && <GameStartScreen onPlayerStartedGame={this.handlePlayerStartedGame.bind(this)}/>)
        || (shouldRenderLevelOneScreen && (
          <LevelOne
            onPlayerStartedGame={this.handlePlayerStartedGame.bind(this)}
            onPlayerResetGame={this.handlePlayerResetGame.bind(this)}
            onPlayerWon={this.handlePlayerWon.bind(this)}
            onPlayerLost={this.handlePlayerLost.bind(this)}/>
        ))
        || (playerLost && <GameOverScreen/>);
  }
}
