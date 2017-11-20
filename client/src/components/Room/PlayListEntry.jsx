import React from 'react';
import PropTypes from 'prop-types';

const PlaylistEntry = ({ song }) => (
  <div className="playlistEntry">
    <div className="songTitle"> {song.videoName} </div>
  </div>
);

PlaylistEntry.propTypes = {
  song: PropTypes.object.isRequired,
};

export default PlaylistEntry;
