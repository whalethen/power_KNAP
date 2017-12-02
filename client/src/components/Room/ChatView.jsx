import React from 'react';
import PropTypes from 'prop-types';
import MessageInput from './MessageInput';
import Messages from './Messages';

class ChatView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.sendMessage = this.sendMessage.bind(this);
    // this.typingMessage = this.typingMessage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== null) {
      if (this.state.messages.length > 0) {
        if (nextProps.message.dateTime !== this.state.messages[this.state.messages.length - 1].date) {
          this.setState({
            messages: this.state.messages.concat({
              message: nextProps.message.body,
              username: nextProps.message.userName,
              date: nextProps.message.dateTime,
              color: nextProps.message.userColor,
            }),
          });
        }
      } else {
        this.setState({
          messages: this.state.messages.concat({
            message: nextProps.message.body,
            username: nextProps.message.userName,
            date: nextProps.message.dateTime,
            color: nextProps.message.userColor,
          }),
        });
      }
    }
  }

  // typingMessage() {
  //   this.props.broadcastTyping();
  // }

  sendMessage(time, message) {
    this.props.emitMessage(time, message);
  }

  render() {
    return (
      <div className="container userChat">
        <h3>Chat Box</h3>
        <div className="scroll">
          <div className="messageContainer">
            <Messages messages={this.state.messages} />
          </div>
          <div className="messageInput">
            <MessageInput
              // userTyping={this.props.userTyping}
              sendMessage={this.sendMessage}
              typingMessage={this.props.broadcastTyping}
              typing={this.props.typing}
            />
          </div>
        </div>
      </div>
    );
  }
}

ChatView.propTypes = {
  //  userTyping: PropTypes.string.isRequired,
  emitMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  broadcastTyping: PropTypes.func.isRequired,
  typing: PropTypes.string.isRequired,
};

export default ChatView;

