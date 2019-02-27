import React, { Component } from 'react';
import firebase from '../../firebaseSetup';
import {
  Sidebar,
  Menu,
  Divider,
  Button,
  Modal,
  Label,
  Icon,
  Segment
} from 'semantic-ui-react';
import { TwitterPicker } from 'react-color';

class ColorPanel extends Component {
  state = {
    modal: false,
    primary: '9900EF',
    secondary: 'FF6900',
    usersRef: firebase.database().ref('users')
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  handleChangePrimary = color => this.setState({ primary: color.hex });

  handleChangeSecondary = color => this.setState({ secondary: color.hex });

  handleSaveColors = () => {
    if (this.state.primary && this.state.secondary) {
      this.saveColors(this.state.primary, this.state.secondary);
    }
  };

  saveColors = (primary, secondary) => {
    this.state.usersRef
      .child(`${this.props.currentUser.uid}/colors`)
      .push()
      .update({
        primary,
        secondary
      })
      .then(() => {
        console.log('Colors Added');
        this.closeModal();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { modal, primary, secondary } = this.state;

    return (
      <Sidebar
        as={Menu}
        icon='labeled'
        inverted
        vertical
        visible
        width='very thin'
      >
        <Divider />
        <Button icon='add' size='small' color='blue' onClick={this.openModal} />

        <Modal
          size='tiny'
          basic
          open={modal}
          onClose={this.closeModal}
          id='modal_color-picker'
        >
          <Modal.Header>Choose App Colors</Modal.Header>

          <Modal.Content>
            <Segment inverted>
              <Label content='Primary Color' style={{ marginBottom: '1em' }} />
              <TwitterPicker
                color={primary}
                onChange={this.handleChangePrimary}
              />
            </Segment>
            <Segment inverted>
              <Label
                content='Secondary Color'
                style={{ marginBottom: '1em' }}
              />
              <TwitterPicker
                color={secondary}
                onChange={this.handleChangeSecondary}
              />
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' inverted onClick={this.handleSaveColors}>
              <Icon name='checkmark' /> Save Colors
            </Button>
            <Button color='red' inverted onClick={this.closeModal}>
              <Icon name='remove' /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Sidebar>
    );
  }
}

export default ColorPanel;
