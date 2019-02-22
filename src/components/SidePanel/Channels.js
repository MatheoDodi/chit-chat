import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { setCurrentChannel } from '../../store/actions';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../firebaseSetup';

class Channels extends Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    showModal: false,
    channelName: '',
    channelDetails: '',
    channelsRef: firebase.database().ref('channels'),
    firstLoad: true
  };

  componentDidMount() {
    this.addListeners();
  }

  setFirstChannel = () => {
    const { channels, firstLoad } = this.state;
    if (firstLoad) {
      const firstChannel = channels[0];
      this.props.setCurrentChannel(firstChannel);
      this.setState({ firstLoad: false });
    }
  };

  addListeners = () => {
    let loadedChannels = [];
    this.state.channelsRef.on('child_added', snap => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
    });
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

  changeChannel = channel => {
    this.props.setCurrentChannel(channel);
  };

  displayChannels = channels => {
    return (
      channels.length > 0 &&
      channels.map(channel => (
        <Menu.Item
          key={channel.id}
          onClick={() => this.changeChannel(channel)}
          name={channel.name}
          style={{ opacity: 0.7 }}
        >
          # {channel.name}
        </Menu.Item>
      ))
    );
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
              <Icon name="exchange" /> Channels
            </span>{' '}
            ({channels.length}){' '}
            <Icon onClick={this.handleOpenModal} name="add" />
          </Menu.Item>
          {this.displayChannels(channels)}
        </Menu.Menu>
        <Modal basic open={showModal} onClose={this.handleCloseModal}>
          <Modal.Header>Add a channel</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={this.handleSubmit} inverted>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" onClick={this.handleCloseModal} inverted>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { setCurrentChannel }
)(Channels);
