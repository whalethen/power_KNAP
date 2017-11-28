import React from 'react';
import PropTypes from 'prop-types';

const PlaylistEntry = ({ song, index, isHost, removeSelected }) => {
  if (isHost) {
    return (
      <div className="playlistEntry">
        <button id="deleteButton" onClick={() => { removeSelected(song.videoName); }}>
          x
        </button>
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
