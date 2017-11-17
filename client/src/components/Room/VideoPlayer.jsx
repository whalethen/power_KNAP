import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({ currentVideo }) => (
  <div className="container videoplayer">
    <div className="songTitle"> {currentVideo.snippet.title} </div>
    <iframe
      title="videoPlaying"
      className="videoFrame"
      src={`https://www.youtube.com/embed/${currentVideo.id.videoId}?autoplay=0`} // TODO turn autoplay back on for deployment 
      allowFullScreen
    />
    <div className="currentSongDetails">
      <div className="songDescription"> {currentVideo.snippet.description} </div>
    </div>
  </div>
);

VideoPlayer.propTypes = {
  currentVideo: PropTypes.object.isRequired,
};

export default VideoPlayer;

