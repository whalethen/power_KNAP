import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

const VideoPlayer = props =>
  (
    <div className="container videoplayer">
      <YouTube
        // className="videoFrame"
        videoId={props.currentVideo.id.videoId}
        onReady={props.onReady}
        onStateChange={props.onStateChange}
      />
      <div className="currentSongDetails">
        <div className="videoTitle"> {props.currentVideo.snippet.title} </div>
        <div className="songDescription"> {props.currentVideo.snippet.description} </div>
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
