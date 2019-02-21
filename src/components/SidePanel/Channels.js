import React, { Component, Fragment } from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';

class Channels extends Component {
  state = {
    channels: [],
    showModal: false,
    channelName: '',
    channelDetails: ''
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCloseModal = () => this.setState({ showModal: false });

  render() {
    const { channels, showModal } = this.state;
    return (
      <Fragment>
        <Menu.Menu style={{ paddingBottom: '2em', paddingTop: '1em' }}>
          <Menu.Item>
            <span>
              <Icon name='exchange' /> Channels
            </span>{' '}
            ({channels.length}){' '}
            <Icon
              onClick={() => this.setState({ showModal: true })}
              name='add'
            />
          </Menu.Item>
        </Menu.Menu>
        <Modal basic open={showModal} onClose={this.handleCloseModal}>
          <Modal.Header>Add a channel</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <Input
                  fluid
                  label='Name of Channel'
                  name='channelName'
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label='About the Channel'
                  name='channelDetails'
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' inverted>
              <Icon name='checkmark' /> Add
            </Button>
            <Button color='red' onClick={this.handleCloseModal} inverted>
              <Icon name='remove' /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Fragment>
    );
  }
}

export default Channels;
