import React from 'react';
import PropTypes from 'prop-types';


const PlaylistEntry = ({ song, index, isHost, removeSelected }) => {
  if (isHost) {
    return (
      <div className="playlistEntry">
        <div>
          <button id="deleteButton" onClick={() => { removeSelected(song.videoName); }}>
            X
          </button>
        </div>
        <div className="songTitle">{index}. {song.videoName} </div>
      </div>
    );
  }
  return (
    <div className="playlistEntry">
      <div className="songTitle">{index}. {song.videoName} </div>
    </div>
  );
};

PlaylistEntry.propTypes = {
  song: PropTypes.instanceOf(Object).isRequired,
};

export default PlaylistEntry;
