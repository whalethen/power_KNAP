import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({ video }) => (
  <div>
    <p>{video}</p>
  </div>
);

VideoPlayer.propTypes = {
  video: PropTypes.string.isRequired,
};

export default VideoPlayer;
