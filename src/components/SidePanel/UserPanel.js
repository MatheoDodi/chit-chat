import React, { Component, Fragment } from 'react';
import AvatarEditor from 'react-avatar-editor';
import firebase from '../../firebaseSetup';
import {
  Grid,
  Header,
  Icon,
  Dropdown,
  Image,
  Modal,
  Input,
  Button,
  Loader
} from 'semantic-ui-react';

class UserPanel extends Component {
  state = {
    modal: false,
    previewImage: '',
    croppedImage: '',
    blob: '',
    uploadedCroppedImage: '',
    storageRef: firebase.storage().ref(),
    userRef: firebase.auth().currentUser,
    usersRef: firebase.database().ref('users'),
    loading: false,
    metadata: {
      contentType: 'image/jpeg'
    }
  };

  uploadCroppedImage = () => {
    const { storageRef, userRef, blob, metadata } = this.state;
    this.setState({ loading: true });
    storageRef
      .child(`avatar/user/${userRef.uid}`)
      .put(blob, metadata)
      .then(snap => {
        snap.ref.getDownloadURL().then(downloadURL => {
          this.setState({ uploadedCroppedImage: downloadURL }, () =>
            this.changeAvatar()
          );
        });
      });
  };

  changeAvatar = () => {
    this.state.userRef
      .updateProfile({
        photoURL: this.state.uploadedCroppedImage
      })
      .then(() => {
        console.log('PhotoURL updated');
        this.setState({ loading: false });
        this.closeModal();
      })
      .catch(err => console.log(err));

    this.state.usersRef
      .child(this.state.userRef.uid)
      .update({ avatar: this.state.uploadedCroppedImage })
      .then(() => {
        console.log('Avatar Changed');
      })
      .catch(err => console.log(err));
  };

  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });

  dropdownOptions = () => [
    {
      key: 'user',
      text: (
        <span>
          Signed in as <strong>{this.props.currentUser.displayName}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: 'avatar',
      text: <span onClick={this.openModal}>Change Avatar</span>
    },
    {
      key: 'signout',
      text: <span onClick={this.handleSignout}>Sign Out</span>
    }
  ];

  handleChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        this.setState({ previewImage: reader.result });
      });
    }
  };

  handleCropImage = () => {
    if (this.avatarEditor) {
      this.avatarEditor.getImageScaledToCanvas().toBlob(blob => {
        let imageUrl = URL.createObjectURL(blob);
        this.setState({
          croppedImage: imageUrl,
          blob
        });
      });
    }
  };

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('signed out!'));
  };

  render() {
    const { modal, previewImage, croppedImage } = this.state;
    const { currentUser } = this.props;
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
            <Header
              inverted
              floated='left'
              as='h2'
              style={{ paddingLeft: '.75em' }}
            >
              <Icon name='chat' />
              <Header.Content>chitChat</Header.Content>
            </Header>
          </Grid.Row>
          <Header style={{ padding: '1em' }} as='h4' inverted>
            <Dropdown
              trigger={
                <span>
                  <Image src={currentUser.photoURL} spaced='right' avatar />
                  {currentUser.displayName}
                </span>
              }
              options={this.dropdownOptions()}
            />
          </Header>
          <Modal basic open={modal} onClose={this.closeModal} size='tiny'>
            {this.state.loading ? (
              <Grid.Row centered>
                <Loader size='big' />
              </Grid.Row>
            ) : (
              <Fragment>
                <Modal.Header>Change Avatar</Modal.Header>
                <Modal.Content>
                  <Grid centered stackable columns={2}>
                    <Grid.Row centered>
                      {croppedImage && (
                        <Image
                          style={{
                            margin: '1.5em auto',
                            border: '1px solid white'
                          }}
                          width={200}
                          height={200}
                          src={croppedImage}
                        />
                      )}
                    </Grid.Row>
                    <Grid.Row centered>
                      {previewImage && (
                        <AvatarEditor
                          ref={editorNode => (this.avatarEditor = editorNode)}
                          image={previewImage}
                          width={300}
                          height={300}
                          border={20}
                          style={{ margin: '2em', borderRadius: '5px' }}
                          scale={1.2}
                        />
                      )}
                    </Grid.Row>
                  </Grid>
                  <Input
                    size='tiny'
                    onChange={this.handleChange}
                    fluid
                    type='file'
                    label='New Avatar'
                    name='previewImage'
                  />
                </Modal.Content>
                <Modal.Actions>
                  {croppedImage && (
                    <Button
                      color='green'
                      inverted
                      onClick={this.uploadCroppedImage}
                    >
                      <Icon name='image' /> Change Avatar
                    </Button>
                  )}
                  <Button color='green' inverted onClick={this.handleCropImage}>
                    <Icon name='image' /> Preview
                  </Button>
                  <Button color='red' inverted onClick={this.closeModal}>
                    <Icon name='remove' /> Cancel
                  </Button>
                </Modal.Actions>
              </Fragment>
            )}
          </Modal>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
