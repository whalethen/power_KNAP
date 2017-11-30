import React from 'react';
import PropTypes from 'prop-types';


const PlaylistEntry = (props) => {
  const {
    song,
    index,
    isHost,
    removeSelected,
    voteOnEntry,
  } = props;
  if (isHost) {
    return (
      <div className="hostPlaylistEntry">
        <button className="deleteButton" onClick={() => { removeSelected(song.videoName); }}>
          X
        </button>
        <button onClick={() => voteOnEntry(song, '-')}>-</button>
        <button onClick={() => voteOnEntry(song, '+')}>+</button>
        <div>{song.votes}</div>
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
  voteOnEntry: PropTypes.func.isRequired,
};

export default PlaylistEntry;
