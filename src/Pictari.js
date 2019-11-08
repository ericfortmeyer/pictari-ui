import React from 'react';
import { of } from 'rxjs';
import { startWith, reduce } from 'rxjs/operators';
import pictariImage from './images/pictari-icon-400.svg';
import './Pictari.css';

export default class Pictari extends React.Component
{
    constructor(props) {
        super(props);
        this.numPicsDeleted = 0;
        this.defaultClass = "pictari-image-container";
        this.classes$ = of(["moveBeforeDeleteMode"]);
        this.deleteModeClass = "moveDuringDeleteMode";
        this.pauseClass = "pause";

        // behavior here ??
    }

    incrementDeletes() {
        this.numPicsDeleted++;
    }

    handlePictureDelete(index) {
        this.props.onPictariDeletedPic(index, this); // the app needs to know who deleted the pic
    }

    componentWillUnmount() {
        this.classes$.unsubsribe();
    }

    startDeleteMode() {
        const pauseFor = 5000;
        this.classes$.pipe(startWith(this.pauseClass));
        this.pauseTimer = setTimeout(() => {
            this.classes$.pipe(startWith(this.deleteModeClass));
            this.determineWhichPicToDelete();
        }, pauseFor);
    }

    determineWhichPicToDelete() {
        // this.props.availablePics$;
    }

    attemptToDeleteFirstPic = () => this.classes$.pipe(startWith("goToFirstPic"));

    attemptToDeleteSecondPic = () => this.classes$.pipe(startWith("goToSecondPic"));

    attemptToDeleteThirdPic = () => this.classes$.pipe(startWith("goToThirdPic"));

    attemptToDeleteFourthPic = () => this.classes$.pipe(startWith("goToFourthPic"));

    render() {
        this.props.deleteMode && this.startDeleteMode();
        return <span className={this.classes$.pipe(reduce((acc,curr) => `${acc} ${curr}`, this.defaultClass))}>
            <img src={pictariImage} width="180" alt="oops you won't be able to play the game without pictari" />
        </span>
    }
}
