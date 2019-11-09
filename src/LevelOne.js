import React from 'react';
import Picture from './Picture';
import SetOfPictures from './SetOfPictures';
import LoadedPictures from './LoadedPictures';
import Pictari from './Pictari';
import ScoreDisplay from './ScoreDisplay';
import PlayerSearchBar from './PlayerSearchBar';
import ImageService from './api-services/ImageService';
import PostPayload from './api-services/PostPayload';
import './LevelOne.css';

/**@type Just using this to keep track of who is responsible for deleting a pic */
class Player {}

export default class LevelOne extends React.Component
{
    constructor(props) {
        super(props);

        this.addingPicsScoreValue = 200;
        this.deletingPicsScoreValue = 500;
        this.maxLoadedSets = 4;
        this.playerLost = false;
        this.playerWon = false;
        this.state = {
            loadedSets: [],
            score: 0,
            deleteMode: false,
            picColKeys: []
        };
        /**@type {Player} - Use to keep track of pictures deleted by the player */
        this.player = new Player();
        this.imageService = new ImageService();
        this.handleDeleteFromPlayer.bind(this);
        this.pictureColKeys = ['A', 'B', 'C', 'D'];
    }

    /**@param {string} url - For the API */
    addPics(url) {
        const payload = new PostPayload({url: url});
        this.imageService
            .post(payload)
            .then(jsonPayload => jsonPayload._links[0])
            .then(
                link => this.imageService
                    .fetch(link)
                    .then(imagePayload => {
                        const data_uris = imagePayload.data_uris;
                        const newSet = new SetOfPictures(link, ...data_uris.map((uri) => new Picture(uri)));
                        const newSets = [...this.state.loadedSets];
                        const newPicColKeys = [...this.state.picColKeys];
                        newSets.push(newSet);
                        newPicColKeys.push(this.pictureColKeys.shift());
                        const deleteMode = newSets.length === this.maxLoadedSets;
                        this.setState((prevState) => ({
                                loadedSets: newSets,
                                score: prevState.score + this.addingPicsScoreValue,
                                deleteMode: deleteMode,
                                picColKeys: newPicColKeys
                            }));
                    })
                ).catch(e => console.log(e));
    }

    /**
     * @param {int} indexToRemove
     * @param {Object} deleter - Who is deleting the picture?
     * */
    deletePics(indexToRemove, deleter) {
        let newSets = [...this.state.loadedSets];
        let newPicColKeys = [...this.state.picColKeys];
        const link = newSets[indexToRemove].link
        // player loses if Pictari deletes one pic
        this.playerLost = deleter instanceof Pictari && this.props.onPlayerLost(this);
        this.playerWon = newSets.length < 2 && !this.playerLost;
        const addToPrevScore = deleter instanceof Player ? this.deletingPicsScoreValue : 0;


        newSets.splice(indexToRemove, 1);
        newPicColKeys.splice(indexToRemove, 1);
        this.setState((prevState) => ({loadedSets: newSets, score: prevState.score + addToPrevScore, picColKeys: newPicColKeys}));
        this.imageService.delete(link);
    }

    handleDeleteFromPlayer = (index) => this.deletePics(index, new Player());

    render() {
        const { loadedSets, score, deleteMode, picColKeys } = this.state;
        const { playerWon } = this;
        return <main className="level-one">
            <ScoreDisplay score={score}/>
            { playerWon
                ? (<div className="player-won-message"><h1>You Win!</h1></div>)
                : (<Pictari deleteMode={deleteMode} availablePics={loadedSets} onPictariDeletedPic={this.deletePics.bind(this)}/>)
            }
            <LoadedPictures
                keysForCols={picColKeys}
                SetOfPictures={loadedSets}
                deleteMode={deleteMode}
                onPlayerDeletedPic={this.handleDeleteFromPlayer}/>
            <div className="player-controls">
                { deleteMode || (<PlayerSearchBar onPlayerSubmittedPicSearch={this.addPics.bind(this)}/>) }
            </div>
        </main>
    }
}
