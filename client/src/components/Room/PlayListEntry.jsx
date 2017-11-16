import React from 'react';
import PropTypes from 'prop-types';

const PlaylistEntry = ({ song }) => (
  <div>
    <div className="songTitle"> {song.snippet.title} </div>
  </div>
);

PlaylistEntry.propTypes = {
  song: PropTypes.node.isRequired,
};

export default PlaylistEntry;
