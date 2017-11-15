import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search.jsx';
import RoomList from './RoomList.jsx';
import Sidebar from './Sidebar.jsx';
import io from 'socket.io-client';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomList: ['Room1', 'Room2', 'Room3'],
    };
  }

  componentDidMount() {
    const socket = io('http://localhost'); // maybe need port?? TODO
  }

  render() {
    return (
      <div>
        <h1>Fam.ly</h1>
        <Search />
        <RoomList rooms={this.state.roomList} />
        <Sidebar />
      </div>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById('homepage'));
