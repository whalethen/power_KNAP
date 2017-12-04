import React from 'react';
import io from 'socket.io-client';
import moment from 'moment';
import axios from 'axios';
import cookie from 'cookie';
import { Link } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import Playlist from './Playlist';
import Search from './Search';
import ChatView from './ChatView';

const roomSocket = io('/room');

class RoomView extends React.Component {
  constructor() {
    super();
    this.state = {
      userTyping: '',
      currentVideo: undefined,
      playlist: [],
      startOptions: null,
      isHost: false,
      message: '',
      username: '', // refers to socketIDs when user is in chat but not logged in
      user: null, // refers to Google username when logged in in chat
      // TODO: eliminate the need for two separate username references
      roomId: '',
    };
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.saveToPlaylist = this.saveToPlaylist.bind(this);
    this.emitMessage = this.emitMessage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.voteOnEntry = this.voteOnEntry.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
    this.sortPlaylist = this.sortPlaylist.bind(this);
    this.broadcastTyping = this.broadcastTyping.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    if (cookie.parse(document.cookie).user) {
      this.setState({ user: cookie.parse(document.cookie).user });
    }
    this.setState({ roomId: this.props.match.params.roomId })
    this.renderRoom();
    roomSocket.on('default', () => this.setState({ currentVideo: undefined }));
    roomSocket.on('host', () => this.setState({ isHost: true }));
    roomSocket.on('retrievePlaylist', videos => this.addToPlaylist(videos));
    roomSocket.on('playNext', (next) => {
      this.setState({
        currentVideo: this.state.playlist[next],
      });
    });
    roomSocket.on('error', err => console.error(err));
    roomSocket.on('pushingMessage', (message) => {
      this.setState({
        message,
      });
    });
    roomSocket.emit('room', this.props.match.params.roomId);
    roomSocket.on('id', id => this.setState({ username: id }));
    roomSocket.on('typingMessage', (message) => {
      this.setState({
        userTyping: message,
      });
    });
  }

  componentWillUnmount() {
    roomSocket.disconnect();
  }

  onPlayerReady(e) {
    e.target.playVideo();
  }

  onPlayerStateChange(e) {
    // when video has ended
    if (e.data === 0) {
      if (this.state.isHost) {
        axios.patch(`/playNext/${this.state.playlist.length - 1}`);
      }
      this.setState({
        startOptions: { playerVars: { start: 0 } },
      });
    }
    // when video is unstarted
    if (e.data === -1) {
      e.target.playVideo();
    }
  }

  handleDelete(videoName) {
    roomSocket.emit('removeFromPlaylist', { videoName, roomId: this.state.roomId });
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
    roomSocket.emit('saveToPlaylist', { video, roomId: this.state.roomId });
  }

  broadcastTyping() {
    const user = this.state.user || this.state.username;
    const roomId = this.state.roomId;
    roomSocket.emit('typingMessage', user, roomId);
  }

  emitMessage(time, message) {
    const user = this.state.user || this.state.username;
    roomSocket.emit('emitMessage', {
      body: message,
      userName: user,
      dateTime: time,
    }, this.state.roomId);
  }

  voteOnEntry(video, action) {
    axios.patch('/vote', { video, action })
      .then(() => this.getPlaylist())
      .catch(err => console.error('Could not update votes', err));
  }

  getPlaylist() {
    return axios.get(`/playlist/${this.props.match.params.roomId}`)
      .then(({ data }) => {
        const sortedList = this.sortPlaylist(data.videos);
        this.setState({
          playlist: sortedList,
        }, () => console.log(this.state));
      })
      .catch(err => console.log('Could not rerender playlist', err));
  }

  sortPlaylist(list) {
    return list.sort((a, b) => {
      if (b.votes - a.votes === 0) {
        return a.id - b.id;
      }
      return b.votes - a.votes;
    });
  }

  renderRoom() {
    return axios.get(`/renderRoom/${this.props.match.params.roomId}`)
      .then(({ data }) => {
        const currentTime = Date.now();
        const timeLapsed = moment.duration(moment(currentTime).diff(data.start)).asSeconds();
        const sortedList = this.sortPlaylist(data.videos);
        this.setState({
          playlist: sortedList,
          currentVideo: sortedList[data.index],
          startOptions: {
            playerVars: { start: Math.ceil(timeLapsed) },
          },
        });
      })
      .catch(err => console.error('Could not retrieve playlist: ', err));
  }

  render() {
    let playlistComponent;
    if (this.state.isHost) {
      playlistComponent = (<Playlist
        playlist={this.state.playlist}
        removeSelected={this.handleDelete}
        isHost={this.state.isHost}
        voteOnEntry={this.voteOnEntry}
      />);
    } else {
      playlistComponent = (<Playlist
        playlist={this.state.playlist}
        voteOnEntry={this.voteOnEntry}
      />);
    }

    const view = this.state.user ?
      <span className="login">Welcome, {this.state.user} <a href="/auth/logout">Logout</a></span> :
      <span className="login">Login with <a href="/auth/google">Google</a></span>;

    return (
      <div className="room">
          <div className="container navbar">
            <Link to='/'>
            fam.ly
            </Link>
          {view}</div>
        {playlistComponent}
        <VideoPlayer
          currentVideo={this.state.currentVideo}
          opts={this.state.startOptions}
          onReady={this.onPlayerReady}
          onStateChange={this.onPlayerStateChange}
        />
        <Search saveToPlaylist={this.saveToPlaylist} />
        <ChatView
          message={this.state.message}
          date={this.state.dateTime}
          username={this.state.username}
          emitMessage={this.emitMessage}
          broadcastTyping={this.broadcastTyping}
          typing={this.state.userTyping}
        />
      </div>
    );
  }
}

export default RoomView;
