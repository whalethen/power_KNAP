import React from 'react';
import PropTypes from 'prop-types';
import PlaylistEntry from './PlayListEntry';

const Playlist = ({ playlist }) => (

  <div>
    <p>Playlist</p>
    {playlist.map(song =>
      <PlaylistEntry song={song} key={song.etag} />)}
  </div>
);

Playlist.propTypes = {
  playlist: PropTypes.node.isRequired,
};

export default Playlist;
