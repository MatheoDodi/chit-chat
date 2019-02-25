import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import firebase from '../../firebaseSetup';
import { Segment, Input, Button } from 'semantic-ui-react';
import FileModal from './FileModal';
import ProgressBar from '../UI/ProgressBar';

class MessagesForm extends Component {
  state = {
    storageRef: firebase.storage().ref(),
    uploadState: '',
    percentUploaded: 0,
    uploadTask: null,
    message: '',
    loading: false,
    errors: [],
    modal: false
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  checkInputSubmit = event => {
    if (event.charCode === 13) {
      this.sendMessage();
    }
  };

  createMessage = (fileUrl = null) => {
    const { uid, displayName, photoURL } = this.props.currentUser;
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: uid,
        name: displayName,
        avatar: photoURL
      }
    };
    if (fileUrl) {
      message.image = fileUrl;
    } else {
      message.content = this.state.message;
    }
    return message;
  };

  sendMessage = () => {
    const { messagesRef, currentChannel, getMessagesRef } = this.props;
    const { message } = this.state;
    if (message) {
      this.setState({ loading: true });
      getMessagesRef()
        .child(currentChannel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: '', errors: [] });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err)
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: 'Add a message' }),
        message: ''
      });
    }
  };

  getPath = () => {
    if (this.props.isPrivateChannel) {
      return `chat/private-${this.props.currentChannel.id}`;
    } else {
      return 'chat/public';
    }
  };

  uploadFile = (file, metadata) => {
    const pathToUpload = this.props.currentChannel.id;
    const ref = this.props.getMessagesRef();
    const filePath = `${this.getPath()}/${uuidv4()}.jpg`;
    console.log(filePath);

    this.setState(
      {
        uploadState: 'uploading',
        uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
      },
      () => {
        this.state.uploadTask.on(
          'state_changed',
          snap => {
            const percentUploaded = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            );
            this.setState({ percentUploaded });
          },
          err => {
            console.log(err);
            this.setState({
              errors: this.state.errors.concat(err),
              uploadState: 'error',
              uploadTask: null
            });
          },
          () => {
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then(downloadUrl => {
                this.sendFileMessage(downloadUrl, ref, pathToUpload);
              })
              .catch(err => console.log(err));
          }
        );
      }
    );
  };

  sendFileMessage = (fileUrl, ref, pathToUpload) => {
    console.log(ref, pathToUpload);
    ref
      .child(pathToUpload)
      .push()
      .set(this.createMessage(fileUrl))
      .then(() => {
        this.setState({ uploadState: 'done' });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errors: this.state.errors.concat(err)
        });
      });
  };

  render() {
    const {
      errors,
      message,
      loading,
      modal,
      uploadState,
      percentUploaded
    } = this.state;

    return (
      <Segment className='message__form'>
        <Input
          value={message}
          onChange={this.handleChange}
          onKeyPress={this.checkInputSubmit}
          fluid
          name='message'
          style={{ marginBottom: '0.7em' }}
          label={<Button icon='add' />}
          labelPosition='left'
          placeholder='Write your message'
          className={
            errors.some(error => error.message.includes('message'))
              ? 'error'
              : ''
          }
        />
        <Button.Group icon widths='2'>
          <Button
            onClick={this.sendMessage}
            color='orange'
            content='Add Reply'
            icon='edit'
            labelPosition='left'
            disabled={!(message.trim().length > 0) || loading}
          />
          <Button
            onClick={this.openModal}
            disabled={uploadState === 'uploading'}
            color='teal'
            content='Upload Media'
            labelPosition='right'
            icon='cloud upload'
          />
        </Button.Group>
        <FileModal
          uploadFile={(file, metadata) => this.uploadFile(file, metadata)}
          modal={modal}
          closeModal={this.closeModal}
        />
        <ProgressBar
          uploadState={uploadState}
          percentUploaded={percentUploaded}
        />
      </Segment>
    );
  }
}

export default MessagesForm;
