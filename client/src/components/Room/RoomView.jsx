import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import moment from 'moment';
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
      startOptions: null,
      isHost: false,
    };
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.saveToPlaylist = this.saveToPlaylist.bind(this);
  }

  componentDidMount() {
    this.renderRoom();
    roomSocket.on('host', () => this.setState({ isHost: true }));
    roomSocket.on('retrievePlaylist', videos => this.addToPlaylist(videos));
    roomSocket.on('playNext', (next) => {
      this.setState({
        currentVideo: this.state.playlist[next],
      });
    });
    roomSocket.on('error', err => console.error(err));
  }

  componentWillUnmount() {
    roomSocket.disconnect();
  }

  onPlayerReady(e) {
    e.target.playVideo();
  }

  handleDelete(videoName) {
    roomSocket.emit('removeFromPlaylist', videoName);
  }

  onPlayerStateChange(e) {
    // when video has ended
    if (this.state.isHost) {
      if (e.data === 0) {
        axios.patch(`/playNext/${this.state.playlist.length - 1}`);
        this.setState({
          startOptions: { playerVars: { start: 0 } },
        });
      }
    }
    // when video is unstarted
    if (e.data === -1) {
      e.target.playVideo();
    }
  }

  addToPlaylist(videos) {
    if (videos.length === 1) {
      this.setState({
        playlist: videos,
        currentVideo: videos[0],
        startOptions: { playerVars: { start: 0 } },
      });
    } else {
      this.setState({ playlist: videos });
    }
  }

  saveToPlaylist(video) {
    roomSocket.emit('saveToPlaylist', video);
  }

  renderRoom() {
    return axios.get('/renderRoom')
      .then(({ data }) => {
        const currentTime = Date.now();
        const timeLapsed = moment.duration(moment(currentTime).diff(data.start)).asSeconds();
        this.setState({
          playlist: data.videos,
          currentVideo: data.videos[data.index],
          startOptions: {
            playerVars: { start: Math.ceil(timeLapsed) },
          },
        });
      })
      .catch(err => console.error('Could not retrieve playlist: ', err));
  }

  render() {
    const playlistComponent = (this.state.isHost) ?
      (<Playlist
        playlist={this.state.playlist}
        removeSelected={this.handleDelete}
        isHost={this.state.isHost}
      />) :
      <Playlist playlist={this.state.playlist} />;
    return (
      <div className="room">
        <div className="container navbar">fam.ly</div>
        {playlistComponent}
        <VideoPlayer
          currentVideo={this.state.currentVideo}
          opts={this.state.startOptions}
          onReady={this.onPlayerReady}
          onStateChange={this.onPlayerStateChange}
        />
        <Search saveToPlaylist={this.saveToPlaylist} />
      </div>
    );
  }
}

ReactDOM.render(<RoomView />, document.getElementById('room'));
