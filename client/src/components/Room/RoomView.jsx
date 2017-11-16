import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import VideoPlayer from './VideoPlayer';
import Playlist from './Playlist';
import Search from './Search';
import SearchResults from './SearchResults';
import sampleVideoData from '../../../../db/sampleVideoData';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

class RoomView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVideo: props.searchResults[0],
      searchResults: props.searchResults,
      query: '',
      playlist: sampleVideoData.slice(1),
    };
    this.updateQuery = this.updateQuery.bind(this);
    this.search = this.search.bind(this);
  }

  search() {
    // send query to server via socket connection
    socket.emit('youtubeSearch', this.state.query);
    // listen for server's response to search
    socket.on('searchResults', ({ items }) => {
      this.setState({
        searchResults: items,
        query: '',
      });
    });
    // handle errors.. kinda
    socket.on('error', (err) => {
      console.error(err);
    });
  }

  updateQuery(event) {
    this.setState({
      query: event.target.value,
    });
  }

  render() {
    return (
      <div className="container room">
        <div className="container navbar"><h1>fam.ly</h1></div>
        <VideoPlayer video={this.state.currentVideo} />
        <Playlist playlist={this.state.playlist} />
        <div className="container search">
          <SearchResults searchResults={this.state.searchResults} />
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
