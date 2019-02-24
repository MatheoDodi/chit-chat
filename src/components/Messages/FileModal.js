import React, { Component } from 'react';
import mime from 'mime-types';
import { Modal, Button, Input, Icon } from 'semantic-ui-react';

class FileModal extends Component {
  state = {
    file: null,
    authorized: ['image/png', 'image/jpeg']
  };

  addFile = event => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ file });
    }
  };

  sendFile = () => {
    const { file } = this.state;

    if (file) {
      if (this.isAuthorized(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };
        this.props.uploadFile(file, metadata);
        this.props.closeModal();
        this.setState({ file: null });
      }
    }
  };

  isAuthorized = fileName =>
    this.state.authorized.includes(mime.lookup(fileName));

  render() {
    const { modal, closeModal } = this.props;

    return (
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Select an Image File</Modal.Header>
        <Modal.Content>
          <Input
            onChange={this.addFile}
            fluid
            label='File types: .jpeg, .png'
            name='file'
            type='file'
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.sendFile} color='green' inverted>
            <Icon name='checkmark' /> Send
          </Button>
          <Button color='red' inverted onClick={closeModal}>
            <Icon name='remove' /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default FileModal;
