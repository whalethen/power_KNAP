import React from 'react';
import PropTypes from 'prop-types';

const RoomListEntry = ({ room }) => (
  <div>
    <p>{room}</p>
  </div>
);

RoomListEntry.propTypes = {
  room: PropTypes.string.isRequired,
};

export default RoomListEntry;
