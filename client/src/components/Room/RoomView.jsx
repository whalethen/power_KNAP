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
import sampleVideoData from '../../../../db/sampleVideoData';

// const socket = io.connect(window.location.hostname);
const socket = io.connect('localhost:8080');

class RoomView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVideo: props.searchResults[0],
      searchResults: props.searchResults,
      query: '',
      playlist: [],
    };
    this.updateQuery = this.updateQuery.bind(this);
    this.search = _.debounce(this.search.bind(this), 500);
    this.saveToPlaylist = this.saveToPlaylist.bind(this);
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
  }

  componentDidMount() {
    this.renderPlaylist();
    // socket.on('retrievePlaylist', videos => this.setState({ playlist: videos }));
    socket.on('error', err => console.error(err));
    // socket.on('searchResults', ({ items }) => {
    //   this.setState({
    //     searchResults: items,
    //     query: '',
    //   });
    // });
  }

  onPlayerReady(e) {
    e.target.playVideo();
  }

  onPlayerStateChange(e) {
    if (e.data === 0) {
      console.log(this.state.playlist);
      this.setState({
        currentVideo: this.state.playlist[1],
      });
      // set state: currentVideo = next video in playlist
    }
    if (e.data === -1) {
      e.target.playVideo();
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
      .then(videos => this.state.searchResults = videos.data.items)
      .catch(err => console.error('Failed to get videos: ', err));
  }

  saveToPlaylist(video) { socket.emit('saveToPlaylist', video); }

  renderPlaylist() {
    return axios.get('/renderPlaylist')
      .then(response => this.setState({ playlist: response.data }))
      .catch(err => console.error('Could not retreive playlist: ', err));
  }

  render() {
    return (
      <div className="room">
        <div className="container navbar">__DEVELOPMENT</div>
        <Playlist playlist={this.state.playlist} />
        <VideoPlayer
          loadPlayer={this.loadPlayer}
          currentVideo={this.state.currentVideo}
          onReady={this.onPlayerReady}
          onStateChange={this.onPlayerStateChange}
        />
        <div className="container search">
          <SearchResults searchResults={this.state.searchResults} saveToPlaylist={this.saveToPlaylist} />
          <Search updateQuery={this.updateQuery} search={this.search} />
        </div>
      </div>
    );
  }
}

RoomView.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ReactDOM.render(<RoomView searchResults={sampleVideoData} />, document.getElementById('room'));
