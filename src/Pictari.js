import React from 'react';
import pictariImage from './images/pictari-icon-400.svg';
import './Pictari.css';

/**
 * Represents the UI and logic the game is using to play against the player
 */
export default class Pictari extends React.Component
{
    handlePictureDelete = (index)  => this.props.onPictariDeletedPic(index, this);

    determineWhichPicToDelete() {
        // need to implement
        // this.props.availablePics
        // throw Error("not implemented");
    }

    render() {
        let classes = ["pictari-image-container"]
        const { deleteMode } = this.props;
        const appendToClass = deleteMode ? "moveDuringDeleteMode shootPics" : "moveBeforeDeleteMode";
        deleteMode && this.determineWhichPicToDelete();
        return <span className={classes.concat([appendToClass]).join(" ")}>
            <img src={pictariImage} width="180" alt="oops you won't be able to play the game without pictari" />
            <svg height="200" width="20">
                <line x1="20" y1="0" x2="20" y2="200" />
            </svg>
        </span>
    }
}
