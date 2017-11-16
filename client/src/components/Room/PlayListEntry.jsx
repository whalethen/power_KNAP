import React from 'react';
import PropTypes from 'prop-types';

const PlaylistEntry = ({ song }) => (

  <div>
    <p>PlaylistSong</p>
    <img className="songThumbnail" src={song.snippet.thumbnails.default.url} alt="" />
    <span className="songTitle"> {song.snippet.title} </span>
    <span className="songDescription"> {song.snippet.description} </span>
  </div>
);

PlaylistEntry.propTypes = {
  song: PropTypes.node.isRequired,
};

export default PlaylistEntry;
