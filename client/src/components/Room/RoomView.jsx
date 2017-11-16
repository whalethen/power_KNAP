import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import VideoPlayer from './VideoPlayer';
import Playlist from './Playlist';
import Search from './Search';
import VideoDescription from './VideoDescription';
import SearchResults from './SearchResults';
import sampleVideoData from '../../../../db/sampleVideoData';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

class RoomView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: props.searchResults[0],
      searchResults: props.searchResults,
      query: '',
    };
  }

  search() {
    // Make API call to youtube
    // .then(videos => {
    // this.setState({
    //   searchResults: videos
    //   query: ''
    // })})
  }

  updateQuery(event) {
    this.setState({
      query: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <h3>Room</h3>
        {this.state.query}
        <VideoPlayer video={this.state.video} />
        <VideoDescription />
        <Playlist />
        <Search updateQuery={this.updateQuery.bind(this)} search={this.search.bind(this)} />
        <SearchResults searchResults={this.state.searchResults}/>
      </div>
    );
  }
}

RoomView.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ReactDOM.render(<RoomView searchResults={sampleVideoData} />, document.getElementById('room'));
