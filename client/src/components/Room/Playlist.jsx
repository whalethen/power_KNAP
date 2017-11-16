import React from 'react';
import PropTypes from 'prop-types';
import PlaylistEntry from './PlayListEntry';

const Playlist = ({ playlist }) => (

  <div className="container playlist">
    <h3>Playlist</h3>
    {playlist.map(song =>
      <PlaylistEntry song={song} key={song.etag} />)}
  </div>
);

Playlist.propTypes = {
  playlist: PropTypes.node.isRequired,
};

export default Playlist;
