import React from 'react';

function LoadedPictures(props) {
    const pictureSets = props.pictureSets;
    return pictureSets.map((setOfPics) => 
        <div className="picture-set">
            { setOfPics.getSet().map((pic) => <img className="picture-set__thumbnail" src={pic.getDataUri()} alt="a loaded pic"/>) }
        </div>
    );
}

export default React.memo(LoadedPictures);
