import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import io from 'socket.io-client';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';
import Playlist from './Playlist';
import Search from './Search';
import SearchResults from './SearchResults';

// const socket = io.connect(window.location.hostname);
const socket = io();

class RoomView extends React.Component {
  constructor() {
    super();
    this.state = {
      currentVideo: undefined,
      searchResults: [],
      query: '',
      playlist: [],
    };
    this.updateQuery = this.updateQuery.bind(this);
    this.search = _.debounce(this.search.bind(this), 500);
    this.saveToPlaylist = this.saveToPlaylist.bind(this);
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
  }

  componentDidMount() {
    this.renderPlaylist();
    socket.on('retrievePlaylist', videos => this.addToPlaylist(videos));
    socket.on('playNext', (next) => {
      this.setState({
        currentVideo: this.state.playlist[next],
      });
    });
    socket.on('error', err => console.error(err));
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

  updateQuery(event) {
    const pressedEnter = event.key === 'Enter';
    Promise.resolve(this.setState({
      query: event.target.value,
    }))
      .then(() => pressedEnter ? this.search.flush() : this.search())
      .catch(err => console.error('Failed to search for query: ', err));
  }
  // send query to server via socket connection
  search() {
    axios.get(`/search?query=${this.state.query}`)
      .then(videos => this.setState({ searchResults: videos.data.items }))
      .catch(err => console.error('Failed to get videos: ', err));
  }

  saveToPlaylist(video) { socket.emit('saveToPlaylist', video); }

  renderPlaylist() {
    return axios.get('/renderPlaylist')
      .then(response => this.setState({
        playlist: response.data,
        currentVideo: response.data[0], // need to change this to current idx in room db
      }))
      .catch(err => console.error('Could not retreive playlist: ', err));
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
        <div className="container search">
          <SearchResults
            searchResults={this.state.searchResults}
            saveToPlaylist={this.saveToPlaylist}
          />
          <Search updateQuery={this.updateQuery} search={this.search} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<RoomView />, document.getElementById('room'));
