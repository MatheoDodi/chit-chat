import React, { Component } from 'react';
import {
  Sidebar,
  Menu,
  Divider,
  Button,
  Modal,
  Label,
  Icon
} from 'semantic-ui-react';
import { TwitterPicker } from 'react-color';

class ColorPanel extends Component {
  state = { modal: false };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  handleColor = e => console.log(e.target.name);

  render() {
    const { modal } = this.state;

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
            <Label content='Primary Color' style={{ marginBottom: '1em' }} />
            <TwitterPicker onChangeComplete={this.handleColor} />
            <Label
              id='Secondary Color'
              content='Secondary Color'
              style={{ marginBottom: '1em', marginTop: '3em' }}
            />
            <TwitterPicker
              name='Secondary Color'
              onChangeComplete={this.handleColor}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' inverted>
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
