import React from 'react';
import PropTypes from 'prop-types';
import PlaylistEntry from './PlaylistEntry.jsx';


const Playlist = ({ playlist }) => (

  <div>
    <p>Playlist</p>
    {playlist.map(song =>
      <PlaylistEntry song={song} />)}
  </div>
);

Playlist.propTypes = {
  playlist: PropTypes.node.isRequired,
};

export default Playlist;
