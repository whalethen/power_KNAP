import React from 'react';
import PropTypes from 'prop-types';

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',

    };
    this.setMessage = this.setMessage.bind(this);
    this.enterMessage = this.enterMessage.bind(this);
  }

  setMessage(event) {
    const pressedEnter = event.key === 'Enter';
    if (pressedEnter) {
      const time = new Date().toLocaleTimeString();
      this.props.sendMessage(time, this.state.message);
      this.clear();
      // this.setState({
      //   typing = null;
      // })
    }
  }

  enterMessage(event) {
    //const userTyping = 'user typing message...';
    this.props.typingMessage();
    this.setState({
      message: event.target.value,
    });
  }

  clear() {
    this.setState({
      message: '',
    });
  }
  render() {
    return (
      <div>
        <div >{this.props.typing}</div>
        <input
          type="text"
          className="messageText"
          placeholder="Enter message"
          onKeyUp={this.setMessage}
          onChange={e => this.enterMessage(e)}
          value={this.state.message}
        />
      </div>
    );
  }
}

MessageInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  typingMessage: PropTypes.func.isRequired,
  typing: PropTypes.string.isRequired,
};

export default MessageInput;
