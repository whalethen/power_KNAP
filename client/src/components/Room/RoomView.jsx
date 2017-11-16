import React from 'react';
import ReactDOM from 'react-dom';
import VideoPlayer from './VideoPlayer.jsx';
import Playlist from './Playlist.jsx';
import Search from './Search.jsx';
import VideoDescription from './VideoDescription.jsx';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

class RoomView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: 'insert current video',
    };
  }

  /*************    Socket stuff, feel free to uncomment and use    *************/
  // componentDidMount() {
  // }

  // handleClick() {
  //   socket.emit('chat', {
  //     message: 'Hi frisbee',
  //   });
  // }

  render() {
    return (
      <div>
        <h3>Room</h3>
        <VideoPlayer video={this.state.video} />
        <VideoDescription />
        <Playlist />
        <Search />
      </div>
    );
  }
}

ReactDOM.render(<RoomView />, document.getElementById('room'));
