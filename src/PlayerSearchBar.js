import React from 'react';
import './PlayerSearchBar.css';

export default class PlayerSearchBar extends React.Component
{
    constructor(props) {
        super(props);
    }

    handleSubmit(url) {
        this.props.onPlayerSubmittedPicSearch(url);
    }

    render() {
        return <div className="player-controls">
            <h4 className="player-hints">Add Pics By Typing A Url</h4>
            <div className="player-search-bar">
                <input type="text" onSubmit={(e) => this.handleSubmit(e.target.value).bind(this)} />
            </div>
        </div>
    }
}
