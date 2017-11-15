import React from 'react';
import PropTypes from 'prop-types';
import RoomListEntry from './RoomListEntry.jsx';

const RoomList = ({ rooms }) => (
  <div>
    {rooms.map(room =>
      <RoomListEntry room={room} key={room[4]} />)}
  </div>
);

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RoomList;
