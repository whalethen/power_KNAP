import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

const VideoPlayer = (props) => {
  const {
    currentVideo,
    opts,
    onReady,
    onStateChange,
  } = props;
  if (currentVideo !== undefined) {
    return (
      <div className="container videoplayer">
        <YouTube
          className="videoFrame" // TODO uncomment to restrict player controls
          videoId={currentVideo.url}
          onReady={onReady}
          opts={opts}
          onStateChange={onStateChange}
        />
        <div className="currentSongDetails">
          <div className="videoTitle"> {currentVideo.videoName} </div>
          <div className="songDescription"> {currentVideo.description} </div>
        </div>
        <div className="line" />
      </div>
    );
  }
  return (
    <div className="container videoplayer">
      <img src="https://media.giphy.com/media/l6hwfRFlBsbSM/giphy.gif" alt="pizza boy" />
    </div>
  );
};

VideoPlayer.propTypes = {
  currentVideo: PropTypes.instanceOf(Object),
  onStateChange: PropTypes.func.isRequired,
  onReady: PropTypes.func.isRequired,
  opts: PropTypes.instanceOf(Object),
};

export default VideoPlayer;
