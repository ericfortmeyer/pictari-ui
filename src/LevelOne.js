import React from 'react';
import Picture from './Picture';
import PictureSet from './PictureSet';
import Player from './Player';
import LoadedPictures from './LoadedPictures';
import Pictari from './Pictari';
import ScoreDisplay from './ScoreDisplay';
import PlayerSearchBar from './PlayerSearchBar';
import ImageService from './services/ImageService';
import PostPayload from './services/PostPayload';
import { of } from 'rxjs';
import { filter, map, tap, last } from 'rxjs/operators';
import './LevelOne.css';

export default class LevelOne extends React.Component
{
    constructor(props) {
        super(props);
        this.addingPicsScoreValue = 200;
        this.deletingPicsScoreValue = 500;
        this.maxLoadedSets = 4;
        this.playerLost = false;
        this.playerWon = false; // need both since I'm using this to display a message
        this.player = new Player();
        this.loadedSets$ = of([]); // PictureSet[]
        this.score$ = of(0);
        this.apiUrl = 'https://pictari-ui.herokuapp.com/images';
        this.imageService = new ImageService();
    }

    addPics(url) {
        const payload = new PostPayload({url: url});
        this.imageService
            .post(this.apiUrl, payload)
            .then(res => res.json())
            .then(jsonPayload => jsonPayload._links[0])
            .then(
                link => this.imageService
                    .fetch(link)
                    .then(imagePayload => {
                        const data_uris = imagePayload.data_uris;
                        const newSet = new PictureSet(link, ...data_uris.map((uri) => new Picture(uri)));
                        this.loadedSets$.pipe(map(prev => prev.concat(newSet)))
                    })
                );
        this.score$.pipe(reduce((acc, curr) => acc + curr, this.addingPicsScoreValue));
    }

    deletePics(indexToRemove, deleter) {
        this.loadedSets$.subscribe((pictureSets) => {
            // remove it from the api
            const link = pictureSets[indexToRemove].link;
            this.imageService.delete(link);
        }).unsubscribe();
        // player loses if Pictari deletes one pic
        this.playerLost = deleter instanceof Pictari && this.props.onPlayerLost(this);
        this.loadedSets$.pipe(
            // then remove it in our app
            filter((_, index) => index !== indexToRemove),
            // player won if all pics are deleted
            last(loadedSet => loadedSet),
            tap(loadedSet => this.playerWon = loadedSet.length === 0 && !this.playerLost)
        );
        // change the score if the player deleted a pic
        deleter instanceof Player && this.score$.pipe(reduce((acc, curr) => acc + curr, this.deletingPicsScoreValue));
    }

    handlePlayerDeletedFirstPic = () => this.deletePics(0, this.Player);

    handlePlayerDeletedSecondPic = () => this.deletePics(1, this.Player);

    handlePlayerDeletedThirdPic = () => this.deletePics(2, this.Player);

    handlePlayerDeletedFourthPic = () => this.deletePics(3, this.Player);

    render() {
        const deletingAllowed = this.deletingAllowed;
        const playerWon = this.playerWon;
        return <main className="level-one">
            <ScoreDisplay score={this.score$}/>
            { playerWon
                ? (<div className="player-won-message"><h1>You Win!</h1></div>)
                : (<Pictari deleteMode={deletingAllowed} availablePics$={this.loadedSets$} onPictariDeletedPic={this.deletePics.bind(this)}/>)
            }
            <LoadedPictures pictureSets$={this.loadedSets$}/>
            { this.loadedSets$.pipe(
                last(loadedSets => {
                    return loadedSets.length === this.maxLoadedSets
                        ? (<div class="delete-buttons">
                            <button id="first-pic-delete" type="button" onClick={this.handlePlayerDeletedFirstPic.bind(this)}>Delete First Pic</button>
                            <button id="second-pic-delete" type="button" onClick={this.handlePlayerDeletedSecondPic.bind(this)}>Delete Second Pic</button>
                            <button id="third-pic-delete" type="button" onClick={this.handlePlayerDeletedThirdPic.bind(this)}>Delete Third Pic</button>
                            <button id="fourth-pic-delete" type="button" onClick={this.handlePlayerDeletedFourthPic.bind(this)}>Delete Fourth Pic</button>
                        </div>)
                        : (<PlayerSearchBar onPlayerSubmittedPicSearch={this.addPics.bind(this)}/>)
                    }
                ))
            }
        </main>
    }
}
