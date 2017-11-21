import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

let loadYT;

class VideoPlayer extends React.Component {
  componentDidMount() {
    // if (!loadYT) {
    //   loadYT = new Promise((resolve) => {
    //     const tag = document.createElement('script');
    //     tag.src = 'https://www.youtube.com/iframe_api';
    //     const firstScriptTag = document.getElementsByTagName('script')[0];
    //     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    //     window.onYouTubeIframeAPIReady = () => resolve(window.YT);
    //   });
    // }
    // loadYT.then((YT) => {
    //   this.player = new YT.Player(this.youtubePlayerAnchor, {
    //     height: 400,
    //     width: 600, // TODO fine tune player height/width
    //     videoId: this.props.currentVideo.id.videoId,
    //     autoplay: 1,
    //     events: {
    //       onReady: this.props.onReady,
    //       onStateChange: this.props.onStateChange,
    //     },
        // <div className="videoFrame" ref={(r) => { this.youtubePlayerAnchor = r; }} />
    //   });
    // });
  }

  playNext() {
    this.player.loadVideoById({ videoId: this.props.currentVideo.id.videoId });
  }

  render() {
    return (
      <div className="container videoplayer">
        <YouTube 
          videoId={this.props.currentVideo.id.videoId}
          onReady={this.props.onReady}
          onStateChange={this.props.onStateChange}
        />
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
  onStateChange: PropTypes.func.isRequired,
  onReady: PropTypes.func.isRequired,
};

export default VideoPlayer;
