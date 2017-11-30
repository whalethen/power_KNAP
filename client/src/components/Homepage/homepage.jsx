import React from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import RoomList from './RoomList';
import SearchBar from './SearchBar';

const lobby = io('/lobby');

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      roomList: [],
      roomName: '',
    };
    this.fetchRooms = this.fetchRooms.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.captureInput = this.captureInput.bind(this);
  }

  componentDidMount() {
    this.fetchRooms();
    lobby.on('retrieveRooms', (rooms) => {
      this.setState({ roomList: rooms }, () => console.log(this.state));
    });
  }

  fetchRooms() {
    axios.get('/fetchRooms')
      .then(({ data }) => this.setState({ roomList: data }));
  }

  createRoom() {
    lobby.emit('createRoom', this.state.roomName);
    // redirect to new room page
  }

  captureInput(event) {
    this.setState({ roomName: event.target.value });
  }

  render() {
    return (
      <div className="container lobby">
        <h1>Fam.ly</h1>
        <SearchBar />
        <RoomList
          rooms={this.state.roomList}
          createRoom={this.createRoom}
          roomName={this.state.roomName}
          captureInput={this.captureInput}
        />
      </div>
    );
  }
}

export default Homepage;

// ReactDOM.render(<App />, document.getElementById('homepage'));
