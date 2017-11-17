import React from 'react';
import PropTypes from 'prop-types';
import PlaylistEntry from './PlayListEntry';

const Playlist = ({ playlist }) => (

  <div className="container playlist">
    <h3>Playlist</h3>
    {playlist.map(song =>
      <PlaylistEntry song={song} key={song.id} />)}
  </div>
);

Playlist.propTypes = {
  playlist: PropTypes.array.isRequired,
};

export default Playlist;
