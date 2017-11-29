import React from 'react';
import PropTypes from 'prop-types';

const Messages = ({ messages }) => (
  messages.map((message) => {
    console.log(messages)
    const spanStyle = { color: message.color };
    return (
      <div>
        <span className="dateTime">[{message.date}]</span>
        <span className="username" style={spanStyle}> {message.username}:</span> {message.message}
      </div>
    );
  }));

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.Objects).isRequired,
};

export default Messages;
