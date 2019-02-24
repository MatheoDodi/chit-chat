import React, { Component } from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';

class MessagesForm extends Component {
  render() {
    return (
      <Segment className='message__form'>
        <Input
          fluid
          name='message'
          style={{ marginBottom: '0.7em' }}
          label={<Button icon='add' />}
          labelPosition='left'
          placeholder='Write your message'
        />
        <Button.Group icon widths='2'>
          <Button
            color='orange'
            content='Add Reply'
            icon='edit'
            labelPosition='left'
          />
          <Button
            color='teal'
            content='Upload Media'
            labelPosition='right'
            icon='cloud upload'
          />
        </Button.Group>
      </Segment>
    );
  }
}

export default MessagesForm;
