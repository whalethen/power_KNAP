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
import sampleSearchResults from '../../../../db/sampleVideoData';
import samplePlaylist from '../../../../database/sampleData';

// const socket = io.connect(window.location.hostname);
const socket = io.connect(window.location.host);

class RoomView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVideo: props.samplePlaylist[0],
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
    socket.on('nextSong', (index) => {
      this.setState({
        currentVideo: this.state.playlist[index],
      });
    });
  }

  onPlayerReady(e) {
    e.target.playVideo();
  }

  onPlayerStateChange(e) {
    if (e.data === 0) {
      // increment the Rooms index and start time
      axios.patch(`/playNextSong/${this.state.playlist.length - 1}`)
        .then(res => res.data.indexKey)
        .then((index) => {
          console.log('index:', index);
          // this.setState({
          //   currentVideo: this.state.playlist[index],
          // });
        });
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
      .then(response => this.setState({
        playlist: response.data,
        currentVideo: response.data[0],
      }))
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

RoomView.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  samplePlaylist: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ReactDOM.render(<RoomView searchResults={sampleSearchResults} samplePlaylist={samplePlaylist.samplePlaylist} />, document.getElementById('room'));
