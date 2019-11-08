import React from 'react';
import Picture from './Picture';
import PictureSet from './PictureSet';
import Player from './Player';
import LoadedPictures from './LoadedPictures';
import Pictari from './Pictari';
import ScoreDisplay from './ScoreDisplay';
import PlayerSearchBar from './PlayerSearchBar';
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';
import './LevelOne.css';

export default class LevelOne extends React.Component
{
    constructor(props) {
        super(props);
        this.addingPicsScoreValue = 200;
        this.deletingPicsScoreValue = 500;
        this.playerLost = false;
        this.playerWon = false;
        this.player = new Player();
        this.loadedSets$ = of([]); // PictureSet[]
        this.maxLoadedSets = 4;
        this.state = {
            deletingAllowed: false,
            score: 0
        }
    }

    addPics(data_uris) {
        const newSet = new PictureSet(...data_uris.map((uri) => new Picture(uri)));
        this.loadedSets$.map(prev => prev.concat(newSet));
        this.setState((prevState) => ({
            deletingAllowed: this.loadedSets.length === this.maxLoadedSets,
            score: prevState.score + this.addingPicsScoreValue
        }));
    }

    deletePics(indexToRemove, deleter) {
        // remove it
        this.loadedSets$.pipe(filter((_, index) => index === indexToRemove));
        // player loses if Pictari deletes one pic
        this.playerLost = deleter instanceof Pictari && this.props.onPlayerLost(this);
        // player won if all pics are deleted
        this.playerWon = !this.playerLost && this.loadedSets.length === 0;
        // change the score if the player deleted a pic
        deleter instanceof Player && this.setState((prevState) => ({ score: prevState.score + this.deletingPicsScoreValue }));
    }

    handlePlayerDeletedFirstPic = () => this.deletePics(0, this.Player);

    handlePlayerDeletedSecondPic = () => this.deletePics(1, this.Player);

    handlePlayerDeletedThirdPic = () => this.deletePics(2, this.Player);

    handlePlayerDeletedFourthPic = () => this.deletePics(3, this.Player);

    handlePictureSearch(url) {

    }

    render() {
        const { deletingAllowed, score } = this.state;
        const playerWon = this.playerWon;
        return <main className="level-one">
            <ScoreDisplay score={score} />
            { playerWon
                ? (<div className="player-won-message"><h1>You Win!</h1></div>)
                : (<Pictari deleteMode={deletingAllowed} availablePics$={this.loadedSets$} onPictariDeletedPic={this.deletePics.bind(this)}/>)
            }
            <LoadedPictures pictureSets={this.loadedSets}/>
            { deletingAllowed
                ? (<div class="delete-buttons">
                    <button id="first-pic-delete" type="button" onClick={this.handlePlayerDeletedFirstPic.bind(this)}>Delete First Pic</button>
                    <button id="second-pic-delete" type="button" onClick={this.handlePlayerDeletedSecondPic.bind(this)}>Delete Second Pic</button>
                    <button id="third-pic-delete" type="button" onClick={this.handlePlayerDeletedThirdPic.bind(this)}>Delete Third Pic</button>
                    <button id="fourth-pic-delete" type="button" onClick={this.handlePlayerDeletedFourthPic.bind(this)}>Delete Fourth Pic</button>
                </div>)
                : (<PlayerSearchBar deleteMode={deletingAllowed} onPlayerSubmittedPicSearch={this.handlePictureSearch.bind(this)}/>)
            }
        </main>
    }
}
