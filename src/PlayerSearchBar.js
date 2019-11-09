import React from 'react';
import './PlayerSearchBar.css';

export default class PlayerSearchBar extends React.Component
{
    constructor(props) {
        super(props);
        this.state = { searchValue: "" };
        this.handleSubmit.bind(this);
        this.handleSubmit.bind(this);
        this.handleClear.bind(this);
    }

    handleSubmit(event) {
        this.props.onPlayerSubmittedPicSearch(this.state.searchValue);
        this.handleClear();
        event.preventDefault(true);
    }

    handleChange = (event) => this.setState({searchValue: event.target.value});
    handleClear = () => this.setState({searchValue: ''});

    render = () => 
        <div>
          <h4 className="player-hints">Add Pics By Typing A URL</h4>
          <form onSubmit={(e) => this.handleSubmit(e)}>
              <p>
                <input className="player-search-bar__submit-button" type="submit" value="Submit"/>
              </p>
              <div className="player-search-bar">
                <input type="text" value={this.state.searchValue} onChange={(e) => this.handleChange(e)}/>
                <div className="player-search-bar__close" onClick={this.handleClear}></div>
              </div>
          </form>
        </div>
}
