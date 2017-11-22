import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

const VideoPlayer = ({ currentVideo, onReady, onStateChange }) => (
  <div className="container videoplayer">
    <YouTube
      // className="videoFrame" // TODO uncomment to restrict player controls
      videoId={currentVideo.url}
      onReady={onReady}
      onStateChange={onStateChange}
    />
    <div className="currentSongDetails">
      <div className="videoTitle"> {currentVideo.videoName} </div>
      <div className="songDescription"> {currentVideo.description} </div>
    </div>
    <div className="line" />
  </div>
);

VideoPlayer.propTypes = {
  currentVideo: PropTypes.instanceOf(Object).isRequired,
  onStateChange: PropTypes.func.isRequired,
  onReady: PropTypes.func.isRequired,
};

export default VideoPlayer;
