import React from 'react';
import PropTypes from 'prop-types';

const RoomListEntry = ({ room }) => (
  <div className="container lobby-room exists">
    <div>{room.name}</div>
  </div>
);

RoomListEntry.propTypes = {
  room: PropTypes.object.isRequired,
};

export default RoomListEntry;
