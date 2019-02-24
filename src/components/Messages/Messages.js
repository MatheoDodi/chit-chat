import React, { Component, Fragment } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import firebase from '../../firebaseSetup';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessagesForm';
import Message from './Message';

class Messages extends Component {
  state = {
    messagesRef: firebase.database().ref('messages'),
    messages: [],
    messagesLoading: true,
    numUniqueUsers: ''
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentChannel) {
      this.addListeners(nextProps.currentChannel.id);
    }
  }

  componentDidMount() {
    const { currentChannel, currentUser } = this.props;
    console.log(this.messagesEnd);

    if (currentChannel && currentUser) {
      this.addListeners(currentChannel.id);
    }
  }

  displayChannelName = channel => (channel ? `#${channel.name} ` : '');

  addListeners = channelId => {
    this.addMessageListener(channelId);
  };

  addMessageListener = channelId => {
    let loadedMessages = [];
    this.state.messagesRef.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      });
      this.countUniqueUsers(loadedMessages);
    });
    this.state.messagesRef.child(channelId).once('value', snap => {
      if (!snap.val()) {
        this.setState({ messages: [], numUniqueUsers: '0 Users' });
      }
    });
  };

  countUniqueUsers = messages => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    const numUniqueUsers = `${uniqueUsers.length} Users`;
    this.setState({ numUniqueUsers });
  };

  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.props.currentUser}
      />
    ));

  render() {
    const { messagesRef, messages, numUniqueUsers } = this.state;
    const { currentChannel, currentUser } = this.props;
    return (
      <Fragment>
        <MessagesHeader
          channelName={this.displayChannelName(this.props.currentChannel)}
          numUniqueUsers={numUniqueUsers}
        />
        <Segment className='messages'>
          <Comment.Group style={{ height: '100%' }}>
            {this.displayMessages(messages)}
          </Comment.Group>
        </Segment>
        <MessageForm
          currentUser={currentUser}
          currentChannel={currentChannel}
          messagesRef={messagesRef}
        />
      </Fragment>
    );
  }
}

export default Messages;
