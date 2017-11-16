import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({ video }) => (
  <div className="container videoplayer">
    <div className="songTitle"> {video.snippet.title} </div>
    <iframe
      title="videoPlaying"
      className="videoFrame"
      src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`}
      allowFullScreen
    />
    <div className="currentSongDetails">
      <div className="songDescription"> {video.snippet.description} </div>
    </div>
  </div>
);

VideoPlayer.propTypes = {
  video: PropTypes.string.isRequired,
};

export default VideoPlayer;

