import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';
import Playlist from './Playlist';
import Search from './Search';

// const socket = io.connect(window.location.hostname);
const roomSocket = io('/room');

class RoomView extends React.Component {
  constructor() {
    super();
    this.state = {
      currentVideo: undefined,
      playlist: [],
    };
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.saveToPlaylist = this.saveToPlaylist.bind(this);
  }

  componentDidMount() {
    this.renderPlaylist();
    roomSocket.on('retrievePlaylist', videos => this.addToPlaylist(videos));
    roomSocket.on('playNext', (next) => {
      this.setState({
        currentVideo: this.state.playlist[next],
      });
    });
    roomSocket.on('error', err => console.error(err));
  }

  onPlayerReady(e) {
    e.target.playVideo();
  }

  onPlayerStateChange(e) {
    if (e.data === 0) {
      axios.patch(`/playNext/${this.state.playlist.length - 1}`);
    }
    if (e.data === -1) {
      e.target.playVideo();
    }
  }

  addToPlaylist(videos) {
    if (videos.length === 1) {
      this.setState({ playlist: videos, currentVideo: videos[0] });
    } else {
      this.setState({ playlist: videos });
    }
  }

  saveToPlaylist(video) {
    io('/room').emit('saveToPlaylist', video);
  }

  renderPlaylist() {
    return axios.get('/renderPlaylist')
      .then(response => this.setState({
        playlist: response.data,
        currentVideo: response.data[0], // need to change this to current idx in room db
      }))
      .catch(err => console.error('Could not retrieve playlist: ', err));
  }

  render() {
    return (
      <div className="room">
        <div className="container navbar">fam.ly</div>
        <Playlist playlist={this.state.playlist} />
        <VideoPlayer
          currentVideo={this.state.currentVideo}
          onReady={this.onPlayerReady}
          onStateChange={this.onPlayerStateChange}
        />
        <Search saveToPlaylist={this.saveToPlaylist} />
      </div>
    );
  }
}

ReactDOM.render(<RoomView />, document.getElementById('room'));
