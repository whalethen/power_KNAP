import React from 'react';
import PropTypes from 'prop-types';

let loadYT;

class VideoPlayer extends React.Component {
  componentDidMount() {
    if (!loadYT) {
      loadYT = new Promise((resolve) => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
      });
    }
    loadYT.then((YT) => {
      this.player = new YT.Player(this.youtubePlayerAnchor, {
        height: this.props.height || 390,
        width: this.props.width || 640,
        videoId: this.props.currentVideo,
        events: {
          onStateChange: this.onPlayerStateChange,
        },
      });
    });
  }

  onPlayerStateChange(e) {
    if (typeof this.props.onStateChange === 'function') {
      this.props.onStateChange(e);
    }
  }

  render() {
    return (
      <div className="container videoplayer">
        <div className="videoFrame" ref={(r) => { this.youtubePlayerAnchor = r; }} />
        <div className="currentSongDetails">
          <div className="videoTitle"> {this.props.currentVideo.snippet.title} </div>
          <div className="songDescription"> {this.props.currentVideo.snippet.description} </div>
        </div>
        <div className="line" />
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  currentVideo: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onStateChange: PropTypes.func.isRequired,
};

export default VideoPlayer;
