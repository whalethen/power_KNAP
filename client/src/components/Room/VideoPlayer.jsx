import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({ video }) => (
  <div>
    <iframe
      title="videoPlaying"
      className="videoFrame"
      src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`}
      allowFullScreen
    />
    <div className="currentSongDetails">
      <span className="songTitle"> {video.snippet.title} </span>
      <span className="songDescription"> {video.snippet.description} </span>
    </div>
  </div>
);

VideoPlayer.propTypes = {
  video: PropTypes.string.isRequired,
};

export default VideoPlayer;

