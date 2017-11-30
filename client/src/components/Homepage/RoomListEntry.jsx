import React from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RoomView from '../Room/RoomView'

const RoomListEntry = ({ room }) => (
  <div className="container lobby-room exists">
    {console.log(room)}
    {/* <Route to="/{room}"> */}
      <div>{room}</div>
    {/* </Route> */}

  </div>
);

RoomListEntry.propTypes = {
  room: PropTypes.string.isRequired,
};

export default RoomListEntry;
