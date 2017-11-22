import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

const VideoPlayer = props =>
  (
    <div className="container videoplayer">
      <YouTube
        // className="videoFrame" // TODO uncomment to restrict player controls
        videoId={props.currentVideo.url}
        onReady={props.onReady}
        onStateChange={props.onStateChange}
      />
      <div className="currentSongDetails">
        <div className="videoTitle"> {props.currentVideo.videoName} </div>
        <div className="songDescription"> {props.currentVideo.description} </div>
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
