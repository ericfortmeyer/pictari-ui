import React from 'react';
import './LoadedPictures.css';

export default class LoadedPictures extends React.Component
{
    constructor(props) {
      super(props);
      this.handleDelete.bind(this);
    }

    handleDelete = (index) => this.props.onPlayerDeletedPic(index);

    render = () =>
          { return this.props.SetOfPictures.map((setOfPics, index) =>
            <div key={index.toString()} className={`loaded-pictures__picture-set-column at-col-${this.props.keysForCols[index]}`}>
                {setOfPics.getSet().map((pic, index) => 
                    <img
                      key={index.toString()} 
                      src={pic.getDataUri()}
                      className="loaded-pictures__picture-set__thumbnail"
                      alt="a loaded pic"/>
                    )}
                  {this.props.deleteMode && <button key={index.toString()} type="button" className="loaded-pictures__delete-button" value={index} onClick={(e) => this.handleDelete(e.target.value)}>Delete Pic</button>}
              </div>
          )}
}
