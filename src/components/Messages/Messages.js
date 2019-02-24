import React, { Component, Fragment } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import firebase from '../../firebaseSetup';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessagesForm';

class Messages extends Component {
  state = {
    messagesRef: firebase.database().ref('messages')
  };
  render() {
    const { messagesRef } = this.state;
    const { currentChannel, currentUser } = this.props;
    return (
      <Fragment>
        <MessagesHeader />
        <Segment className='messages'>
          <Comment.Group style={{ height: '100%' }}>
            {/* Messages */}
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
