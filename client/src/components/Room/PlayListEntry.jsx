import React from 'react';
import PropTypes from 'prop-types';


const PlaylistEntry = (props) => {
  const {
    song,
    index,
    isHost,
    removeSelected,
    vote,
  } = props;
  if (isHost) {
    return (
      <div className="hostPlaylistEntry">
        <button className="deleteButton" onClick={() => { removeSelected(song.videoName); }}>
          X
        </button>
        <button onClick={() => vote(song, '-')}>-</button>
        <button onClick={() => vote(song, '+')}>+</button>
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
  index: PropTypes.number.isRequired,
  isHost: PropTypes.bool.isRequired,
  removeSelected: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired,
};

export default PlaylistEntry;
