import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({ currentVideo }) => (
  <div className="container videoplayer">
    <iframe
      width="560"
      height="315"
      title="videoPlaying"
      className="videoFrame"
      frameBorder="0"
      src={`https://www.youtube.com/embed/${currentVideo.id.videoId}?autoplay=0`} // TODO turn autoplay back on for deployment
      allowFullScreen
    />
    <div className="currentSongDetails">
      <div className="videoTitle"> {currentVideo.snippet.title} </div>
      <div className="songDescription"> {currentVideo.snippet.description} </div>
    </div>
    <div className="line" />
  </div>
);

VideoPlayer.propTypes = {
  currentVideo: PropTypes.object.isRequired,
};

export default VideoPlayer;
