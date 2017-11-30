import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RoomView from '../Room/RoomView'

const RoomListEntry = ({ room }) => (
  <div className="container lobby-room exists">
    <Link to='{room}'>
      <div>{room.name}</div>
    </Link>
  </div>
);

RoomListEntry.propTypes = {
  room: PropTypes.instanceOf(Object).isRequired,
};

export default RoomListEntry;
