import React, { Component, Fragment } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessagesForm';

class Messages extends Component {
  render() {
    return (
      <Fragment>
        <MessagesHeader />
        <Segment className='messages'>
          <Comment.Group style={{ height: '100%' }}>
            {/* Messages */}
          </Comment.Group>
        </Segment>
        <MessageForm />
      </Fragment>
    );
  }
}

export default Messages;
