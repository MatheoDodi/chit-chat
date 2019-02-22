import React, { Component, Fragment } from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../firebaseSetup';

class Channels extends Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    showModal: false,
    channelName: '',
    channelDetails: '',
    channelsRef: firebase.database().ref('channels')
  };

  addChannel = () => {
    const { user, channelsRef, channelName, channelDetails } = this.state;

    const key = channelsRef.push().key;
    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL
      }
    };

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelname: '', channelDetails: '' });
        this.handleCloseModal();
        console.log('Channel Added');
      })
      .catch(err => console.log(err));
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;

  handleCloseModal = () => this.setState({ showModal: false });

  handleOpenModal = () => this.setState({ showModal: true });

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
            <Icon onClick={this.handleOpenModal} name='add' />
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
            <Button color='green' onClick={this.handleSubmit} inverted>
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
